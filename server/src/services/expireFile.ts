import Redis from 'ioredis';

export default async function expireFile(redis: Redis, path: string, ttl: number) {
    await redis.setex(path, ttl, '', (err) => {
        if (err) {
            console.error(err);
        }
    });
}

export function initPublisher(): Redis {
    const redis = new Redis();
    redis.on("ready", () => {
        redis.config("SET", "notify-keyspace-events", "Ex");
    });
    return redis;
}