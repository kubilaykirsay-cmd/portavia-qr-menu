import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileCTA from '../components/MobileCTA';
import CartDrawer from '../components/CartDrawer';
import WaiterCallButton from '../components/WaiterCallButton';

const MainLayout = () => {
  return (
    <div className="font-body text-porta-dark bg-porta-cream min-h-screen selection:bg-porta-red/20 selection:text-porta-red overflow-x-hidden">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileCTA />
      <CartDrawer />
      <WaiterCallButton />
    </div>
  );
};

export default MainLayout;
