import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './page';

describe('Home page', () => {
  it('renders', () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
