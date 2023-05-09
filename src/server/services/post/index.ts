import { Post } from '@/domain/entities/Post';
import { IPostRepository } from '@/domain/repositories/IPostRepository';
import { CreatePostDTO } from '@/dto/Post/CreatePostDTO';
import { PostRepository } from '@/infrastructure/repositories/PostRepository';

export class PostService {
  #postRepositry: IPostRepository;

  constructor() {
    this.#postRepositry = new PostRepository();
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
}
