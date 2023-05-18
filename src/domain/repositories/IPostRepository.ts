import { Post } from '@/domain/entities/Post';
import { CreatePostDTO } from '@/dto/Post/CreatePostDTO';
import { UpdatePostDTO } from '@/dto/Post/UpdatePostDTO';

export interface IPostRepository {
  createPost(dto: CreatePostDTO): Promise<Post>;
  updatePost(postId: string, dto: UpdatePostDTO): Promise<Post>;
  deletePost(postId: string): Promise<void>;
  getPostById(postId: string): Promise<Post>;
  getPosts(): Promise<Post[]>;
  getPublicPosts(): Promise<Post[]>;
  getPostsWithPagination(page: number): Promise<{ posts: Post[]; hasNext: boolean }>;
}
