'use server';

import { revalidatePath } from 'next/cache';
import { IPerson, PersonResponse, PersonSchema } from '../schemas/person_schema';

const persons: IPerson[] = [];

export const addPerson = async (person: IPerson): Promise<PersonResponse> => {
  const result = await PersonSchema.safeParseAsync(person);
  if (!result.success) {
    return { person: person, error: { message: result.error.message, errors: result.error.issues as [] } };
  }
  persons.push(person);
  revalidatePath('/');

  return { person };
};

export const getPersons = async (): Promise<IPerson[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return persons;
};
