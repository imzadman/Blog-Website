import { Client, Databases, Query } from "appwrite";
import { conf } from "../conf/conf";

export class DbService {
  client = new Client();
  databases;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }
  async createPost({ title, content, status, userId, featuredImage, slug }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log("dbService :: createPost :: error", error);
    }
  }
  async updatePost(slug, { title, content, status, featuredImage }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("dbService :: updatePost :: error", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("dbService :: deletePost :: error", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("dbService :: getPost :: error", error);
    }
  }
  async getPosts() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        [Query.equal("status", "public")]
      );
    } catch (error) {
      console.log("dbService :: getPosts :: error", error);
    }
  }
}
export const dbService = new DbService();
