'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, useState, FormEvent } from 'react';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Checkbox } from '../../../components/ui/checkbox';
import { Button } from '../../../components/ui/button';
import { initPerson, IPerson, PersonProps, PersonError, PersonSchema } from '../schemas/person_schema';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createPerson } from '../actions/person_actons_net';

const Person = ({ persons }: PersonProps) => {
  const [person, setPerson] = useState<IPerson>(initPerson);

  console.log(persons);

  const [personError, setPersonError] = useState<PersonError>({});
  function handleChange({ target: { name, value } }: ChangeEvent<HTMLInputElement>): void {
    setPerson({ ...person, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement> | undefined): Promise<void> {
    e?.preventDefault();
    const validationResult = PersonSchema.safeParse(person);
    if (!validationResult.success) {
      // errors
      setPersonError({ message: validationResult.error.message, errors: validationResult.error.issues as [] });
      console.log(validationResult.error.issues);
      return;
    }
    const submittedPerson = { ...person };
    // In memor person
    // var response = await addPerson(submittedPerson);
    var response = await createPerson(submittedPerson);
    console.log(response);
    setPerson(initPerson);
    setPersonError({});
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='m-36 flex flex-col gap-y-6'>
          <div className='grid w-full max-w-sm items-center gap-3'>
            <Label htmlFor='firstName'>First name</Label>
            <Input id='firstName' name='firstName' value={person.firstName} onChange={handleChange}></Input>
          </div>

          <div className='grid w-full max-w-sm items-center gap-3'>
            <Label htmlFor='lastName'>Last name</Label>
            <Input id='lastName' name='lastName' value={person.lastName} onChange={handleChange}></Input>
          </div>

          <div className='grid w-full max-w-sm items-center gap-3'>
            <Label htmlFor='dob'>Date of birth</Label>
            <Input type='date' id='dob' name='dob' value={person.dob} onChange={handleChange}></Input>
          </div>

          <div className='grid w-full max-w-sm items-center gap-3'>
            <RadioGroup onValueChange={(e) => setPerson({ ...person, gender: e })} name='gender' value={person.gender}>
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
            <Select value={person.city} onValueChange={(value) => setPerson({ ...person, city: value })}>
              <SelectTrigger data-testid='select-1' className='w-[180px]'>
                <SelectValue placeholder='City' />
              </SelectTrigger>
              <SelectContent data-testid='select-content'>
                <SelectItem data-testid='london' value='london'>
                  London
                </SelectItem>
                <SelectItem data-testid='paris' value='paris'>
                  Paris
                </SelectItem>
                <SelectItem data-tesid='lahore' value='lahore'>
                  Lahore
                </SelectItem>
              </SelectContent>
            </Select>{' '}
          </div>

          <div className='flex items-center gap-3'>
            <Checkbox
              id='terms'
              checked={person.termsAccepted}
              onCheckedChange={(checked: CheckedState) => setPerson({ ...person, termsAccepted: checked as boolean })}
            />
            <Label htmlFor='terms'>Accept terms and conditions</Label>{' '}
          </div>

          <div className='grid w-full max-w-sm items-center gap-3'>
            <Button>Submit</Button>
          </div>
        </div>
      </form>
      <div className='m-36 flex flex-col gap-y-6'>
        {persons.length > 0 ? (
          <Table>
            <TableCaption>A list of persons</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>First name</TableHead>
                <TableHead>Last name</TableHead>
                <TableHead>Dob</TableHead>
                <TableHead className='text-right'>Gender</TableHead>
                <TableHead className='text-right'>City</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {persons.map((person, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>{person.firstName}</TableCell>
                  <TableCell className='font-medium'>{person.lastName}</TableCell>
                  <TableCell>{person.dob}</TableCell>
                  <TableCell>{person.gender}</TableCell>
                  <TableCell className='text-right'>{person.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className='text-right'>{persons.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <div>No person added yet</div>
        )}
      </div>
    </>
  );
};

export default Person;
