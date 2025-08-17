import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, beforeEach } from 'vitest';
import Person from './person';

describe('Person ', () => {
  beforeEach(async () => {
    cleanup();
    render(<Person persons={[]}></Person>);
  });
  test('First name should work', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 1 });
    const firstName = screen.getByRole<HTMLInputElement>('textbox', { name: /first name/i });
    expect(firstName).toHaveValue('');
    await user.type(firstName, 'imran');
    expect(firstName).toHaveValue('imran');
  });

  test('Last name should work', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 1 });
    const lastName = screen.getByRole<HTMLInputElement>('textbox', { name: /last name/i });
    expect(lastName).toHaveValue('');
    await user.type(lastName, 'qadeer');
    expect(lastName).toHaveValue('qadeer');
  });

  test('Dob should work', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 1 });
    const dob = screen.getByLabelText(/Date of birth/i);
    expect(dob).toHaveValue('');
    await user.type(dob, '2024-10-13');
    expect(dob).toHaveValue('2024-10-13');
  });

  test('Gender should work', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 1 });
    const genderMale = screen.getByRole<HTMLInputElement>('radio', { name: /^male$/i });
    const genderFemale = screen.getByRole<HTMLInputElement>('radio', { name: /Female/i });
    expect(genderMale).not.toBeChecked();
    expect(genderFemale).not.toBeChecked();
    await user.click(genderMale);
    expect(genderMale).toBeChecked();
    expect(genderFemale).not.toBeChecked();
    await user.click(genderFemale);
    expect(genderMale).not.toBeChecked();
    expect(genderFemale).toBeChecked();
    expect(genderFemale).toHaveValue('female');
  });

  // To run this test, you need the changes in the setupfile vitest.setup.ts
  test('Cities ', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 1 });
    const trigger = screen.getByTestId('select-1');
    const trigger2 = screen.getByRole('combobox');
    expect(trigger).toBeDefined();
    expect(screen.queryByRole('option', { name: /london/i })).toBeNull();
    expect(screen.queryByRole('option', { name: /paris/i })).toBeNull();
    expect(screen.queryByRole('option', { name: /lahore/i })).toBeNull();
    expect(await screen.findByRole('combobox')).toHaveTextContent('City');

    await user.click(trigger2);

    const content = await screen.findByTestId('select-content');
    expect(content).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /london/i })).not.toBeNull();
    expect(screen.queryByRole('option', { name: /paris/i })).not.toBeNull();
    expect(screen.queryByRole('option', { name: /lahore/i })).not.toBeNull();

    await user.click(screen.getByRole('option', { name: /london/i }));

    expect(await screen.findByRole('combobox')).toHaveTextContent('London');
    expect(screen.queryByRole('option', { name: /london/i })).toBeNull();
    expect(screen.queryByRole('option', { name: /paris/i })).toBeNull();
    expect(screen.queryByRole('option', { name: /lahore/i })).toBeNull();
  });

  test('terms', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 1 });
    const termsCheckbox = screen.getByRole('checkbox', { name: /Accept terms and/i });
    expect(termsCheckbox).toBeDefined();
    expect(termsCheckbox).not.toBeChecked();
    await user.click(termsCheckbox);
    expect(termsCheckbox).toBeChecked();
  });

  test('button', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 1 });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDefined();
    await user.click(submitButton);
  });

  test('button should submit', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 1 });

    const firstName = screen.getByRole<HTMLInputElement>('textbox', { name: /first name/i });
    const lastName = screen.getByRole<HTMLInputElement>('textbox', { name: /last name/i });
    const dob = screen.getByLabelText(/Date of birth/i);
    const genderMale = screen.getByRole<HTMLInputElement>('radio', { name: /^male$/i });
    const genderFemale = screen.getByRole<HTMLInputElement>('radio', { name: /Female/i });
    const trigger = screen.getByTestId('select-1');
    const trigger2 = screen.getByRole('combobox');

    expect(trigger2).toHaveTextContent('City');
    // const lahore = await screen.findByText('Lahore');

    await user.type(firstName, 'Imran');
    await user.type(lastName, 'Qad');
    await user.type(dob, '2024-10-13');
    await user.click(genderMale);
    expect(firstName).toHaveValue('Imran');
    expect(lastName).toHaveValue('Qad');
    expect(dob).toHaveValue('2024-10-13');
    expect(genderFemale).not.toBeChecked();
    expect(genderMale).toBeChecked();
    await user.click(trigger);
    const content = await screen.findByTestId('select-content');
    expect(content).toBeInTheDocument();
    const lahore = await screen.findByRole('option', { name: /lahore/i });
    await user.click(lahore);
    // expect(await screen.findAllByText('London')).toBeDefined();
    expect(await screen.findByRole('combobox')).toHaveTextContent('Lahore');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDefined();
    await user.click(submitButton);

    expect(firstName).toHaveValue('');
    expect(lastName).toHaveValue('');
    expect(dob).toHaveValue('');
    expect(genderFemale).not.toBeChecked();
    expect(genderMale).not.toBeChecked();
    expect(await screen.findByRole('combobox')).toHaveTextContent('City');
  });
});
