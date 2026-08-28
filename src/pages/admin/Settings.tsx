import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import type { Settings } from '../../store/useAdminStore';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useAdminStore();
  const [formData, setFormData] = useState<Partial<Settings>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings(formData);
    setIsSaving(false);
    alert('Paramètres enregistrés avec succès !');
  };

  if (!settings) return <div>Chargement...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">Paramètres de la boutique</h1>
        <button 
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-primary hover:bg-black text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          <span>{isSaving ? "Enregistrement..." : "Enregistrer"}</span>
        </button>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-8 space-y-8">
        
        {/* General Info */}
        <section>
          <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-100 pb-2">Informations Générales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nom de la boutique</label>
              <input 
                type="text" 
                value={formData.shopName || ''} 
                onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Slogan</label>
              <input 
                type="text" 
                value={formData.slogan || ''} 
                onChange={(e) => setFormData({...formData, slogan: e.target.value})}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
              />
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-100 pb-2">Coordonnées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email de contact</label>
              <input 
                type="email" 
                value={formData.email || ''} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Numéro de téléphone / WhatsApp</label>
              <input 
                type="text" 
                value={formData.phone || ''} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Adresse physique</label>
              <textarea 
                rows={2} 
                value={formData.address || ''} 
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section>
          <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-100 pb-2">Réseaux Sociaux</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Lien Instagram</label>
              <input 
                type="text" 
                value={formData.instagram || ''} 
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Lien TikTok</label>
              <input 
                type="text" 
                value={formData.tiktok || ''} 
                onChange={(e) => setFormData({...formData, tiktok: e.target.value})}
                placeholder="https://tiktok.com/@..." 
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
              />
            </div>
          </div>
        </section>

      </div>
    </form>
  );
};
