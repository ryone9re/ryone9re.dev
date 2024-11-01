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

export async function getAllWithPaginationController(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const p = searchParams.get('p');

  let page = 1;

  if (p) {
    const result = validatePageNumber(p);

    if (!result.valid) {
      console.log(`getAllWithPaginationController: ${result.errors}`);
      return NextResponse.json(result.errors, { status: 404 });
    }

    page = result.data;
  }

  const posts = await postService.getPostsWithPagination(page);

  return NextResponse.json(posts);
}

export async function getPublicAllWithPaginationController(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const p = searchParams.get('p');

  let page = 1;

  if (p) {
    const result = validatePageNumber(p);

    if (!result.valid) {
      console.log(`getPublicAllWithPaginationController: ${result.errors}`);
      return NextResponse.json(result.errors, { status: 404 });
    }

    page = result.data;
  }

  const posts = await postService.getPublicPostsWithPagination(page);

  return NextResponse.json(posts);
}

export async function getOneController(
  _: NextRequest,
  {
    params: { id }
  }: {
    params: { id: string };
  }
) {
  const result = validatePostId(id);

  if (!result.valid) {
    console.log(`getOneController: ${result.errors}`);
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
    console.log(`postController: ${result.errors}`);
    return NextResponse.json(result.errors, { status: 400 });
  }

  const post = await postService.createPost({ ...result.data, authorId: '' });

  return NextResponse.json(post, { status: 201 });
}

export async function putController(
  req: NextRequest,
  {
    params: { id }
  }: {
    params: { id: string };
  }
) {
  const body = await req.json();

  const result = validateCreateUpdatePost(body);

  if (!result.valid) {
    console.log(`putController: ${result.errors}`);
    return NextResponse.json(result.errors, { status: 400 });
  }

  const resultId = validatePostId(id);

  if (!resultId.valid) {
    console.log(`putController: ${resultId.errors}`);
    return NextResponse.json(resultId.errors, { status: 400 });
  }

  const post = await postService.updatePost(resultId.data, result.data);

  return NextResponse.json(post);
}

export async function deleteController(
  _: NextRequest,
  {
    params: { id }
  }: {
    params: { id: string };
  }
) {
  const result = validatePostId(id);

  if (!result.valid) {
    console.log(`deleteController: ${result.errors}`);
    return NextResponse.json(result.errors, { status: 400 });
  }

  const isSuccess = await postService.deletePost(result.data);

  if (!isSuccess) {
    return NextResponse.json({ message: 'Deletion Failed' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Deletion Success' });
}
