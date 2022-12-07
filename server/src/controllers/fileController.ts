import Redis from "ioredis";
import { Next } from "koa";
import expireFile, { initPublisher } from "../services/expireFile";
import multerUploadImage from "../services/storeFile";
import handleFileExpiration from "../subscriptions/storageTTLRemoval";

const publisher = initPublisher();
const subscriber = new Redis();
handleFileExpiration(subscriber);

export async function storeFile(ctx: any, next: Next) {
    await multerUploadImage()(ctx, async () => {
        const { file: { filename, path }, request: { body: { ttl } } } = ctx;
        console.log(ttl);
        await expireFile(publisher, path, ttl);
        ctx.body = { file_url: `http://localhost:3001/${filename}` };
        await next();
    })
}