import React from 'react';

import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Cake, Flower, HeartHandshake } from 'lucide-react';
import EventeeSelectBox from '@/app/events/_components/EventeeSelect';
import { useFormContext, useWatch } from 'react-hook-form';
import { AddEventStepFormType } from './AddEventStepForm';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { parseDateToInputValue } from '@/lib/date-utils';

function Step1() {
  const form = useFormContext<AddEventStepFormType>();
  useWatch({ name: 'type' });

  return (
    <div className='grid gap-6'>
      <div className='grid gap-3'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>This is your event name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='grid gap-3'>
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>이벤트 타입</FormLabel>
              <FormControl>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger
                    className='items-start [&_[data-description]]:hidden'
                    id={field.name}
                  >
                    <SelectValue placeholder='Select an event type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='BIRTHDAY'>
                      <div className='flex items-start gap-3 text-muted-foreground'>
                        <Cake className='size-5' />
                        <div className='grid gap-0.5'>
                          <p>
                            Birthday{' '}
                            <span className='font-medium text-foreground'>
                              생일
                            </span>
                          </p>
                          <p className='text-xs' data-description>
                            매년 생일에 축하문자를 생성해서 보내드립니다!
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value='GREETING'>
                      <div className='flex items-start gap-3 text-muted-foreground'>
                        <HeartHandshake className='size-5' />
                        <div className='grid gap-0.5'>
                          <p>
                            Greeting{' '}
                            <span className='font-medium text-foreground'>
                              안부
                            </span>
                          </p>
                          <p className='text-xs' data-description>
                            주기별로 안부문자를 생성해서 보내드립니다!
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value='WEDDING' disabled>
                      <div className='flex items-start gap-3 text-muted-foreground'>
                        <Flower className='size-5' />
                        <div className='grid gap-0.5'>
                          <p>
                            Wedding{' '}
                            <span className='font-medium text-foreground'>
                              결혼기념일 (comming)
                            </span>
                          </p>
                          <p className='text-xs' data-description>
                            매년 결혼기념일 문자를 생성해서 보내드립니다!
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is your event Type.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='grid gap-3'>
        <FormField
          control={form.control}
          name='eventeeId'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Eventee</FormLabel>
              <FormControl>
                <EventeeSelectBox
                  value={field.value}
                  onValueChange={(value, eventee) => {
                    field.onChange(value);
                    form.setValue('birthday', new Date(eventee.birthday), {
                      shouldValidate: true,
                    });
                  }}
                />
              </FormControl>
              <FormDescription>This is your event name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {form.getValues('type') === 'BIRTHDAY' && (
        <FormField
          control={form.control}
          name='birthday'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthday</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  type='date'
                  pattern='\d{4}-\d{2}-\d{2}'
                  value={parseDateToInputValue(field.value)}
                  onChange={(e) => {
                    field.onChange(new Date(e.target.value));
                  }}
                />
              </FormControl>
              <FormDescription>This is your birthday</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {form.getValues('type') === 'BIRTHDAY' && (
        <FormField
          control={form.control}
          name='calendarType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>calendarType</FormLabel>
              <FormControl>
                <Select
                  name={field.name}
                  defaultValue='SOLAR'
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger id={field.name} className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='SOLAR'>양력</SelectItem>
                    <SelectItem value='LUNAR'>음력</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is your calendarType</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {form.getValues('type') === 'GREETING' && (
        <FormField
          control={form.control}
          name='repetition'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repetition</FormLabel>
              <FormControl>
                <Select
                  name={field.name}
                  defaultValue='MONTHLY'
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger id={field.name} className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='WEEKLY'>매주</SelectItem>
                    <SelectItem value='MONTHLY'>매월</SelectItem>
                    <SelectItem value='QUARTERLY'>매분기</SelectItem>
                    <SelectItem value='YEARLY'>매년</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is your repetition</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}

export default Step1;
