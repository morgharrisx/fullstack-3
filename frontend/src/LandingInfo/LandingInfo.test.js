import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingInfo from './LandingInfo';

test('renders "Discover Your Music DNA" text', () => {
  render(
    <MemoryRouter>
      <LandingInfo />
    </MemoryRouter>
  );
  const textElement = screen.getByText(/Discover Your Music DNA/i);
  expect(textElement).toBeInTheDocument();
});
