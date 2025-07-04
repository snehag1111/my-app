import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from './Dialog'; 
import '@testing-library/jest-dom'; 

const mockOnClose = jest.fn();

describe('Dialog component', () => {
  it('should render the Dialog with the correct title and children', () => {
    render(
      <Dialog title="Test Dialog" onClose={mockOnClose}>
        <p>This is the content of the dialog</p>
      </Dialog>
    );

    expect(screen.getByText('Test Dialog')).toBeInTheDocument();

    expect(screen.getByText('This is the content of the dialog')).toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', () => {
    render(
      <Dialog title="Test Dialog" onClose={mockOnClose}>
        <p>This is the content of the dialog</p>
      </Dialog>
    );

    fireEvent.click(screen.getByLabelText('Close Dialog'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render the dialog in the body using createPortal', () => {
    const { container } = render(
      <Dialog title="Test Dialog" onClose={mockOnClose}>
        <p>This is the content of the dialog</p>
      </Dialog>
    );

    expect(container).toBeInTheDocument();
    expect(document.body.contains(container.firstChild)).toBe(true);
  });

  it('should apply the correct styles to the dialog', () => {
    render(
      <Dialog title="Test Dialog" onClose={mockOnClose}>
        <p>This is the content of the dialog</p>
      </Dialog>
    );

    const dialog = screen.getByText('Test Dialog').closest('div');
    expect(dialog).toHaveStyle('position: fixed');
    expect(dialog).toHaveStyle('top: 0');
    expect(dialog).toHaveStyle('background-color: rgba(0, 0, 0, 0.5)');
  });

  it('should disable body scroll when dialog is open', () => {
    render(
      <Dialog title="Test Dialog" onClose={mockOnClose}>
        <p>This is the content of the dialog</p>
      </Dialog>
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should re-enable body scroll when dialog is closed', () => {
    const { unmount } = render(
      <Dialog title="Test Dialog" onClose={mockOnClose}>
        <p>This is the content of the dialog</p>
      </Dialog>
    );

    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
