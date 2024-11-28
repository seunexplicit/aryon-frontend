import '@testing-library/jest-dom';
import { server } from './mocks/server';

Object.defineProperty(global, 'importMeta', {
    writable: true,
    value: {
      env: {
        VITE_API_BASE_URL: 'https://mocked-api-url.com',
      },
    },
  });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());