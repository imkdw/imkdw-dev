#!/bin/bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

CURRENT_ENV=$(cat .current_env 2>/dev/null || echo "blue")
NEW_ENV=$([ "$CURRENT_ENV" = "blue" ] && echo "green" || echo "blue")

log_info "Current environment: $CURRENT_ENV"
log_info "Deploying to: $NEW_ENV"

export ACTIVE_ENV=$CURRENT_ENV

log_info "Loading environment variables from Doppler..."
eval $(doppler secrets download --no-file --format env)

log_info "Logging in to ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_API_ECR

if [ $? -ne 0 ]; then
    log_error "Failed to login to ECR"
    exit 1
fi

log_info "Pulling new image from ECR..."
doppler run -- docker compose pull api-$NEW_ENV

if [ $? -ne 0 ]; then
    log_error "Failed to pull image from ECR"
    exit 1
fi

log_info "Ensuring Caddy is running..."
if ! docker ps --format '{{.Names}}' | grep -q "^caddy$"; then
    log_warn "Caddy is not running. Starting Caddy..."
    doppler run -- docker compose up -d caddy
    if [ $? -ne 0 ]; then
        log_error "Failed to start Caddy"
        exit 1
    fi
    log_info "Waiting for Caddy to initialize..."
    sleep 5
else
    log_info "Caddy is already running"
fi

log_info "Starting $NEW_ENV environment..."
if [ "$NEW_ENV" = "green" ]; then
    doppler run -- docker compose --profile green up -d api-green
else
    doppler run -- docker compose up -d api-blue
fi

if [ $? -ne 0 ]; then
    log_error "Failed to start $NEW_ENV container"
    exit 1
fi

log_info "Waiting for $NEW_ENV environment to be healthy..."
HEALTH_CHECK_PASSED=false

for i in {1..30}; do
    if docker exec api-$NEW_ENV curl -sf http://localhost:4000/v1 > /dev/null 2>&1; then
        log_info "Health check passed on attempt $i"
        HEALTH_CHECK_PASSED=true
        break
    fi
    echo -n "."
    sleep 2
done
echo ""

if [ "$HEALTH_CHECK_PASSED" = false ]; then
    log_error "Health check failed after 60 seconds"
    log_error "Rolling back deployment..."
    doppler run -- docker compose stop api-$NEW_ENV
    doppler run -- docker compose rm -f api-$NEW_ENV
    exit 1
fi

log_info "Switching traffic to $NEW_ENV environment..."
export ACTIVE_ENV=$NEW_ENV
doppler run -- docker exec caddy caddy reload --config /etc/caddy/Caddyfile

if [ $? -ne 0 ]; then
    log_error "Failed to reload Caddy configuration"
    log_warn "New environment is running but traffic was not switched"
    exit 1
fi

echo $NEW_ENV > .current_env
log_info "Updated current environment to $NEW_ENV"

log_info "Cleaning up $CURRENT_ENV environment..."
doppler run -- docker compose stop api-$CURRENT_ENV
doppler run -- docker compose rm -f api-$CURRENT_ENV

log_info "Deployment completed successfully!"
log_info "Active environment: $NEW_ENV"
