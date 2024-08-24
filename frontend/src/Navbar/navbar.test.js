import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './navbar';

test('displays "Log in / Sign up" button when user is not logged in', () => {
  render(
    <MemoryRouter>
      <Navbar isLoggedIn={false} setIsLoggedIn={jest.fn()} />
    </MemoryRouter>
  );
  const loginButton = screen.getByText(/Log in \/ Sign up/i);
  expect(loginButton).toBeInTheDocument();
});
