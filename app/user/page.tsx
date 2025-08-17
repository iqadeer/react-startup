'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ChangeEvent, useId, useState } from 'react';

const SimpleForm = () => {
  const [person, setPerson] = useState({
    name: '',
    address: '',
    email: '',
    mode: '',
    terms: false,
    level: '',
    dob: '',
  });
  const [count, incrementCount] = useState<number>(0);

  const increment = () => {
    incrementCount(count + 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const dobId = useId();

  return (
    <>
      <div className='m-36 flex flex-col gap-y-6'>
        <div className='grid w-full max-w-sm items-center gap-3'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' placeholder='Full Name' name='name' onChange={handleChange} value={person.name} />
        </div>
        <div className='grid w-full max-w-sm items-center gap-3'>
          <label htmlFor={dobId}>Dob</label>
          <Input
            type='date'
            id={dobId}
            value={person.dob}
            name='dob'
            placeholder='Date of birth'
            onChange={handleChange}
          ></Input>
        </div>
        <div className='grid w-full max-w-sm items-center gap-3'>
          <Label htmlFor='email'>Email</Label>
          <Input
            value={person.email}
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            onChange={handleChange}
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-3'>
          <Label htmlFor='address'>Address</Label>
          <Input id='address' placeholder='Address' name='address' onChange={handleChange} value={person.address} />
        </div>

        <RadioGroup onValueChange={(e) => setPerson({ ...person, level: e })} name='leverl' value={person.level}>
          <div className='flex items-center gap-3'>
            <RadioGroupItem value='default' id='r1' />
            <Label htmlFor='r1'>Default</Label>
          </div>
          <div className='flex items-center gap-3'>
            <RadioGroupItem value='comfortable' id='r2' />
            <Label htmlFor='r2'>Comfortable</Label>
          </div>
          <div className='flex items-center gap-3'>
            <RadioGroupItem value='compact' id='r3' />
            <Label htmlFor='r3'>Compact</Label>
          </div>
        </RadioGroup>

        <div className='flex items-center gap-3'>
          <Checkbox
            id='terms'
            checked={person.terms}
            onCheckedChange={(checked: CheckedState) => setPerson({ ...person, terms: checked as boolean })}
          />
          <Label htmlFor='terms'>Accept terms and conditions</Label>
        </div>

        <div className='flex items-center gap-3'>
          <Select value={person.mode} onValueChange={(value) => setPerson({ ...person, mode: value })}>
            <SelectTrigger data-testid='select-1' aria-label='Theme' className='w-[180px]'>
              <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent data-testid='select-content'>
              <SelectItem data-testid='light' value='light'>
                Light
              </SelectItem>
              <SelectItem data-testid='dark' value='dark'>
                Dark
              </SelectItem>
              <SelectItem data-tesid='system' value='system'>
                System
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* <div className='flex items-start gap-3'>
          <Checkbox id='terms-2' defaultChecked />
          <div className='grid gap-2'>
            <Label htmlFor='terms-2'>Accept terms and conditions</Label>
            <p className='text-muted-foreground text-sm'>
              By clicking this checkbox, you agree to the terms and conditions.
            </p>
          </div>
        </div> */}
        <div className='gap-3'>
          <label className='gap-3 m-3'>Count is: {count}</label>
          <Button name='increment' onClick={increment}>
            Increment
          </Button>
        </div>
      </div>
    </>
  );
};

export default SimpleForm;
