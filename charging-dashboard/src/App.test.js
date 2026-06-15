import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => {
  const React = require('react');
  return {
    BrowserRouter: ({ children }) => React.createElement(React.Fragment, null, children),
    Routes: ({ children }) => React.createElement(React.Fragment, null, children),
    Route: ({ element }) => element,
    NavLink: ({ children, to, className }) => React.createElement(
      'a',
      {
        href: to,
        className: typeof className === 'function' ? className({ isActive: to === '/' }) : className,
      },
      children
    ),
  };
}, { virtual: true });

jest.mock('./utils/useData', () => () => ({
  data: null,
  loading: true,
  error: null,
}));

test('renders the dashboard navigation', () => {
  render(<App />);
  expect(screen.getByText('Smartphone Charging Data Analysis')).toBeInTheDocument();
  expect(screen.getAllByText('Overview').length).toBeGreaterThan(0);
});
