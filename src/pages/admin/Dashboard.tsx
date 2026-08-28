import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAdminStore } from '../../store/useAdminStore';

const data = [
  { name: 'Lun', ventes: 4000 },
  { name: 'Mar', ventes: 3000 },
  { name: 'Mer', ventes: 2000 },
  { name: 'Jeu', ventes: 2780 },
  { name: 'Ven', ventes: 1890 },
  { name: 'Sam', ventes: 2390 },
  { name: 'Dim', ventes: 3490 },
];

export const AdminDashboard: React.FC = () => {
  const { orders, customers, products } = useAdminStore();

  const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);

  const stats = [
    { 
      title: "Chiffre d'affaires", 
      value: `${totalRevenue.toLocaleString('fr-FR')} FCFA`, 
      change: "+12.5%", 
      isPositive: true,
      icon: <DollarSign size={20} className="text-white" />,
      color: "bg-gold"
    },
    { 
      title: "Commandes", 
      value: orders.length.toString(), 
      change: "+5.2%", 
      isPositive: true,
      icon: <ShoppingBag size={20} className="text-white" />,
      color: "bg-primary"
    },
    { 
      title: "Clients", 
      value: customers.length.toString(), 
      change: "-1.2%", 
      isPositive: false,
      icon: <Users size={20} className="text-white" />,
      color: "bg-gray-800"
    },
    { 
      title: "Produits Actifs", 
      value: products.length.toString(), 
      change: "+2.4%", 
      isPositive: true,
      icon: <TrendingUp size={20} className="text-white" />,
      color: "bg-gray-600"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-gray-800">Vue d'ensemble</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-md shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-md flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center text-sm ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
        <h2 className="text-lg font-serif text-gray-800 mb-6">Évolution des ventes (7 derniers jours)</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#f3f4f6', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="ventes" 
                stroke="#C6A87C" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#C6A87C', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, fill: '#1f2937', stroke: '#C6A87C' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
