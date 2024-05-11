import { EventType } from '@prisma/client';
import { z } from 'zod';

export const MessageSchema = z.object({
  from: z.string(),
  to: z.string(),
  type: z.nativeEnum(EventType),
});

export type MessageSchemaType = z.infer<typeof MessageSchema>;
