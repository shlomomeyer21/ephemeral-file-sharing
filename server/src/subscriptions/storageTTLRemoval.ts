import fs from 'fs-extra';
import gfs from 'graceful-fs';
import Redis from 'ioredis'

gfs.gracefulify(fs);

export default function handleFileExpiration(subscriber: Redis) {
    subscriber.psubscribe("__key*__:expired", (err) => {
        if (err) {
            return console.error(err);
        }
    });

    subscriber.on("pmessage", (pattern, channel, message) => {
        const filePath = message;
        fs.remove(filePath, (err) => {
            if (err) {
                return console.error(err);
            }
        });
    });
}