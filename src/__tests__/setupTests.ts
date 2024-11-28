import '@testing-library/jest-dom';

Object.defineProperty(global, 'importMeta', {
    writable: true,
    value: {
      env: {
        VITE_API_BASE_URL: 'https://mocked-api-url.com',
      },
    },
  });