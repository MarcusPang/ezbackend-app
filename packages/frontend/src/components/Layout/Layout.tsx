import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-screen-xl">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
