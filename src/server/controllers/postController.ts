import { prisma } from '@/infrastructure/prismaClient';
import { PostRepository } from '@/infrastructure/repositories/PostRepository';
import { PostService } from '@/server/services/post';
import {
  validateCreateUpdatePost,
  validatePageNumber,
  validatePostId
} from '@/server/services/post/validation';
import { NextResponse, type NextRequest } from 'next/server';

const postService = new PostService(new PostRepository(prisma));

export async function getAllController() {
  const posts = await postService.getPosts();

  return NextResponse.json(posts);
}

export async function getAllWithPaginationController(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const p = searchParams.get('p');

  let page = 1;

  if (p) {
    const result = validatePageNumber(p);

    if (!result.valid) {
      console.log(result.errors);
      return NextResponse.json(result.errors, { status: 404 });
    }

    page = result.data;
  }

  const posts = await postService.getPostsWithPagination(page);

  return NextResponse.json(posts);
}

export async function getOneController(
  req: NextRequest,
  {
    params: { id }
  }: {
    params: { id: string };
  }
) {
  const result = validatePostId(id);

  if (!result.valid) {
    console.log(result.errors);
    return NextResponse.json(result.errors, { status: 400 });
  }

  const post = await postService.getPostById(result.data);

  if (!post) {
    return NextResponse.next();
  }

  return NextResponse.json(post);
}

export async function postController(req: NextRequest) {
  const body = await req.json();

  const result = validateCreateUpdatePost(body);

  if (!result.valid) {
    console.log(result.errors);
    return NextResponse.json(result.errors, { status: 400 });
  }

  const post = await postService.createPost(result.data);

  return NextResponse.json(post, { status: 201 });
}
