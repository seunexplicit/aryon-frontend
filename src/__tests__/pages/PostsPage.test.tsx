import { useNavigate } from 'react-router';

import { useUserPostsQuery } from '@/api';
import useUserStore from '@/store/userStore';
import usePostStore from '@/store/postStore';
import { PostsPage } from '@/pages/PostsPage';
import { fireEvent, render, screen } from '@testing-library/react';

const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockImplementation(() => mockNavigate);

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
};

const mockPosts = [
  {
    id: '1',
    title: 'Post 1',
    body: 'Content 1',
  },
  {
    id: '2',
    title: 'Post 2',
    body: 'Content 2',
  },
];

const mockUserStore = {
  user: mockUser,
};

const mockPostStore = {
  posts: mockPosts,
  removeDeletedPost: jest.fn(),
};

const mockedUseUserStore = useUserStore as unknown as jest.Mock
const mockedUsePostStore = usePostStore as unknown as jest.Mock
const mockUseUserPostsQuery = useUserPostsQuery as unknown as jest.Mock;

mockedUseUserStore.mockImplementation(() => mockUserStore);
mockedUsePostStore.mockImplementation(() => mockPostStore);
mockUseUserPostsQuery.mockImplementation(() => ({ isLoading: false }))

describe('PostsPage Component', () => {
  const renderComponent = () => render(<PostsPage />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user information and post count', () => {
    renderComponent();

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockUser.email))).toBeInTheDocument();
    expect(screen.getByText(/2 Posts/)).toBeInTheDocument();
  });

  it('renders all posts with correct information', () => {
    renderComponent();

    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
    });
  });

  it('navigates back when clicking back button', () => {
    renderComponent();

    const backButton = screen.getByText('Back to Users');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('calls removeDeletedPost when delete button is clicked', () => {
    renderComponent();

    // Find and click first post's delete button
    const deleteButtons = screen.getAllByRole('button');
    fireEvent.click(deleteButtons[1]); // First button is back button

    expect(mockPostStore.removeDeletedPost).toHaveBeenCalledWith('1');
  });

  it('shows correct post count with singular form', () => {
    mockedUsePostStore.mockImplementation(() => ({
      ...mockPostStore,
      posts: [mockPosts[0]], // Only one post
    }));

    renderComponent();

    expect(screen.getByText(/1 Post/)).toBeInTheDocument();
  });

  // Test loading state
  it('shows loading state', () => {
    mockUseUserPostsQuery.mockImplementationOnce(() => ({
      isLoading: true,
      error: null,
    }))

    renderComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Test error state
  it('shows error state', () => {
    mockUseUserPostsQuery.mockImplementationOnce(() => ({
      isLoading: false,
      error: { message: 'Failed to fetch posts' },
    }))

    renderComponent();

    expect(screen.getByText(/Failed to fetch posts/)).toBeInTheDocument();
  });
});