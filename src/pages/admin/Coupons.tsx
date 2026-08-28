import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import type { Coupon } from '../../store/useAdminStore';
import { Modal } from '../../components/admin/Modal';

export const AdminCoupons: React.FC = () => {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useAdminStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Coupon>>({
    code: '',
    type: 'Pourcentage',
    value: '',
    limit: 0,
    used: 0,
    status: 'Actif'
  });

  const handleOpenModal = (coupon?: Coupon) => {
    if (coupon) {
      setEditingId(coupon.id);
      setFormData({ 
        code: coupon.code, 
        type: coupon.type, 
        value: coupon.value,
        limit: coupon.limit,
        used: coupon.used,
        status: coupon.status 
      });
    } else {
      setEditingId(null);
      setFormData({ code: '', type: 'Pourcentage', value: '', limit: 100, used: 0, status: 'Actif' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCoupon(editingId, formData);
    } else {
      addCoupon(formData as Omit<Coupon, 'id'>);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">Coupons de réduction</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary hover:bg-black text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={18} />
          <span>Nouveau Coupon</span>
        </button>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
            <tr>
              <th className="py-3 px-6 font-medium">Code Promo</th>
              <th className="py-3 px-6 font-medium">Type</th>
              <th className="py-3 px-6 font-medium">Valeur</th>
              <th className="py-3 px-6 font-medium">Utilisations</th>
              <th className="py-3 px-6 font-medium">Statut</th>
              <th className="py-3 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">Aucun coupon trouvé.</td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-800">{coupon.code}</td>
                  <td className="py-4 px-6 text-gray-600">{coupon.type}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{coupon.value}</td>
                  <td className="py-4 px-6 text-gray-600">{coupon.used} / {coupon.limit}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${coupon.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => handleOpenModal(coupon)} className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => deleteCoupon(coupon.id)} className="text-gray-400 hover:text-red-600 transition-colors">
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
        title={editingId ? "Modifier le coupon" : "Nouveau coupon"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Code</label>
            <input 
              required
              type="text" 
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Type de réduction</label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value as any})}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            >
              <option value="Pourcentage">Pourcentage</option>
              <option value="Montant fixe">Montant fixe</option>
              <option value="Frais de port">Frais de port offerts</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Valeur (ex: 10% ou 2000 FCFA)</label>
            <input 
              required
              type="text" 
              value={formData.value}
              onChange={(e) => setFormData({...formData, value: e.target.value})}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Limite d'utilisation</label>
            <input 
              required
              type="number"
              min="1"
              value={formData.limit}
              onChange={(e) => setFormData({...formData, limit: parseInt(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Statut</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as 'Actif' | 'Expiré'})}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            >
              <option value="Actif">Actif</option>
              <option value="Expiré">Expiré</option>
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
