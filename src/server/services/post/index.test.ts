import { Post } from '@/domain/entities/Post';
import { IPostRepository } from '@/domain/repositories/IPostRepository';
import { CreatePostDTO } from '@/dto/Post/CreatePostDTO';
import { createId } from '@paralleldrive/cuid2';
import { PostService } from '.';

function generatePostData(): Post {
  return {
    id: createId(),
    title: 'Test title',
    thumbnail: '😗',
    content: 'Test content',
    createdAt: new Date(),
    updatedAt: new Date(),
    visible: true
  };
}

jest.mock('@/infrastructure/repositories/PostRepository');

describe('post service test', () => {
  let postRepository: jest.Mocked<IPostRepository>;
  let postService: PostService;

  beforeEach(() => {
    postRepository = {
      createPost: jest.fn(),
      updatePost: jest.fn(),
      deletePost: jest.fn(),
      getPostById: jest.fn(),
      getPosts: jest.fn(),
      getPublicPosts: jest.fn()
    };
    postService = new PostService(postRepository);
  });

  it('should get posts', async () => {
    const expected: Post[] = [generatePostData()];

    postRepository.getPublicPosts.mockResolvedValueOnce(expected);

    const result = await postService.getPosts();

    expect(result).toEqual(expected);
    expect(postRepository.getPublicPosts).toBeCalled();
  });

  it('should create post', async () => {
    const expected: Post = generatePostData();
    const dto: CreatePostDTO = expected;

    postRepository.createPost.mockResolvedValueOnce(expected);

    const result = await postService.createPost(dto);

    expect(result).toEqual(expected);
    expect(postRepository.createPost).toBeCalledWith(dto);
  });

  it('should get post by id', async () => {
    const expected: Post = generatePostData();
    const id = expected.id;

    postRepository.getPostById.mockResolvedValueOnce(expected);

    const result = await postService.getPostById(id);

    expect(result).toEqual(expected);
    expect(postRepository.getPostById).toBeCalledWith(id);
  });
});
