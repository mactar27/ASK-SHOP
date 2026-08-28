import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import type { Category } from '../../store/useAdminStore';
import { Modal } from '../../components/admin/Modal';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdminStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    count: 0,
    status: 'Actif'
  });

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingId(category.id);
      setFormData({ name: category.name, count: category.count, status: category.status });
    } else {
      setEditingId(null);
      setFormData({ name: '', count: 0, status: 'Actif' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCategory(editingId, formData);
    } else {
      addCategory(formData as Omit<Category, 'id'>);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">Catégories</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary hover:bg-black text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={18} />
          <span>Nouvelle Catégorie</span>
        </button>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
            <tr>
              <th className="py-3 px-6 font-medium">Nom de la catégorie</th>
              <th className="py-3 px-6 font-medium">Produits liés</th>
              <th className="py-3 px-6 font-medium">Statut</th>
              <th className="py-3 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">Aucune catégorie trouvée.</td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-800">{category.name}</td>
                  <td className="py-4 px-6 text-gray-600">{category.count} produits</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${category.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => handleOpenModal(category)} className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => deleteCategory(category.id)} className="text-gray-400 hover:text-red-600 transition-colors">
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
        title={editingId ? "Modifier la catégorie" : "Nouvelle catégorie"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Nom de la catégorie</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Produits liés (estimation)</label>
            <input 
              required
              type="number"
              min="0"
              value={formData.count}
              onChange={(e) => setFormData({...formData, count: parseInt(e.target.value) || 0})}
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
