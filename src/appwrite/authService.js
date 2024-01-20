import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteDatabaseId);
    this.account = new Account(this.client);
  }

  /**
   * Creates a new user account.
   *
   * @param {object} data - The data required to create the user account.
   * @param {string} data.email - The email address of the user.
   * @param {string} data.password - The password for the user account.
   * @param {string} [data.name] - The name of the user.
   * @returns {object} The user account object if successful, or an error object.
   */
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(`Appwrite :: createAccount :: error :: ${error}`);
    }
  }

  /**
   * Logs a user into their account.
   *
   * @param {object} data - The data required to log the user in.
   * @param {string} data.email - The email address of the user.
   * @param {string} data.password - The password for the user account.
   * @returns {object} The user account object if successful, or an error object.
   */
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log(`Appwrite :: login :: error :: ${error}`);
    }
  }

  /**
   * Gets the currently logged in user.
   *
   * @returns {object} The user account object if successful, or an error object.
   */
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(`Appwrite :: getCurrentUser :: error :: ${error}`);
    }
    return null;
  }

  /**
   * Logs a user out of their account.
   *
   * @returns {object} The user account object if successful, or an error object.
   */
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log(`Appwrite :: logout :: error :: ${error}`);
    }
  }
}

const authService = new AuthService();
export default authService;
