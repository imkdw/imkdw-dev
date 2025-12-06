# ========================================
# BASE STAGE
# ========================================
FROM node:22-alpine AS base

RUN apk add curl

# ========================================
# BUILD STAGE
# ========================================
FROM base AS build

RUN npm i -g pnpm@10.0.0

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/consts/package.json ./packages/shared/consts/
COPY packages/shared/exception/package.json ./packages/shared/exception/
COPY packages/shared/types/package.json ./packages/shared/types/
COPY packages/shared/utils/package.json ./packages/shared/utils/
COPY packages/eslint-config ./packages/eslint-config/
COPY packages/typescript-config ./packages/typescript-config/

RUN pnpm install --frozen-lockfile

COPY apps/api/nest-cli.json ./apps/api/
COPY apps/api/tsconfig.json ./apps/api/
COPY apps/api/tsconfig.build.json ./apps/api/
COPY packages/shared/consts/tsconfig.json ./packages/shared/consts/
COPY packages/shared/exception/tsconfig.json ./packages/shared/exception/
COPY packages/shared/types/tsconfig.json ./packages/shared/types/
COPY packages/shared/utils/tsconfig.json ./packages/shared/utils/

COPY apps/api/src ./apps/api/src
COPY apps/api/prisma ./apps/api/prisma
COPY packages/shared/consts/src ./packages/shared/consts/src
COPY packages/shared/exception/src ./packages/shared/exception/src
COPY packages/shared/types/src ./packages/shared/types/src
COPY packages/shared/utils/src ./packages/shared/utils/src

RUN pnpm consts build && \
    pnpm exception build && \
    pnpm types build && \
    pnpm utils build && \
    pnpm api prisma:generate && \
    pnpm api build

# ========================================
# RUN STAGE
# ========================================
FROM base AS run

WORKDIR /app

RUN npm i -g pnpm@10.0.0 && \
    wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/pnpm-workspace.yaml ./

COPY --from=build /app/apps/api/prisma ./apps/api/prisma
COPY --from=build /app/apps/api/package.json ./apps/api/
COPY --from=build /app/packages/shared/consts/package.json ./packages/shared/consts/
COPY --from=build /app/packages/shared/exception/package.json ./packages/shared/exception/
COPY --from=build /app/packages/shared/types/package.json ./packages/shared/types/
COPY --from=build /app/packages/shared/utils/package.json ./packages/shared/utils/

RUN pnpm install --prod --frozen-lockfile --ignore-scripts

RUN pnpm api prisma:generate

COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/packages/shared/consts/dist ./packages/shared/consts/dist
COPY --from=build /app/packages/shared/exception/dist ./packages/shared/exception/dist
COPY --from=build /app/packages/shared/types/dist ./packages/shared/types/dist
COPY --from=build /app/packages/shared/utils/dist ./packages/shared/utils/dist

EXPOSE 4000

CMD ["doppler", "run", "--project=imkdw-dev", "--config=production", "--", "node", "apps/api/dist/main.js"]