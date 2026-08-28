import React from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';

export const AdminCustomers: React.FC = () => {
  const { customers } = useAdminStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">Clients</h1>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
            <tr>
              <th className="py-3 px-6 font-medium">Client</th>
              <th className="py-3 px-6 font-medium">Contact</th>
              <th className="py-3 px-6 font-medium">Commandes</th>
              <th className="py-3 px-6 font-medium">Total dépensé</th>
              <th className="py-3 px-6 font-medium">Dernière commande</th>
              <th className="py-3 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">Aucun client trouvé.</td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{customer.name}</span>
                      <span className="text-xs text-gray-500 text-xs">ID: {customer.id}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail size={14} className="mr-2 text-gray-400" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone size={14} className="mr-2 text-gray-400" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{customer.orders}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{customer.totalSpent.toLocaleString('fr-FR')} FCFA</td>
                  <td className="py-4 px-6 text-gray-600">{customer.lastOrder}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-gray-400 hover:text-primary transition-colors inline-flex items-center gap-1 text-sm">
                      <ExternalLink size={16} />
                      <span className="hidden md:inline">Détails</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
