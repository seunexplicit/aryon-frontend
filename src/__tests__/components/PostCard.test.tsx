import { render, screen, fireEvent } from '@testing-library/react';
import { PostCard } from '../../components/elements/PostCard';

describe('PostCard Component', () => {
  const mockProps = {
    title: 'Test Title',
    content: 'Test Content',
    id: '1',
    onDeleteClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the post card with title and content', () => {
    render(<PostCard {...mockProps} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('calls onDeleteClick with correct id when delete button is clicked', () => {
    render(<PostCard {...mockProps} />);
    
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);
    
    expect(mockProps.onDeleteClick).toHaveBeenCalledWith('1');
    expect(mockProps.onDeleteClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct classes for styling', () => {
     const { container } = render(<PostCard {...mockProps} />);
    
    const card = container.querySelector('.bg-card');
    expect(card).toHaveClass('h-[293px]', 'mb-7', 'drop-shadow', 'overflow-y-clip');
    
    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('tracking-tight', 'flex-1', 'text-lg', 'font-medium');
  });

  it('truncates long content with line-clamp', () => {
    const longContent = 'This is a very long content that should be truncated. '.repeat(20);
    render(<PostCard {...mockProps} content={longContent} />);
    
    const content = screen.getByText(/This is a very long content/);
    expect(content).toHaveClass('line-clamp-[7]');
  });
});