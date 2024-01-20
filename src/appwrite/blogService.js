import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class BlogService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteDatabaseId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Posts CRUD functions/methods

  /**
   * Creates a new post in the database.
   *
   * @param {object} data - Object containing the post data.
   * @param {string} data.title - Title of the post.
   * @param {string} data.content - Content of the post.
   * @param {string} data.featuredImage - Featured image of the post.
   * @param {string} data.slug - Unique slug of the post.
   * @param {string} data.status - Status of the post (active/inactive).
   * @param {string} data.userId - User ID of the author.
   * @returns {object} - The created post data, or null if the post could not be created.
   */
  async createPost({ title, content, slug, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, slug, status, userId }
      );
    } catch (error) {
      console.log(`Appwrite :: createPost :: error :: ${error}`);
    }
  }

  /**
   * Updates a post in the database.
   *
   * @param {string} slug - Unique slug of the post to update.
   * @param {object} data - Object containing the updated post data.
   * @param {string} data.title - New title of the post.
   * @param {string} data.content - New content of the post.
   * @param {string} data.featuredImage - New featured image of the post.
   * @param {string} data.status - New status of the post (active/inactive).
   * @returns {object} - The updated post data, or null if the post does not exist.
   */
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
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
      console.log(`Appwrite :: updatePost :: error :: ${error}`);
    }
  }

  /**
   * Deletes a post from the database.
   *
   * @param {string} slug - Unique slug of the post to delete.
   * @returns {boolean} - Returns true if the post was deleted, false otherwise.
   */
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(`Appwrite :: deletePost :: error :: ${error}`);
      return false;
    }
  }

  /**
   * Retrieves a single post by its unique slug.
   *
   * @param {string} slug - Unique slug of the post to retrieve.
   * @returns {object} - The retrieved post data, or null if the post does not exist.
   */
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(`Appwrite :: getPost :: error :: ${error}`);
    }
  }

  /**
   * Retrieves a list of posts based on the provided queries.
   *
   * @param {Query[]} [queries] - Array of queries to filter the posts by.
   * @returns {Post[]} - Array of posts that match the provided queries.
   */
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(`Appwrite :: getPosts :: error :: ${error}`);
      return false;
    }
  }

  // File upload functions/methods

  /**
   * Uploads a file to the Appwrite storage.
   *
   * @param {File} file - The file to upload.
   * @returns {object} - The uploaded file metadata.
   */
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(`Appwrite :: uploadFile :: error :: ${error}`);
    }
  }

  /**
   * Deletes a file from the Appwrite storage.
   *
   * @param {string} fileId - Unique ID of the file to delete.
   * @returns {boolean} - Returns true if the file was deleted, false otherwise.
   */
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log(`Appwrite :: deleteFile :: error :: ${error}`);
      return false;
    }
  }

  /**
   * Get file preview URL
   *
   * @param {string} fileId - file unique ID
   * @returns {string} - file preview URL
   */
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const blogService = new BlogService();
export default blogService;
