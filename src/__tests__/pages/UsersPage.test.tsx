import { useNavigate } from 'react-router';

import { useUsersQuery } from '@/api';
import useUserStore from '@/store/userStore';
import { UsersPage } from '@/pages/UsersPage';
import { fireEvent, render, screen } from '@testing-library/react';

const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockImplementation(() => mockNavigate);

const mockUserStore = {
  setSelectedUser: jest.fn(),
  currentPage: 1,
  setCurrentPage: jest.fn(),
};


// Mock data
const mockUsers = [
  {
    id: 1,
    user_id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    street: '123 Main St',
    state: 'CA',
    city: 'Los Angeles',
    zipcode: '90001',
  },
  {
    id: 2,
    user_id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    street: '456 Oak Ave',
    state: 'NY',
    city: 'New York',
    zipcode: '10001',
  },
];

const userQueryResonse = (pages = 1) => ({
  users: mockUsers,
  pagination: { pages },
})

const mockedUseUserStore = useUserStore as unknown as jest.Mock
const mockUseUsersQuery = useUsersQuery as unknown as jest.Mock;

mockedUseUserStore.mockImplementation(() => mockUserStore);
mockUseUsersQuery.mockImplementation(() => ({ data: userQueryResonse(), isLoadng: false, error: null }));

describe('UsersPage Component', () => {

  const renderComponent = () =>
    render(<UsersPage />);

  it('renders users table with correct data', () => {
    renderComponent();

    // Check if table headers are present
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();

    // Check if user data is displayed
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(
        screen.getByText(`${user.street}, ${user.state}, ${user.city}, ${user.zipcode}`)
      ).toBeInTheDocument();
    });
  });

  it('navigates to user posts page and sets selected user when row is clicked', () => {
    renderComponent();

    const firstUserRow = screen.getByText('John Doe').closest('tr');
    fireEvent.click(firstUserRow!);

    expect(mockUserStore.setSelectedUser).toHaveBeenCalledWith(mockUsers[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/users/1/posts');
  });

  it('handles `go next` pagination correctly', async () => {
    mockUseUsersQuery.mockImplementationOnce(() => ({ data: userQueryResonse(2) } ))

    renderComponent();

    const previousNextButton = screen.getByLabelText('Go to next page');
    fireEvent.click(previousNextButton);
    

    expect(mockUserStore.setCurrentPage).toHaveBeenCalledWith(2);
  });

  it('handles `go previous` pagination correctly', async () => {
    mockUseUsersQuery.mockImplementationOnce(() => ({ data: userQueryResonse(2) } ))
    mockedUseUserStore.mockImplementation(() => ({ ...mockUserStore, currentPage: 2 }) );

    renderComponent();

    const previousPageButton = screen.getByLabelText('Go to previous page');
    fireEvent.click(previousPageButton);
    
    expect(mockUserStore.setCurrentPage).toHaveBeenCalledWith(1);
  });

  // Test loading state
  it('shows loading state', () => {
    mockUseUsersQuery.mockImplementationOnce(() => ({ isLoading: true } ))
    renderComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Test error state
  it('shows error state', () => {
    mockUseUsersQuery.mockImplementationOnce(() => ({ error: { message: 'Failed to fetch users' } } ))
    renderComponent();

    expect(screen.getByText(/Failed to fetch users/)).toBeInTheDocument();
  });
});