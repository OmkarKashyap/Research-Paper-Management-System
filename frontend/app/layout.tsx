import './styles/global.css';
import NavBar from './components/Navbar';
import Header from './components/Header';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}