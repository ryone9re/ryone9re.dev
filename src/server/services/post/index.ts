import { Post } from '@/domain/entities/Post';
import { IPostRepository } from '@/domain/repositories/IPostRepository';
import { CreatePostDTO } from '@/dto/Post/CreatePostDTO';

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
}
