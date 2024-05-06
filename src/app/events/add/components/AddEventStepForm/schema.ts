import { CalendarType, EventType, Repetition } from '@prisma/client';
import { z } from 'zod';

export const FormDataSchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(50),
    type: z.nativeEnum(EventType),
    eventeeId: z.string().min(1, 'EventeeId is required'),
    birthday: z.date(),
    calendarType: z.nativeEnum(CalendarType),
    repetition: z.nativeEnum(Repetition),
  })
  .refine((data) => {
    if (data.type === 'BIRTHDAY' && data.birthday === undefined) {
      return false;
    }

    return true;
  }, 'Birthday is required');
