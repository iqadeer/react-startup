import { beforeEach, describe, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import SimpleForm from './page';
import userEvent from '@testing-library/user-event';
import { logRoles } from '@testing-library/dom';

// describe('user page should', () => {
//   beforeEach(() => {});
//   it('should have email...', () => {
//     render(<SimpleForm>);
//   });
// });
describe('Email input should', async () => {
  beforeEach(() => {
    cleanup();
  });
  test('Page', async () => {
    const { container } = render(<SimpleForm />);
    logRoles(container);
    const control = screen.getByRole('textbox', { name: 'Email' }) as HTMLInputElement;
    expect(control).toBeDefined();
    expect(control.value).toBe('');
    // await userEvent.type(control, 'abc@abc.com');
    // expect(control.value).toBe('abc@abc.com');
  });
});

describe('Name textbox', () => {
  beforeEach(() => {
    cleanup();
  });
  test('should be empty by default', async () => {
    const { container } = render(<SimpleForm></SimpleForm>);
    const nameTextBox = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
    expect(nameTextBox).toBeDefined();

    userEvent.setup();
    await userEvent.type(nameTextBox, 'Imran');
    expect(nameTextBox.value).toBe('Imran');
  });
});

describe('Name textbox', () => {
  beforeEach(() => {
    cleanup();
  });
  test('should be empty by default', async () => {
    const { container } = render(<SimpleForm></SimpleForm>);
    const nameTextBox = screen.getByRole('textbox', { name: 'Address' }) as HTMLInputElement;
    expect(nameTextBox).toBeDefined();

    userEvent.setup();
    await userEvent.type(nameTextBox, '3400');
    expect(nameTextBox.value).toBe('3400');
  });

  test('radio', async () => {
    render(<SimpleForm></SimpleForm>);
    const radio = screen.getByRole<HTMLInputElement>('radio', { name: 'Default' });
    expect(radio).toBeDefined();
    expect(radio).not.toBeChecked();
    userEvent.setup();
    await userEvent.click(radio);
    expect(radio).toBeChecked();
  });

  test('radio1', async () => {
    const user = userEvent.setup();
    render(<SimpleForm></SimpleForm>);
    const radio = screen.getByRole<HTMLInputElement>('radio', { name: 'Comfortable' });
    expect(radio).toBeDefined();
    expect(radio).not.toBeChecked();
    const level = screen.getByRole<HTMLInputElement>('radio', { name: 'Default' });
    await user.click(level);
    expect(radio).not.toBeChecked();
    expect(level).toBeChecked();
  });

  test('checkbox', async () => {
    const user = userEvent.setup();
    render(<SimpleForm></SimpleForm>);
    const radio = screen.getByRole<HTMLInputElement>('checkbox', { name: 'Accept terms and conditions' });
    expect(radio).toBeDefined();
    expect(radio).not.toBeChecked();
    await user.click(radio);
    expect(radio).toBeChecked();
  });

  test('select', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 1 });
    const { container } = render(<SimpleForm></SimpleForm>);
    const trigger = screen.getByTestId('select-1');
    expect(trigger).toBeDefined();
    await user.click(trigger);
    // Wait for content to appear in document.body
    const content = await screen.findByTestId('select-content');
    expect(content).toBeInTheDocument();
    const darkOption = await screen.findByText('Dark');
    expect(screen.getByText('System')).toBeDefined();
    await user.click(darkOption);
    expect(screen.queryByText('System')).not.toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeDefined();
    // screen.debug(document.body);
    expect(true).toBeTruthy();
    // await user.click(darkOption);
    // expect(trigger).toHaveTextContent('Dark');
  });

  test('button should', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 1 });
    const { container } = render(<SimpleForm></SimpleForm>);

    const button = screen.getByRole('button', { name: /increment/i });
    expect(button).toBeDefined();
    const label = screen.getByText(/count is:/i);
    expect(label).toHaveTextContent('Count is: 0');

    await user.click(button);
    expect(label).toHaveTextContent('Count is: 1');
  });

  test('Date of birth should', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 1 });
    const { container } = render(<SimpleForm></SimpleForm>);
    const dobInput = screen.getByLabelText(/dob/i);
    expect(dobInput).toHaveTextContent('');
    await userEvent.clear(dobInput);
    await userEvent.type(dobInput, '2024-10-10'); // must match yyyy-mm-dd format

    expect(dobInput).toHaveValue('2024-10-10');
  });
});
