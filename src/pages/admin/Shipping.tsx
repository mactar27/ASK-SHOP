import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import type { ShippingZone } from '../../store/useAdminStore';
import { Modal } from '../../components/admin/Modal';

export const AdminShipping: React.FC = () => {
  const { shippingZones, addShippingZone, updateShippingZone, deleteShippingZone } = useAdminStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<ShippingZone>>({
    zone: '',
    price: 0,
    estimatedTime: '',
    status: 'Actif'
  });

  const handleOpenModal = (zone?: ShippingZone) => {
    if (zone) {
      setEditingId(zone.id);
      setFormData({ 
        zone: zone.zone, 
        price: zone.price, 
        estimatedTime: zone.estimatedTime,
        status: zone.status 
      });
    } else {
      setEditingId(null);
      setFormData({ zone: '', price: 2000, estimatedTime: '24h - 48h', status: 'Actif' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateShippingZone(editingId, formData);
    } else {
      addShippingZone(formData as Omit<ShippingZone, 'id'>);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">Zones de Livraison</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary hover:bg-black text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={18} />
          <span>Nouvelle Zone</span>
        </button>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
            <tr>
              <th className="py-3 px-6 font-medium">Zone</th>
              <th className="py-3 px-6 font-medium">Frais de livraison</th>
              <th className="py-3 px-6 font-medium">Délai estimé</th>
              <th className="py-3 px-6 font-medium">Statut</th>
              <th className="py-3 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shippingZones.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">Aucune zone de livraison trouvée.</td>
              </tr>
            ) : (
              shippingZones.map((zone) => (
                <tr key={zone.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-800">{zone.zone}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{zone.price.toLocaleString('fr-FR')} FCFA</td>
                  <td className="py-4 px-6 text-gray-600">{zone.estimatedTime}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${zone.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {zone.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => handleOpenModal(zone)} className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => deleteShippingZone(zone.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
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
        title={editingId ? "Modifier la zone" : "Nouvelle zone de livraison"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Nom de la zone (ex: Dakar)</label>
            <input 
              required
              type="text" 
              value={formData.zone}
              onChange={(e) => setFormData({...formData, zone: e.target.value})}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Frais de livraison (FCFA)</label>
            <input 
              required
              type="number"
              min="0"
              step="500"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Délai estimé (ex: 24h - 48h)</label>
            <input 
              required
              type="text" 
              value={formData.estimatedTime}
              onChange={(e) => setFormData({...formData, estimatedTime: e.target.value})}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Statut</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as 'Actif' | 'Inactif'})}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            >
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
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
              {editingId ? "Mettre à jour" : "Créer"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
