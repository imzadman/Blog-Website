import { Account, Client } from "appwrite";
import { conf } from "../conf/conf";
import { ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      await this.account.create(ID.unique(), email, password, name);
      return this.login({ email, password });
    } catch (error) {
      console.log("appwriteService :: createAccount :: error", error);
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("appwriteService :: login :: error", error);
    }
  }
  async getUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("appwriteService :: getUser :: error", error);
    }
    return null;
  }
  async logout() {
    try {
      this.account.deleteSessions();
    } catch (error) {
      console.log("appwriteService :: logout :: error", error);
    }
  }
}
export const authService = new AuthService();
