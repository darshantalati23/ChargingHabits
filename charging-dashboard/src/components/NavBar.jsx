import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const links = [
  { to: '/', label: 'Overview' },
  { to: '/devices', label: 'Device Analysis' },
  { to: '/stats', label: 'Statistical Findings' },
  { to: '/deep', label: 'Deep Dive' },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <span className="navbar-title">SmartCharge</span>

        <div className="navbar-links">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              {label}
            </NavLink>
          ))}
        </div>

        <NavLink to="/about" className="about-btn">
          Our Journey
        </NavLink>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? 'bar bar-top open' : 'bar bar-top'} />
          <span className={menuOpen ? 'bar bar-mid open' : 'bar bar-mid'} />
          <span className={menuOpen ? 'bar bar-bot open' : 'bar bar-bot'} />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
