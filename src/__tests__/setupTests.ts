import '@testing-library/jest-dom';

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(() => ({ userId: '1' }))
}));

// Mock zustand stores
jest.mock('@/store/userStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/store/postStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/api', () => ({
  useUserPostsQuery: jest.fn(),
  useUsersQuery: jest.fn(),
  useUserQuery: jest.fn(),
}));

jest.mock('@/lib/constant', () => ({
  environmentVar: {
    BASE_URL: 'https://mocked-api-url.com',
  }
}))

Object.defineProperty(global, 'importMeta', {
    writable: true,
    value: {
      env: {
        VITE_API_BASE_URL: 'https://mocked-api-url.com',
      },
    },
  });