import { UserAttributes } from '@app/models/UserModel';

export const mockUser: UserAttributes = {
  id: 'user-123',
  userStatusId: 'status-1',
  forename: 'John',
  surname: 'Doe',
  username: 'johndoe',
  created: new Date('2024-01-01'),
  modified: new Date('2024-01-01'),
};

export const mockUsers: UserAttributes[] = [
  mockUser,
  {
    id: 'user-456',
    userStatusId: 'status-1',
    forename: 'Jane',
    surname: 'Smith',
    username: 'janesmith',
    created: new Date('2024-01-02'),
    modified: new Date('2024-01-02'),
  },
];

export const mockUserEmails = [
  { email: 'john@example.com' },
  { email: 'john.doe@example.com' },
];
