'use client';

import * as React from 'react';
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type BusinessSwitcherProps = {};

export default function EventeeSwitcher({}: BusinessSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewBusinessDialog, setShowNewBusinessDialog] =
    React.useState(false);

  return (
    <Dialog
      open={showNewBusinessDialog}
      onOpenChange={setShowNewBusinessDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            aria-label='Select a business'
            className={cn('w-[200px] justify-between')}
          >
            name
            <CaretSortIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandList>
              {/* <CommandInput placeholder='Search business...' /> */}
              <CommandEmpty>No Business found.</CommandEmpty>
              {/* <CommandGroup heading='businesses'> */}
              {/* {businesses.map((business) => (
                  <CommandItem
                    key={business.id.toString()}
                    onSelect={() => {
                      setOpen(false);
                      navigate(`${business.id}`);
                    }}
                    value={business.id.toString()}
                    className='text-sm'
                  >
                    <Avatar className='mr-2 h-5 w-5'>
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${business.id}.png`}
                        alt={business.name}
                        className='grayscale'
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {business.name}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        selectedBusiness.id === business.id
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))} */}
              {/* </CommandGroup> */}
            </CommandList>

            <CommandSeparator />

            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewBusinessDialog(true);
                    }}
                  >
                    <PlusCircledIcon className='mr-2 h-5 w-5' />
                    Create Business
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <DialogContent>
        <div>concent</div>
        {/* <Form method='post' action={`/action/create-business`}>
          <DialogHeader>
            <DialogTitle>Create Business</DialogTitle>
            <DialogDescription>
              Add a new business to manage products and customers.
            </DialogDescription>
          </DialogHeader>
          <CreateBusinessForm />
          <DialogFooter>
            <Button
              variant='outline'
              // onClick={() => setShowNewBusinessDialog(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>Continue</Button>
          </DialogFooter>
        </Form> */}
      </DialogContent>
    </Dialog>
  );
}
