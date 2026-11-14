
import {ObjectCannedACL, S3Client ,PutObjectCommand, GetObjectCommand ,DeleteObjectCommand} from "@aws-sdk/client-s3";
import { env } from "../../config/env.service";
import {MultersStorge} from "../enums/multer.enum"
import {createReadStream} from "fs"
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export class S3Service {
    private s3Client: S3Client;

        constructor() {

            this.s3Client = new S3Client({
                region: env.awsRegion,

                credentials: {
                    accessKeyId: env.awsAccessKeyId as string,
                    secretAccessKey: env.awsSecretAccessKey as string
                }
            });

        }

        // async uploadFile({
        //     storageKey = MultersStorge.memoryStorge,
        //     BucketName=env.awsBucketName as string,
        //     path ="general",
        //     file ,
        //     ACL=ObjectCannedACL.private,
        //     contentType 

        // }:{
        //     storageKey?: MultersStorge
        //     BucketName?:string,
        //     path?:string,
        //     file:Express.Multer.File,
        //     ACL?:ObjectCannedACL,
        //     contentType?:string
        // }){
            
        //     const key = `SocialMedia/${path}/${file.originalname}`;

        //     const result = await this.s3Client.send(
        //         new PutObjectCommand({
        //             Bucket: env.awsBucketName,
        //             Key: key,
        //             Body:storageKey == MultersStorge.memoryStorge ? file.buffer: createReadStream(file.path) ,
        //             ACL,
        //             ContentType: contentType
        //         })
        //     );
        //     return key;
        // }
        async uploadFile({
    storageKey = MultersStorge.memoryStorge,
    BucketName = env.awsBucketName as string,
    path = "general",
    file,
    contentType
}: {
    storageKey?: MultersStorge;
    BucketName?: string;
    path?: string;
    file: Express.Multer.File;
    contentType?: string;
}) {

    const key = `SocialMedia/${path}/${Date.now()}-${file.originalname}`;

    await this.s3Client.send(
        new PutObjectCommand({
            Bucket: BucketName,
            Key: key,

            Body:
                storageKey === MultersStorge.memoryStorge
                    ? file.buffer
                    : createReadStream(file.path),

            ContentType: contentType || file.mimetype
        })
    );

    return key;
        }
        async uploadingFilemorethan5mb({
            storageKey = MultersStorge.memoryStorge,
            BucketName=env.awsBucketName as string,
            path ="general",
            file ,
            ACL=ObjectCannedACL.private,
            contentType ,
            partSize=5 // more than 5MB

        }:{
            storageKey?: MultersStorge
            BucketName?:string,
            path?:string,
            file:Express.Multer.File,
            ACL?:ObjectCannedACL,
            contentType?:string,
            partSize?:number
        }){
            
            const key = `SocialMedia/${path}/${file.originalname}`;

            const result = await new Upload({
                client: this.s3Client,
                params:{
                    Bucket:env.awsBucketName,
                    Key: key,
                    ACL:ACL,
                    Body:storageKey == MultersStorge.memoryStorge ? file.buffer: createReadStream(file.path) ,
                    ContentType:contentType,
                },
                partSize:partSize *1024*1024
            })
            result.on("httpUploadProgress", (progress) => {
                console.log(`${progress.loaded} as number /progress.total as number *100}% uploaded`);
            });
            return result.done();
        }

        async getFile({
            BucketName=env.awsBucketName,
            Key,}:{
        BucketName?:string,
        Key: string
        }){
        const file = await new GetObjectCommand({
            Bucket:BucketName,
            Key
        })
        return this.s3Client.send(file)
        }

        async CreatePresignedUrl({BucketName=env.awsBucketName,
            path= "general",ContentType,
            Expires=3600 ,OriginalName}:{
            BucketName?:string,
            path?:string,
            ContentType?:string,
            Key?: string,
            Expires?: number ,
            OriginalName?:string
        }){
            const key = `SocialMedia/${path}/${Math.round(Date.now() / 1000)}_${OriginalName}`;
            const result = new PutObjectCommand({
                Bucket:BucketName,
                Key: key,
                ContentType: ContentType
            });
            const url =await getSignedUrl(this.s3Client, result, { expiresIn: Expires });
            return { url, key }
        }

        async deleteFile({
            BucketName=env.awsBucketName,
            Key,}:{
            BucketName?:string,
            Key: string
        }){
            const result = await new DeleteObjectCommand({
                Bucket:BucketName,
                Key
            });
            return this.s3Client.send(result);
        }
}

export const s3Service = new S3Service();

