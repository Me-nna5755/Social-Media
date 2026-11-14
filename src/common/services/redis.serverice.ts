
    import { createClient, RedisClientType } from "redis";
import { env } from "../../config/env.service";
import { Types } from "mongoose";
import { Socket } from "dgram";

class RedisService {
    private redisClient: RedisClientType;

    constructor() {

        this.redisClient = createClient({
            url: env.redisUrl
        });
        this.redisClient.on("error", (error) => {
            console.log("Redis Error:", error);
        });

        // Listen when Redis becomes ready
        this.redisClient.on("ready", () => {
            console.log("Redis Connected Successfully");
        });
        //this.handleConnect();
    }

    connection = async () => {
        if (!this.redisClient.isOpen) {
            await this.redisClient.connect();
            console.log("Redis connected");
        }
    };
    
    // async handleConnect() {

    //     //  errors
    //     this.redisClient.on("error", (error) => {
    //         console.log("Redis Error:", error);
    //     });

    //     //  ready
    //     this.redisClient.on("ready", () => {
    //         console.log("Redis Connected Successfully");
    //     });

    //     // Connect to Redis server
    //     try {
    //         await this.redisClient.connect();
    //     } catch (error) {
    //         console.log("Redis Connection Failed:", error);
    //     }
    // }

    createRevokeToken = ({
        userId,
        token
    }: {
        userId: Types.ObjectId,
        token: string
    }) => {
        return `revokeToken:${userId}:${token}`;
    };

    set = async (
        key: string,
        value: any,
        ttl?: number
    ) => {

        if (typeof value === "object") {
            value = JSON.stringify(value);
        }

        return ttl
            ? await this.redisClient.set(key, value, { EX: ttl })
            : await this.redisClient.set(key, value);
    };

    get = async (key: string) => {
        return await this.redisClient.get(key);
    };

    ttl = async (key: string) => {
        return await this.redisClient.ttl(key);
    };

    exists = async (key: string) => {
        return await this.redisClient.exists(key);
    };

    delete = async (key: string) => {
        return await this.redisClient.del(key);
    };

    mGet = async (...keys: string[]) => {
        return await this.redisClient.mGet(keys);
    };
    
    key = (userId: Types.ObjectId) => {
    return `user:socket:${userId}`;
    }
    

    async addSocket(userId : Types.ObjectId ,socketId :string) {
        return await this.redisClient.sAdd(this.key(userId) ,socketId)
    }

    async removeSocket(userId : Types.ObjectId ,socketId :string) {
        return await this.redisClient.sRem(this.key(userId) ,socketId)
    }
    
    async getSocket(userId : Types.ObjectId ) {
        return await this.redisClient.sMembers(this.key(userId))
    }
    
    async hasSocket(userId : Types.ObjectId ) {
        return await this.redisClient.sCard(this.key(userId))
    }

    async removeUser(userId : Types.ObjectId ) {
        return await this.redisClient.sMembers(this.key(userId))
    }



}

export const redisService = new RedisService();



