'use server';

import { revalidatePath } from 'next/cache';
import { IPerson } from '../schemas/person_schema';
import { Agent } from 'https';

// Disable SSL verification (DEV ONLY!)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// const API_BASE_URL = 'https://localhost:7208/api/Person';
const API_BASE_URL = 'http://localhost:8000/api/person';

// Helper for handling fetch requests
async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as T;
}

// GET ALL Persons
export async function getAllPersons() {
  return fetchData<IPerson[]>(`${API_BASE_URL}`);
}

// GET Single Person by ID
export async function getPerson(id: number) {
  return fetchData<IPerson>(`${API_BASE_URL}/${id}`);
}

// POST (Create) a new Person
export async function createPerson(personData: Omit<IPerson, 'id'>) {
  const resp = fetchData<any>(`${API_BASE_URL}`, {
    method: 'POST',
    body: JSON.stringify(personData),
  });
  revalidatePath('/');
  return resp;
}
