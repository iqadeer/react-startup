import { z } from 'zod';

export const PersonSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().trim().nonempty().max(60),
  lastName: z.string().trim().nonempty().max(60),
  dob: z
    .string()
    .trim()
    .optional()
    .refine((val) => val === '' || !isNaN(Date.parse(val as string))),
  gender: z
    .string()
    .trim()
    .optional()
    .refine((val) => val === 'male' || val === 'female'),
  city: z.string().trim(),
  termsAccepted: z.boolean(),
});

export type IPerson = z.infer<typeof PersonSchema>;

export type PersonResponse = {
  person: IPerson;
  error?: { message: string; errors: [] };
};
export const initPerson: IPerson = {
  firstName: '',
  lastName: '',
  dob: '',
  gender: '',
  city: '',
  termsAccepted: false,
};

export type PersonProps = {
  persons: IPerson[];
};

export type PersonError = {
  message?: string;
  errors?: [];
};
