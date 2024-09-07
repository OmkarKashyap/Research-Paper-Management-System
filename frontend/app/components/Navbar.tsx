import Link from 'next/link';
import '../styles/navbar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">Research</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
}