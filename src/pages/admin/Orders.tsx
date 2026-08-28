import React, { useState } from 'react';
import { Eye, Edit2, Download } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import type { Order } from '../../store/useAdminStore';
import { Modal } from '../../components/admin/Modal';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrder, deleteOrder } = useAdminStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Order>>({
    status: 'En attente',
    color: 'bg-blue-100 text-blue-700'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente': return 'bg-blue-100 text-blue-700';
      case 'Confirmée': return 'bg-green-100 text-green-700';
      case 'Livrée': return 'bg-purple-100 text-purple-700';
      case 'Annulée': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleOpenModal = (order: Order) => {
    setEditingId(order.id);
    setFormData({ status: order.status, color: order.color });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateOrder(editingId, { ...formData, color: getStatusColor(formData.status!) });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">Commandes</h1>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
            <tr>
              <th className="py-3 px-6 font-medium">Commande</th>
              <th className="py-3 px-6 font-medium">Client</th>
              <th className="py-3 px-6 font-medium">Date</th>
              <th className="py-3 px-6 font-medium">Total</th>
              <th className="py-3 px-6 font-medium">Statut</th>
              <th className="py-3 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">Aucune commande trouvée.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-800">{order.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-medium">{order.client}</span>
                      <span className="text-xs text-gray-500">{order.items} article(s)</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{order.date}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{order.amount.toLocaleString('fr-FR')} FCFA</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${order.color}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => handleOpenModal(order)} className="text-gray-400 hover:text-blue-600 transition-colors" title="Modifier le statut">
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Modifier la commande"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Statut de la commande</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({ status: e.target.value })}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            >
              <option value="En attente">En attente</option>
              <option value="Confirmée">Confirmée</option>
              <option value="Livrée">Livrée</option>
              <option value="Annulée">Annulée</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-black transition-colors"
            >
              Mettre à jour
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
