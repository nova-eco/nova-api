import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { BaseModel, BaseModelAttributes } from '@app/models/BaseModel';
import { Database } from '@app/models/Database';

// Mock the Database module
jest.mock('@app/models/Database');

interface TestModelAttributes extends BaseModelAttributes {
  id: string;
  name: string;
  email: string;
  created?: Date;
  modified?: Date;
}

class TestModel extends BaseModel<TestModelAttributes> {
  constructor() {
    super('test_table', 'id');
  }
}

describe('BaseModel - Positive Tests', () => {
  let testModel: TestModel;
  const mockQueryFn = Database.query as jest.MockedFunction<typeof Database.query>;

  beforeEach(() => {
    testModel = new TestModel();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a new record successfully', async () => {
      const newData = {
        name: 'Test User',
        email: 'test@example.com',
      };

      const createdRecord: TestModelAttributes = {
        id: 'generated-uuid-123',
        name: 'Test User',
        email: 'test@example.com',
        created: new Date('2024-01-01'),
        modified: new Date('2024-01-01'),
      };

      // Mock INSERT query
      mockQueryFn.mockResolvedValueOnce([{ insertId: 1 }]);
      // Mock SELECT query to return the created record
      mockQueryFn.mockResolvedValueOnce([createdRecord]);

      const result = await testModel.create(newData);

      expect(result).toEqual(createdRecord);
      expect(mockQueryFn).toHaveBeenCalledTimes(2);
      expect(mockQueryFn).toHaveBeenNthCalledWith(
        1,
        'INSERT INTO test_table (name, email) VALUES (?, ?)',
        ['Test User', 'test@example.com'],
      );
    });

    it('should create a record with multiple fields', async () => {
      const newData = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const createdRecord: TestModelAttributes = {
        id: 'uuid-456',
        name: 'John Doe',
        email: 'john@example.com',
        created: new Date('2024-01-15'),
        modified: new Date('2024-01-15'),
      };

      mockQueryFn.mockResolvedValueOnce([{ insertId: 1 }]);
      mockQueryFn.mockResolvedValueOnce([createdRecord]);

      const result = await testModel.create(newData);

      expect(result).toEqual(createdRecord);
      expect(result.id).toBe('uuid-456');
      expect(result.name).toBe('John Doe');
    });
  });

  describe('findByPk', () => {
    it('should find a record by primary key', async () => {
      const mockRecord: TestModelAttributes = {
        id: 'uuid-123',
        name: 'Test User',
        email: 'test@example.com',
        created: new Date('2024-01-01'),
        modified: new Date('2024-01-01'),
      };

      mockQueryFn.mockResolvedValueOnce([mockRecord]);

      const result = await testModel.findByPk('uuid-123');

      expect(result).toEqual(mockRecord);
      expect(mockQueryFn).toHaveBeenCalledWith(
        'SELECT * FROM test_table WHERE id = ? LIMIT 1',
        ['uuid-123'],
      );
    });

    it('should return null when record not found', async () => {
      mockQueryFn.mockResolvedValueOnce([]);

      const result = await testModel.findByPk('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('findOne', () => {
    it('should find one record by field conditions', async () => {
      const mockRecord: TestModelAttributes = {
        id: 'uuid-123',
        name: 'Test User',
        email: 'test@example.com',
        created: new Date('2024-01-01'),
        modified: new Date('2024-01-01'),
      };

      mockQueryFn.mockResolvedValueOnce([mockRecord]);

      const result = await testModel.findOne({ email: 'test@example.com' });

      expect(result).toEqual(mockRecord);
      expect(mockQueryFn).toHaveBeenCalledWith(
        'SELECT * FROM test_table WHERE email = ? LIMIT 1',
        ['test@example.com'],
      );
    });

    it('should find one record with multiple conditions', async () => {
      const mockRecord: TestModelAttributes = {
        id: 'uuid-123',
        name: 'Test User',
        email: 'test@example.com',
        created: new Date('2024-01-01'),
        modified: new Date('2024-01-01'),
      };

      mockQueryFn.mockResolvedValueOnce([mockRecord]);

      const result = await testModel.findOne({
        name: 'Test User',
        email: 'test@example.com',
      });

      expect(result).toEqual(mockRecord);
      expect(mockQueryFn).toHaveBeenCalledWith(
        'SELECT * FROM test_table WHERE name = ? AND email = ? LIMIT 1',
        ['Test User', 'test@example.com'],
      );
    });

    it('should return null when no matching record found', async () => {
      mockQueryFn.mockResolvedValueOnce([]);

      const result = await testModel.findOne({ email: 'nonexistent@example.com' });

      expect(result).toBeNull();
    });

    it('should return null when empty where object provided', async () => {
      const result = await testModel.findOne({});

      expect(result).toBeNull();
      expect(mockQueryFn).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should find all records without filters', async () => {
      const mockRecords: TestModelAttributes[] = [
        {
          id: 'uuid-1',
          name: 'User 1',
          email: 'user1@example.com',
          created: new Date('2024-01-01'),
          modified: new Date('2024-01-01'),
        },
        {
          id: 'uuid-2',
          name: 'User 2',
          email: 'user2@example.com',
          created: new Date('2024-01-02'),
          modified: new Date('2024-01-02'),
        },
      ];

      mockQueryFn.mockResolvedValueOnce(mockRecords);

      const result = await testModel.findAll();

      expect(result).toEqual(mockRecords);
      expect(result).toHaveLength(2);
      expect(mockQueryFn).toHaveBeenCalledWith('SELECT * FROM test_table', []);
    });

    it('should find records with where condition', async () => {
      const mockRecords: TestModelAttributes[] = [
        {
          id: 'uuid-1',
          name: 'Test User',
          email: 'test@example.com',
          created: new Date('2024-01-01'),
          modified: new Date('2024-01-01'),
        },
      ];

      mockQueryFn.mockResolvedValueOnce(mockRecords);

      const result = await testModel.findAll({
        where: { name: 'Test User' },
      });

      expect(result).toEqual(mockRecords);
      expect(mockQueryFn).toHaveBeenCalledWith(
        'SELECT * FROM test_table WHERE name = ?',
        ['Test User'],
      );
    });

    it('should find records with limit', async () => {
      const mockRecords: TestModelAttributes[] = [
        {
          id: 'uuid-1',
          name: 'User 1',
          email: 'user1@example.com',
          created: new Date('2024-01-01'),
          modified: new Date('2024-01-01'),
        },
      ];

      mockQueryFn.mockResolvedValueOnce(mockRecords);

      const result = await testModel.findAll({ limit: 10 });

      expect(result).toEqual(mockRecords);
      expect(mockQueryFn).toHaveBeenCalledWith('SELECT * FROM test_table LIMIT ?', [10]);
    });

    it('should find records with limit and offset', async () => {
      const mockRecords: TestModelAttributes[] = [];

      mockQueryFn.mockResolvedValueOnce(mockRecords);

      const result = await testModel.findAll({
        limit: 10,
        offset: 20,
      });

      expect(result).toEqual(mockRecords);
      expect(mockQueryFn).toHaveBeenCalledWith(
        'SELECT * FROM test_table LIMIT ? OFFSET ?',
        [10, 20],
      );
    });

    it('should find records with orderBy', async () => {
      const mockRecords: TestModelAttributes[] = [];

      mockQueryFn.mockResolvedValueOnce(mockRecords);

      const result = await testModel.findAll({
        orderBy: 'created DESC',
      });

      expect(result).toEqual(mockRecords);
      expect(mockQueryFn).toHaveBeenCalledWith(
        'SELECT * FROM test_table ORDER BY created DESC',
        [],
      );
    });

    it('should find records with all options combined', async () => {
      const mockRecords: TestModelAttributes[] = [];

      mockQueryFn.mockResolvedValueOnce(mockRecords);

      const result = await testModel.findAll({
        where: { name: 'Test' },
        orderBy: 'created DESC',
        limit: 5,
        offset: 10,
      });

      expect(result).toEqual(mockRecords);
      expect(mockQueryFn).toHaveBeenCalledWith(
        'SELECT * FROM test_table WHERE name = ? ORDER BY created DESC LIMIT ? OFFSET ?',
        ['Test', 5, 10],
      );
    });
  });

  describe('findBy', () => {
    it('should find records by a specific field', async () => {
      const mockRecords: TestModelAttributes[] = [
        {
          id: 'uuid-1',
          name: 'Test User',
          email: 'test1@example.com',
          created: new Date('2024-01-01'),
          modified: new Date('2024-01-01'),
        },
        {
          id: 'uuid-2',
          name: 'Test User',
          email: 'test2@example.com',
          created: new Date('2024-01-02'),
          modified: new Date('2024-01-02'),
        },
      ];

      mockQueryFn.mockResolvedValueOnce(mockRecords);

      const result = await testModel.findBy('name', 'Test User');

      expect(result).toEqual(mockRecords);
      expect(result).toHaveLength(2);
      expect(mockQueryFn).toHaveBeenCalledWith(
        'SELECT * FROM test_table WHERE name = ?',
        ['Test User'],
      );
    });
  });

  describe('update', () => {
    it('should update a record successfully', async () => {
      const updatedRecord: TestModelAttributes = {
        id: 'uuid-123',
        name: 'Updated User',
        email: 'updated@example.com',
        created: new Date('2024-01-01'),
        modified: new Date('2024-01-15'),
      };

      mockQueryFn.mockResolvedValueOnce([{ affectedRows: 1 }]);
      mockQueryFn.mockResolvedValueOnce([updatedRecord]);

      const result = await testModel.update('uuid-123', {
        name: 'Updated User',
      });

      expect(result).toEqual(updatedRecord);
      expect(mockQueryFn).toHaveBeenCalledTimes(2);
      expect(mockQueryFn).toHaveBeenNthCalledWith(
        1,
        'UPDATE test_table SET name = ? WHERE id = ?',
        ['Updated User', 'uuid-123'],
      );
    });

    it('should update multiple fields', async () => {
      const updatedRecord: TestModelAttributes = {
        id: 'uuid-123',
        name: 'New Name',
        email: 'newemail@example.com',
        created: new Date('2024-01-01'),
        modified: new Date('2024-01-15'),
      };

      mockQueryFn.mockResolvedValueOnce([{ affectedRows: 1 }]);
      mockQueryFn.mockResolvedValueOnce([updatedRecord]);

      const result = await testModel.update('uuid-123', {
        name: 'New Name',
        email: 'newemail@example.com',
      });

      expect(result).toEqual(updatedRecord);
      expect(mockQueryFn).toHaveBeenNthCalledWith(
        1,
        'UPDATE test_table SET name = ?, email = ? WHERE id = ?',
        ['New Name', 'newemail@example.com', 'uuid-123'],
      );
    });

    it('should return existing record when no data to update', async () => {
      const existingRecord: TestModelAttributes = {
        id: 'uuid-123',
        name: 'Existing User',
        email: 'existing@example.com',
        created: new Date('2024-01-01'),
        modified: new Date('2024-01-01'),
      };

      mockQueryFn.mockResolvedValueOnce([existingRecord]);

      const result = await testModel.update('uuid-123', {});

      expect(result).toEqual(existingRecord);
      expect(mockQueryFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('count', () => {
    it('should count all records without filter', async () => {
      mockQueryFn.mockResolvedValueOnce([{ total: 42 }]);

      const result = await testModel.count();

      expect(result).toBe(42);
      expect(mockQueryFn).toHaveBeenCalledWith(
        'SELECT COUNT(*) as total FROM test_table',
        [],
      );
    });

    it('should count records with where condition', async () => {
      mockQueryFn.mockResolvedValueOnce([{ total: 5 }]);

      const result = await testModel.count({ name: 'Test User' });

      expect(result).toBe(5);
      expect(mockQueryFn).toHaveBeenCalledWith(
        'SELECT COUNT(*) as total FROM test_table WHERE name = ?',
        ['Test User'],
      );
    });

    it('should count records with multiple conditions', async () => {
      mockQueryFn.mockResolvedValueOnce([{ total: 2 }]);

      const result = await testModel.count({
        name: 'Test User',
        email: 'test@example.com',
      });

      expect(result).toBe(2);
      expect(mockQueryFn).toHaveBeenCalledWith(
        'SELECT COUNT(*) as total FROM test_table WHERE name = ? AND email = ?',
        ['Test User', 'test@example.com'],
      );
    });

    it('should return 0 when no results', async () => {
      mockQueryFn.mockResolvedValueOnce([]);

      const result = await testModel.count();

      expect(result).toBe(0);
    });
  });
});
