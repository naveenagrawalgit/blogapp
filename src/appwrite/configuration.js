import config from "../config/config";

import { ID,Databases, Storage,Query, Client} from "appwrite"

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor() {

        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteprojectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuedImage,status,userId}){

        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuedImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Error inside createpost service", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, userId}){

        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )

        } catch (error) {
            console.log("appwrite serrvice issue in upadate post dervice ", error)   
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwritecollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log("appwrite delete post service issue", error);
            return false
        }
    }

    async getPost(slug){

        try {
           return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwritecollectionId,
                slug,
            )
        } catch (error) {
            console.log("issue in gwtpost of database appwrite serivce", error)
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwritecollectionId,
                queries,
                
            )
        } catch (error) {
            console.log("appwrite service error in getting all posts", error)   
            return false
        }
    }

    async uploadFile(file){
        try {
            return await  this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            
        }
    }

    async deleteFile(fileId){

        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
               fileId
            )
            return true
        } catch (error) {
            console.log("issue in appwrite deletefile serivces", error)
            return false
        }

    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }

}



const service = new Service()






