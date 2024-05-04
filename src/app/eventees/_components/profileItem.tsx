import { Eventee } from '@prisma/client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function EventeeProfile({ eventee }: { eventee: Eventee }) {
  return (
    <div className='flex items-center gap-4'>
      <Avatar className='hidden h-9 w-9 sm:flex'>
        <AvatarImage src='/avatars/04.png' alt='Avatar' />
        <AvatarFallback>WK</AvatarFallback>
      </Avatar>
      <div className='grid gap-1'>
        <p className='text-sm font-medium leading-none'>{eventee.name}</p>
        <p className='text-sm text-muted-foreground'>{eventee.phoneNumber}</p>
      </div>
      <div className='ml-auto font-medium'>
        {new Date(eventee.birthday).toISOString()}
      </div>
    </div>
  );
}
