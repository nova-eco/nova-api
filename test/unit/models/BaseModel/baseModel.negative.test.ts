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

describe('BaseModel - Negative Tests', () => {
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
    it('should throw error when insert fails', async () => {
      const newData = {
        name: 'Test User',
        email: 'test@example.com',
      };

      mockQueryFn.mockRejectedValueOnce(new Error('Database connection error'));

      await expect(testModel.create(newData)).rejects.toThrow(
        'Database connection error',
      );
    });

    it('should throw error when no record returned after insert', async () => {
      const newData = {
        name: 'Test User',
        email: 'test@example.com',
      };

      mockQueryFn.mockResolvedValueOnce([{ insertId: 1 }]);
      mockQueryFn.mockResolvedValueOnce([]);

      await expect(testModel.create(newData)).rejects.toThrow(
        'Failed to create record in test_table',
      );
    });

    it('should handle database constraint violations', async () => {
      const newData = {
        name: 'Test User',
        email: 'duplicate@example.com',
      };

      mockQueryFn.mockRejectedValueOnce(new Error('Duplicate entry for key'));

      await expect(testModel.create(newData)).rejects.toThrow('Duplicate entry for key');
    });
  });

  describe('findByPk', () => {
    it('should handle database query errors', async () => {
      mockQueryFn.mockRejectedValueOnce(new Error('Connection timeout'));

      await expect(testModel.findByPk('uuid-123')).rejects.toThrow('Connection timeout');
    });

    it('should return null for malformed IDs', async () => {
      mockQueryFn.mockResolvedValueOnce([]);

      const result = await testModel.findByPk('');

      expect(result).toBeNull();
    });
  });

  describe('findOne', () => {
    it('should handle database errors', async () => {
      mockQueryFn.mockRejectedValueOnce(new Error('Table does not exist'));

      await expect(testModel.findOne({ name: 'Test' })).rejects.toThrow(
        'Table does not exist',
      );
    });

    it('should return null for empty where clause', async () => {
      const result = await testModel.findOne({});

      expect(result).toBeNull();
      expect(mockQueryFn).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should handle database connection errors', async () => {
      mockQueryFn.mockRejectedValueOnce(new Error('Lost connection to database'));

      await expect(testModel.findAll()).rejects.toThrow('Lost connection to database');
    });

    it('should handle SQL syntax errors', async () => {
      mockQueryFn.mockRejectedValueOnce(new Error('SQL syntax error'));

      await expect(testModel.findAll({ orderBy: 'invalid field' })).rejects.toThrow(
        'SQL syntax error',
      );
    });

    it('should return empty array when no records found', async () => {
      mockQueryFn.mockResolvedValueOnce([]);

      const result = await testModel.findAll({ where: { name: 'NonExistent' } });

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('findBy', () => {
    it('should handle database errors', async () => {
      mockQueryFn.mockRejectedValueOnce(new Error('Query execution failed'));

      await expect(testModel.findBy('name', 'Test')).rejects.toThrow(
        'Query execution failed',
      );
    });

    it('should return empty array when no matches found', async () => {
      mockQueryFn.mockResolvedValueOnce([]);

      const result = await testModel.findBy('email', 'nonexistent@example.com');

      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should handle database errors during update', async () => {
      mockQueryFn.mockRejectedValueOnce(new Error('Update failed: connection lost'));

      await expect(testModel.update('uuid-123', { name: 'New Name' })).rejects.toThrow(
        'Update failed: connection lost',
      );
    });

    it('should handle constraint violations during update', async () => {
      mockQueryFn.mockRejectedValueOnce(new Error('Foreign key constraint fails'));

      await expect(testModel.update('uuid-123', { name: 'New Name' })).rejects.toThrow(
        'Foreign key constraint fails',
      );
    });

    it('should return null when record not found after update', async () => {
      mockQueryFn.mockResolvedValueOnce([{ affectedRows: 1 }]);
      mockQueryFn.mockResolvedValueOnce([]);

      const result = await testModel.update('uuid-123', { name: 'New Name' });

      expect(result).toBeNull();
    });

    it('should handle update with non-existent ID', async () => {
      mockQueryFn.mockResolvedValueOnce([{ affectedRows: 0 }]);
      mockQueryFn.mockResolvedValueOnce([]);

      const result = await testModel.update('non-existent-id', { name: 'New Name' });

      expect(result).toBeNull();
    });
  });

  describe('count', () => {
    it('should handle database errors', async () => {
      mockQueryFn.mockRejectedValueOnce(new Error('Count query failed'));

      await expect(testModel.count()).rejects.toThrow('Count query failed');
    });

    it('should return 0 when count query returns empty result', async () => {
      mockQueryFn.mockResolvedValueOnce([]);

      const result = await testModel.count();

      expect(result).toBe(0);
    });

    it('should return 0 when count query returns undefined total', async () => {
      mockQueryFn.mockResolvedValueOnce([{ total: undefined }]);

      const result = await testModel.count();

      expect(result).toBe(0);
    });

    it('should handle invalid where conditions', async () => {
      mockQueryFn.mockRejectedValueOnce(new Error('Invalid column name'));

      await expect(testModel.count({ name: 'Test' } as unknown)).rejects.toThrow(
        'Invalid column name',
      );
    });
  });

  describe('edge cases', () => {
    it('should handle SQL injection attempts in findOne', async () => {
      mockQueryFn.mockResolvedValueOnce([]);

      await testModel.findOne({
        email: "'; DROP TABLE users; --",
      });

      expect(mockQueryFn).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining(["'; DROP TABLE users; --"]),
      );
    });

    it('should handle very large result sets', async () => {
      const largeArray = new Array(10000).fill(null).map((_, i) => ({
        id: `uuid-${i}`,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        created: new Date(),
        modified: new Date(),
      }));

      mockQueryFn.mockResolvedValueOnce(largeArray);

      const result = await testModel.findAll();

      expect(result).toHaveLength(10000);
    });

    it('should handle null values in update', async () => {
      const updatedRecord: TestModelAttributes = {
        id: 'uuid-123',
        name: 'Test User',
        email: 'test@example.com',
        created: new Date('2024-01-01'),
        modified: new Date('2024-01-15'),
      };

      mockQueryFn.mockResolvedValueOnce([{ affectedRows: 1 }]);
      mockQueryFn.mockResolvedValueOnce([updatedRecord]);

      await testModel.update('uuid-123', {
        name: null as string,
      });

      expect(mockQueryFn).toHaveBeenCalledWith(
        'UPDATE test_table SET name = ? WHERE id = ?',
        [null, 'uuid-123'],
      );
    });
  });
});
