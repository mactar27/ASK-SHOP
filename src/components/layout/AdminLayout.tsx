import React, { useEffect } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { useAdminStore } from '../../store/useAdminStore';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingCart, 
  Users, 
  Ticket, 
  Truck, 
  Settings, 
  LogOut 
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const fetchData = useAdminStore((state) => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const menuItems = [
    { name: 'Tableau de bord', icon: <LayoutDashboard size={18} />, path: '/admin' },
    { name: 'Produits', icon: <Package size={18} />, path: '/admin/products' },
    { name: 'Catégories', icon: <Tags size={18} />, path: '/admin/categories' },
    { name: 'Commandes', icon: <ShoppingCart size={18} />, path: '/admin/orders' },
    { name: 'Clients', icon: <Users size={18} />, path: '/admin/customers' },
    { name: 'Coupons', icon: <Ticket size={18} />, path: '/admin/coupons' },
    { name: 'Livraison', icon: <Truck size={18} />, path: '/admin/shipping' },
    { name: 'Paramètres', icon: <Settings size={18} />, path: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] text-gray-300 flex flex-col flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-800">
          <Link to="/" className="flex flex-col items-center justify-center text-white leading-none">
            <span className="text-xl font-bold tracking-[0.2em] mb-0.5">A•S-K</span>
            <span className="text-3xl text-gold" style={{ fontFamily: '"Great Vibes", cursive', lineHeight: '0.7' }}>Shop</span>
            <span className="text-sm font-semibold tracking-[0.2em] mt-1.5">S•N</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  end={item.path === '/admin'}
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors ${
                      isActive 
                        ? 'bg-gray-800 text-white font-medium border-l-4 border-gold' 
                        : 'hover:bg-gray-800/50 hover:text-white border-l-4 border-transparent'
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors w-full">
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
