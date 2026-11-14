

import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(`./.env.${process.env.NODE_ENV}` )
});

const port = process.env.PORT;
const mod = process.env.NODE_ENV;
const salt = process.env.SALT_ROUNDS;

const adminSignature = process.env.JWT_ADMIN_ACCESS_SECRET;
const adminRefreshSignature = process.env.JWT_ADMIN_REFRESH_SECRET;
const userSignature = process.env.JWT_USER_ACCESS_SECRET;
const userRefreshSignature = process.env.JWT_USER_REFRESH_SECRET;

const databaseURL = process.env.DATABASE_URL;
const appEmail = process.env.APP_EMAIL;
const appPassword = process.env.APP_PASSWORD;


const awsRegion = process.env.AWS_REGION;
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsBucketName = process.env.AWS_BUCKET_NAME;
const redisUrl = process.env.REDIS_URL as string;

if (!awsRegion || !awsAccessKeyId || !awsSecretAccessKey) {
    throw new Error("Missing AWS environment variables");
}
export const env = {
    port,
    mod,
    salt,
    adminSignature,
    adminRefreshSignature,
    userSignature,
    userRefreshSignature,
    databaseURL,
    appEmail,
    appPassword ,
    awsRegion,
    awsAccessKeyId,
    awsSecretAccessKey,
    awsBucketName,
    redisUrl
};
