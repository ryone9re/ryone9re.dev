import { Post } from '@/domain/entities/Post';
import { IPostRepository } from '@/domain/repositories/IPostRepository';
import { CreatePostDTO } from '@/dto/Post/CreatePostDTO';
import { UpdatePostDTO } from '@/dto/Post/UpdatePostDTO';

export class PostService {
  #postRepositry: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.#postRepositry = postRepository;
  }

  async getPosts(): Promise<Post[]> {
    return await this.#postRepositry.getPublicPosts();
  }

  async createPost(dto: CreatePostDTO): Promise<Post> {
    return await this.#postRepositry.createPost(dto);
  }

  async getPostById(id: string): Promise<Post> {
    return await this.#postRepositry.getPostById(id);
  }

  async getPostsWithPagination(page: number): Promise<{ posts: Post[]; hasNext: boolean }> {
    return await this.#postRepositry.getPostsWithPagination(page);
  }

  async getPublicPostsWithPagination(page: number): Promise<{ posts: Post[]; hasNext: boolean }> {
    return await this.#postRepositry.getPublicPostsWithPagination(page);
  }

  async updatePost(id: string, dto: UpdatePostDTO): Promise<Post> {
    return await this.#postRepositry.updatePost(id, dto);
  }

  async deletePost(id: string): Promise<boolean> {
    return await this.#postRepositry.deletePost(id);
  }
}
