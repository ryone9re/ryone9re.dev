import { z } from 'zod';

export const CreateUpdatePostSchema = z.object({
  title: z.string().min(1),
  thumbnail: z.string().min(1).max(4),
  content: z.string().min(1),
  visible: z.boolean()
});

export function validateCreateUpdatePost(data: unknown):
  | {
      valid: true;
      data: {
        title: string;
        thumbnail: string;
        content: string;
        visible: boolean;
      };
    }
  | { valid: false; errors: z.ZodIssue[] } {
  const result = CreateUpdatePostSchema.safeParse(data);

  if (result.success) {
    return { valid: true, data: result.data };
  }

  return { valid: false, errors: result.error.errors };
}

export const IdValidationSchema = z.string().cuid();

export function validatePostId(
  data: unknown
): { valid: true; data: string } | { valid: false; errors: z.ZodIssue[] } {
  const result = IdValidationSchema.safeParse(data);

  if (result.success) {
    return { valid: true, data: result.data };
  }

  return { valid: false, errors: result.error.errors };
}
