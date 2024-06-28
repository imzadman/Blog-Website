import { Client, Storage, ID } from "appwrite";
import { conf } from "../conf/conf";

export class StorageService {
  client = new Client();
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.storage = new Storage(this.client);
  }
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("storageService :: uploadFile :: error", error);
    }
  }
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("storageService :: deleteFile :: error", error);
      return false;
    }
  }
  previewFile(fileId) {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("storageService :: previewFile :: error", error);
    }
  }
}
export const storageService = new StorageService();
