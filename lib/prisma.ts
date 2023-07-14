import {Prisma, PrismaClient } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!); // Uses default options for Redis connection

const prisma = new PrismaClient();

const cacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
  storage: { type: "redis", options: { client: redis, invalidation: { referencesTTL: 300 }, log: console } },
  // excludeModels: ['User', 'Account'],
  cacheTime: 300,
  onHit: (key) => {
    console.log("hit", key);
  },
  onMiss: (key) => {
    console.log("miss", key);
  },
  onError: (key) => {
    console.log("error", key);
  },
});

prisma.$use(cacheMiddleware);

export default prisma;
