export const invalidLoginCases: ReadonlyArray<{
  case: string;
  email: string;
  password: string;
}> = [
  { case: 'wrong password', email: 'customer@practicesoftwaretesting.com', password: 'wrong-pass' },
  { case: 'unknown email', email: 'no-such-user@example.com', password: 'welcome01' },
];
