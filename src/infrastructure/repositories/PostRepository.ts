import { Post, PostConfig } from '@/domain/entities/Post';
import { IPostRepository } from '@/domain/repositories/IPostRepository';
import { CreatePostDTO } from '@/dto/Post/CreatePostDTO';
import { UpdatePostDTO } from '@/dto/Post/UpdatePostDTO';
import { PrismaClient } from '@prisma/client';

export class PostRepository implements IPostRepository {
  #client: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.#client = prisma;
  }

  async createPost(dto: CreatePostDTO): Promise<Post> {
    try {
      const post = await this.#client.post.create({
        data: dto
      });

      return post;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updatePost(postId: string, dto: UpdatePostDTO): Promise<Post> {
    try {
      const updatedPost = await this.#client.post.update({
        where: {
          id: postId
        },
        data: dto
      });

      return updatedPost;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deletePost(postId: string): Promise<void> {
    try {
      await this.#client.post.delete({
        where: {
          id: postId
        }
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getPostById(postId: string): Promise<Post> {
    try {
      const post = await this.#client.post.findUnique({
        where: {
          id: postId
        }
      });

      if (!post) {
        throw new Error('Post not found');
      }

      return post;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getPosts(): Promise<Post[]> {
    try {
      const posts = await this.#client.post.findMany({
        orderBy: { id: 'desc' }
      });

      return posts;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getPublicPosts(): Promise<Post[]> {
    try {
      const posts = await this.#client.post.findMany({
        where: {
          visible: true
        },
        orderBy: {
          id: 'desc'
        }
      });

      return posts;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getPostsWithPagination(page = 1): Promise<{ posts: Post[]; hasNext: boolean }> {
    const skip = PostConfig.maxPostsPerRequest * (page - 1);

    try {
      const posts = await this.#client.post.findMany({
        take: PostConfig.maxPostsPerRequest + 1,
        skip: skip,
        where: {
          visible: true
        },
        orderBy: {
          id: 'desc'
        }
      });

      const hasNext = posts.length > PostConfig.maxPostsPerRequest;

      const truncatedPosts = posts.slice(0, PostConfig.maxPostsPerRequest);

      return { posts: truncatedPosts, hasNext };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
