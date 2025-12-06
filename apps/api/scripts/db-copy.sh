#!/bin/bash

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

DUMP_FILE="backup_temp.sql"

log_info() {
    echo -e "${GREEN}$1${NC}"
}

log_error() {
    echo -e "${RED}$1${NC}"
}

cleanup() {
    if [ -f "$DUMP_FILE" ]; then
        rm -f "$DUMP_FILE"
        log_info "Temporary dump file deleted"
    fi
}

trap cleanup EXIT

parse_db_url() {
    local url=$1

    local without_protocol="${url#*://}"

    local userpass="${without_protocol%%@*}"
    DB_USER="${userpass%%:*}"
    DB_PASSWORD="${userpass#*:}"

    local hostportdb="${without_protocol#*@}"
    local hostport="${hostportdb%%/*}"
    DB_HOST="${hostport%%:*}"
    DB_PORT="${hostport#*:}"

    local db_with_params="${hostportdb#*/}"
    DB_NAME="${db_with_params%%\?*}"
}

log_info "Doppler에서 환경변수 로딩중.."

SOURCE_DB_URL=$(doppler secrets get EXTERNAL_DATABASE_URL --config production --plain)
TARGET_DB_URL=$(doppler secrets get DATABASE_URL --config local --plain)

if [ -z "$SOURCE_DB_URL" ] || [ -z "$TARGET_DB_URL" ]; then
    log_error "DATABASE_URL 환경변수 조회 실패"
    exit 1
fi

log_info "소스 데이터베이스 URL 파싱중.."
parse_db_url "$SOURCE_DB_URL"
SOURCE_HOST="$DB_HOST"
SOURCE_PORT="$DB_PORT"
SOURCE_USER="$DB_USER"
SOURCE_PASSWORD="$DB_PASSWORD"
SOURCE_NAME="$DB_NAME"

log_info "타겟 데이터베이스 URL 파싱중.."
parse_db_url "$TARGET_DB_URL"
TARGET_HOST="$DB_HOST"
TARGET_PORT="$DB_PORT"
TARGET_USER="$DB_USER"
TARGET_PASSWORD="$DB_PASSWORD"
TARGET_NAME="$DB_NAME"

log_info "프로덕션 데이터베이스 덤프 시작.."
PGPASSWORD="$SOURCE_PASSWORD" pg_dump \
    -h "$SOURCE_HOST" \
    -p "$SOURCE_PORT" \
    -U "$SOURCE_USER" \
    -d "$SOURCE_NAME" \
    --no-owner \
    --no-acl \
    > "$DUMP_FILE"
log_info "데이터베이스 덤프 완료"

log_info "타겟 데이터베이스 스키마 초기화중.."
PGPASSWORD="$TARGET_PASSWORD" psql \
    -h "$TARGET_HOST" \
    -p "$TARGET_PORT" \
    -U "$TARGET_USER" \
    -d "$TARGET_NAME" \
    -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" \
    > /dev/null 2>&1
log_info "타겟 데이터베이스 스키마 초기화 완료"

log_info "덤프 파일 타겟 데이터베이스 복원중.."
PGPASSWORD="$TARGET_PASSWORD" psql \
    -h "$TARGET_HOST" \
    -p "$TARGET_PORT" \
    -U "$TARGET_USER" \
    -d "$TARGET_NAME" \
    < "$DUMP_FILE" \
    > /dev/null 2>&1
log_info "데이터베이스 복원 완료"

log_info "프로덕션 데이터베이스에서 로컬 데이터베이스로 복사 완료"
