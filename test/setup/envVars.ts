/**
 * Jest setup file for environment variables
 * This file is loaded before each test suite
 */

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.NOVA_API_DB_HOST = 'localhost';
process.env.NOVA_API_DB_USER = 'test_user';
process.env.NOVA_API_DB_PASSWORD = 'test_password';
process.env.NOVA_API_DB_NAME = 'test_db';
process.env.NOVA_API_PORT = '3001';
