
import fs from 'fs-extra';
import Redis from 'ioredis';
import expireFile, { initPublisher } from './expireFile';
import handleFileExpiration from '../subscriptions/storageTTLRemoval';

const DIR = 'tmp'
let publisher: Redis;
let subscriber: Redis;

beforeAll(async () => {
    publisher  = initPublisher()
    subscriber  = new Redis()
    fs.ensureDirSync(DIR)
});

test('basic', async () => {
    const testFilePath = `${DIR}/test.txt`;
    const secondsTTL = 2;
    handleFileExpiration(subscriber);
    fs.closeSync(fs.openSync(testFilePath, 'w'));

    //set file to delete file after 2 seconds
    await expireFile(publisher, testFilePath, secondsTTL);
    
    //check if exists after 1 second
    const checkExistsBeforeExpiration = new Promise((res, rej) => {
        setTimeout(() => {
            if (fs.existsSync(testFilePath)) {
                res(true);
            } else {
                res(false)
            }
        }, 1000);
    })
    
    // check if exists at 3 seconds
    const checkExistsAfterExpiration = new Promise((res, rej) => {
        setTimeout(() => {
            if (fs.existsSync(testFilePath)) {
                res(true);
            } else {
                res(false)
            }
        }, 3000);
    })

    const [existsBeforeExpiration, existsAfterExpiration] = await Promise.all([checkExistsBeforeExpiration, checkExistsAfterExpiration]);

    expect(existsBeforeExpiration).toBe(true);
    expect(existsAfterExpiration).toBe(false);
});


const teardown = async (publisher: Redis, subscriber: Redis) => {
    await new Promise((resolve) => {
        publisher.quit();
        publisher.on('end', resolve);
    });
    await new Promise((resolve) => {
        subscriber.quit();
        subscriber.on('end', resolve);
    });
    fs.removeSync('tmp');
};

afterAll(async () => {
    await teardown(publisher, subscriber);
});