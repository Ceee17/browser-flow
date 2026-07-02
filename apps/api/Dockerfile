# Build stage
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@8.7.0 --activate
WORKDIR /build
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/workflow-schema/package.json ./packages/workflow-schema/
COPY packages/selector-engine/package.json ./packages/selector-engine/
COPY packages/browser-engine/package.json ./packages/browser-engine/
COPY packages/scheduler/package.json ./packages/scheduler/
COPY packages/sdk/package.json ./packages/sdk/
RUN pnpm install --frozen-lockfile
COPY apps/api ./apps/api
COPY packages/shared-types ./packages/shared-types
COPY packages/workflow-schema ./packages/workflow-schema
COPY packages/selector-engine ./packages/selector-engine
COPY packages/browser-engine ./packages/browser-engine
COPY packages/scheduler ./packages/scheduler
COPY packages/sdk ./packages/sdk
RUN pnpm --filter @browserflow/api build

# Runtime stage
FROM node:20-alpine
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
WORKDIR /app
COPY --from=builder /build/apps/api/package.json ./package.json
COPY --from=builder /build/apps/api/node_modules ./node_modules
COPY --from=builder /build/apps/api/dist ./dist
COPY --from=builder /build/apps/api/prisma ./prisma
USER nestjs
EXPOSE 4000
CMD ["node", "dist/main"]
