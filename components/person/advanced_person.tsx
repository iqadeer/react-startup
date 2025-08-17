'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useActionState } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { initPerson, IPerson, PersonSchema } from '../../features/person/schemas/person_schema';

const AdvancedPerson = () => {
  const [persons, setPersons] = useState<IPerson[]>([]);

  const addPerson = async (currState: IPerson, formData: FormData) => {
    var data = Object.fromEntries(formData) as unknown as IPerson;
    console.log(JSON.stringify(data, null, 2));
    var validation = await PersonSchema.safeParseAsync(data);
    if (!validation.success) {
      // console.log(JSON.stringify(validation.error.issues, null, 2));
      return { ...data, isSuccess: validation.success, message: validation.error.message };
    }
    setPersons([...persons, { ...initPerson, ...data }]);
    await new Promise((r) => setTimeout(r, 500));
    return { ...initPerson, message: Date.now().toString(), isSuccess: validation.success };
  };

  const [person, personFromAction, isPending] = useActionState(addPerson, initPerson);

  // console.log(JSON.stringify(person, null, 2));
  return (
    <form action={personFromAction}>
      <div className='m-36 flex flex-col gap-y-6'>
        <div className='grid w-full max-w-sm items-center gap-3'>
          <Label htmlFor='firstName'>First name</Label>
          <Input name='firstName' defaultValue={person.firstName}></Input>
        </div>

        <div className='grid w-full max-w-sm items-center gap-3'>
          <Label htmlFor='lastName'>Last name</Label>
          <Input name='lastName' defaultValue={person.lastName}></Input>
        </div>

        <div className='grid w-full max-w-sm items-center gap-3'>
          <Label htmlFor='dob'>Date of birth</Label>
          <Input type='date' name='dob' defaultValue={person.dob}></Input>
        </div>

        <div className='grid w-full max-w-sm items-center gap-3'>
          <RadioGroup name='gender' defaultValue={person.gender}>
            <div className='flex items-center gap-3'>
              <RadioGroupItem value='male' id='r1' />
              <Label htmlFor='r1'>Male</Label>
            </div>
            <div className='flex items-center gap-3'>
              <RadioGroupItem value='female' id='r2' />
              <Label htmlFor='r2'>Female</Label>
            </div>
          </RadioGroup>{' '}
        </div>

        <div className='grid w-full max-w-sm items-center gap-3'>
          <Select defaultValue='' name='city'>
            <SelectTrigger data-testid='select-1' className='w-[180px]'>
              <SelectValue placeholder='City' />
            </SelectTrigger>
            <SelectContent data-testid='select-content'>
              <SelectItem data-testid='light' value='london'>
                London
              </SelectItem>
              <SelectItem data-testid='dark' value='paris'>
                Paris
              </SelectItem>
              <SelectItem data-tesid='system' value='lahore'>
                Lahore
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='flex items-center gap-3'>
          <Checkbox
            name='termsAccepted'
            // key={person.termsAccepted ?? 'unset'}
            defaultChecked={person.termsAccepted}
          />
          <Label htmlFor='terms'>Accept terms and conditions</Label>{' '}
        </div>
        <div className='grid w-full max-w-sm items-center gap-3'>
          <Button>Submit</Button>
        </div>
      </div>
    </form>
  );
};

export default AdvancedPerson;
