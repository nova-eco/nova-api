import { SessionAttributes } from '@app/models/SessionModel';

export const mockSession: SessionAttributes = {
  id: 'session-123',
  userId: 'user-123',
  validUntilTimestamp: 1735689600,
  created: new Date('2024-01-01'),
  modified: new Date('2024-01-01'),
};

export const mockSessions: SessionAttributes[] = [
  mockSession,
  {
    id: 'session-456',
    userId: 'user-456',
    validUntilTimestamp: 1735689600,
    created: new Date('2024-01-02'),
    modified: new Date('2024-01-02'),
  },
];

export const mockPassword = {
  password: '$2b$10$hashedpassword',
};
