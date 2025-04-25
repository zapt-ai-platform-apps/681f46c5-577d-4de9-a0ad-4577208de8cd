import React, { useState, useEffect } from 'react';
import { addItem, getAllItems, updateItem, deleteItem } from '@/modules/core/db/dbOperations';
import { STORES } from '@/modules/core/db/dbConfig';
import { getToday, formatDateDisplay } from '@/modules/core/utils/dateUtils';
import { eggsToKg, eggsToCrates, formatNumber } from '@/modules/core/utils/conversions';
import ProductionForm from './ProductionForm';
import ProductionList from './ProductionList';
import * as Sentry from '@sentry/browser';

export default function Production() {
  const [productionData, setProductionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Load production data
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAllItems(STORES.PRODUCTION);
      // Sort by date descending (newest first)
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setProductionData(sortedData);
    } catch (err) {
      console.error('Error loading production data:', err);
      setError('Gagal memuat data produksi. Silakan coba lagi.');
      Sentry.captureException(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle adding new production entry
  const handleAddProduction = async (formData) => {
    try {
      setLoading(true);
      const newProduction = {
        ...formData,
        date: formData.date.toISOString(), // Store date as ISO string
      };
      
      await addItem(STORES.PRODUCTION, newProduction);
      await loadData(); // Reload data to show the new entry
    } catch (err) {
      console.error('Error adding production:', err);
      setError('Gagal menambahkan data produksi.');
      Sentry.captureException(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle editing a production entry
  const handleEditProduction = async (formData) => {
    if (!editingItem) return;
    
    try {
      setLoading(true);
      const updatedItem = {
        ...editingItem,
        ...formData,
        date: formData.date.toISOString(),
      };
      
      await updateItem(STORES.PRODUCTION, updatedItem);
      setEditingItem(null);
      await loadData();
    } catch (err) {
      console.error('Error updating production:', err);
      setError('Gagal memperbarui data produksi.');
      Sentry.captureException(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a production entry
  const handleDeleteProduction = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data produksi ini?')) {
      return;
    }
    
    try {
      setLoading(true);
      await deleteItem(STORES.PRODUCTION, id);
      await loadData();
    } catch (err) {
      console.error('Error deleting production:', err);
      setError('Gagal menghapus data produksi.');
      Sentry.captureException(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Produksi Telur</h2>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProductionForm 
            onSubmit={editingItem ? handleEditProduction : handleAddProduction} 
            initialData={editingItem ? {
              ...editingItem,
              date: new Date(editingItem.date)
            } : { 
              eggs: '', 
              date: getToday(), 
              notes: '' 
            }}
            isEditing={!!editingItem}
            onCancel={() => setEditingItem(null)}
          />
        </div>
        
        <div className="lg:col-span-2">
          <ProductionList 
            data={productionData}
            loading={loading}
            onEdit={setEditingItem}
            onDelete={handleDeleteProduction}
          />
        </div>
      </div>
    </div>
  );
}