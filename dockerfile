# 1: Builder
FROM oven/bun:1 AS builder

WORKDIR /app

# ติดตั้ง dependencies
COPY package*.json bun.lockb* ./
RUN bun install

ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI


# คัดลอกซอร์สโค้ดทั้งหมดแล้ว build
COPY . .
RUN bun run build


# 2: Runner
FROM oven/bun:1-alpine AS runner

WORKDIR /app

# คัดลอกไฟล์จำเป็นจาก builder stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb ./bun.lockb
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/data ./data

EXPOSE 3001


# รันเซิร์ฟเวอร์ด้วย Bun
CMD ["bun", "run", "start"]
