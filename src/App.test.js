import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login form', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /login/i });
  expect(heading).toBeInTheDocument();
});

test('does not render dashboard link before login', () => {
  render(<App />);
  const linkElement = screen.queryByText(/Dashboard/i);
  expect(linkElement).not.toBeInTheDocument();
});