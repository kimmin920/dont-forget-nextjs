'use client';
import React, { useState } from 'react';
import { addEvent } from '../actions';
import { Button } from '@/components/ui/button';
import { EventeeSelect } from '../../components/EventeeDrawer';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bird,
  Cake,
  Dice1,
  Flower,
  HeartHandshake,
  HeartHandshakeIcon,
  Rabbit,
  Star,
  Turtle,
} from 'lucide-react';
import EventeeSelectBox from '../../components/EventeeSelect';
import { EventType } from '@prisma/client';

function AddEventForm({ children }: { children: React.ReactNode }) {
  const [eventType, setEventType] = useState<EventType | null>(null);
  return (
    <>
      <form action={addEvent}>
        {/* {children} */}

        <Card>
          <CardHeader>
            <CardTitle>이벤트 등록</CardTitle>
            <CardDescription>
              Lipsum dolor sit amet, consectetur adipiscing elit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='title'>이벤트 이름</Label>
                <Input
                  id='title'
                  name='title'
                  type='text'
                  className='w-full'
                  placeholder='엄마 생일'
                />
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='type'>이벤트 타입</Label>
                <Select
                  name='type'
                  onValueChange={(value) => setEventType(value as EventType)}
                >
                  <SelectTrigger
                    id='type'
                    name='type'
                    className='items-start [&_[data-description]]:hidden'
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
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='eventeeId'>Eventee</Label>
                <EventeeSelectBox />
              </div>

              {eventType === 'BIRTHDAY' && (
                <>
                  <div className='grid gap-3'>
                    <Label htmlFor='birthday'>Birthday</Label>
                    <Input type='date' name='birthday' id='birthday' />
                  </div>

                  <div className='grid gap-3'>
                    <Label htmlFor='calendarType'>음력/양력</Label>
                    <Select name='calendarType' defaultValue='SOLAR'>
                      <SelectTrigger id='calendarType' className='w-full'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='SOLAR'>양력</SelectItem>
                        <SelectItem value='LUNAR'>음력</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {eventType === 'GREETING' && 'greeting' && (
                <div className='grid gap-3'>
                  <Label htmlFor='repetition'>반복주기</Label>
                  <Select name='repetition' defaultValue='MONTHLY'>
                    <SelectTrigger id='repetition' className='w-full'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='WEEKLY'>매주</SelectItem>
                      <SelectItem value='MONTHLY'>매월</SelectItem>
                      <SelectItem value='QUARTERLY'>매분기</SelectItem>
                      <SelectItem value='YEARLY'>매년</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className='border-t px-6 py-4'>
            <Button type='submit'>SAVE</Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}

export default AddEventForm;
