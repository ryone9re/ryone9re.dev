'use client';

import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1).max(50),
  thumbnail: z.string().min(1).max(4),
  content: z.string().min(1),
  visible: z.boolean()
});
