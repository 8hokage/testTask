import { z } from "zod";

export const getUsersQuerySchema = z.object({
  search: z.string().trim().min(1).max(100).optional()
});

export const deleteUserParamsSchema = z.object({
  id: z.string().uuid()
});



