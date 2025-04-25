import React, { useState, useEffect } from 'react';
import { addItem, getAllItems, updateItem, deleteItem } from '@/modules/core/db/dbOperations';
import { STORES } from '@/modules/core/db/dbConfig';
import { getToday } from '@/modules/core/utils/dateUtils';
import { kgToEggs, cratesToEggs } from '@/modules/core/utils/conversions';
import DistributionForm from './DistributionForm';
import DistributionList from './DistributionList';
import * as Sentry from '@sentry/browser';

export default function Distribution() {
  const [distributionData, setDistributionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Load distribution data
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAllItems(STORES.DISTRIBUTION);
      // Sort by date descending (newest first)
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDistributionData(sortedData);
    } catch (err) {
      console.error('Error loading distribution data:', err);
      setError('Gagal memuat data distribusi. Silakan coba lagi.');
      Sentry.captureException(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle adding new distribution entry
  const handleAddDistribution = async (formData) => {
    try {
      setLoading(true);
      
      // Ensure at least one of kg or crates is provided
      if ((formData.kg === 0 || formData.kg === '') && (formData.crates === 0 || formData.crates === '')) {
        setError('Masukkan setidaknya satu nilai kg atau peti.');
        setLoading(false);
        return;
      }
      
      const newDistribution = {
        ...formData,
        kg: formData.kg === '' ? 0 : parseFloat(formData.kg),
        crates: formData.crates === '' ? 0 : parseFloat(formData.crates),
        date: formData.date.toISOString(), // Store date as ISO string
      };
      
      await addItem(STORES.DISTRIBUTION, newDistribution);
      setError(null);
      await loadData(); // Reload data to show the new entry
    } catch (err) {
      console.error('Error adding distribution:', err);
      setError('Gagal menambahkan data distribusi.');
      Sentry.captureException(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle editing a distribution entry
  const handleEditDistribution = async (formData) => {
    if (!editingItem) return;
    
    try {
      setLoading(true);
      
      // Ensure at least one of kg or crates is provided
      if ((formData.kg === 0 || formData.kg === '') && (formData.crates === 0 || formData.crates === '')) {
        setError('Masukkan setidaknya satu nilai kg atau peti.');
        setLoading(false);
        return;
      }
      
      const updatedItem = {
        ...editingItem,
        ...formData,
        kg: formData.kg === '' ? 0 : parseFloat(formData.kg),
        crates: formData.crates === '' ? 0 : parseFloat(formData.crates),
        date: formData.date.toISOString(),
      };
      
      await updateItem(STORES.DISTRIBUTION, updatedItem);
      setEditingItem(null);
      setError(null);
      await loadData();
    } catch (err) {
      console.error('Error updating distribution:', err);
      setError('Gagal memperbarui data distribusi.');
      Sentry.captureException(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a distribution entry
  const handleDeleteDistribution = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data distribusi ini?')) {
      return;
    }
    
    try {
      setLoading(true);
      await deleteItem(STORES.DISTRIBUTION, id);
      await loadData();
    } catch (err) {
      console.error('Error deleting distribution:', err);
      setError('Gagal menghapus data distribusi.');
      Sentry.captureException(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Distribusi Telur</h2>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DistributionForm 
            onSubmit={editingItem ? handleEditDistribution : handleAddDistribution} 
            initialData={editingItem ? {
              ...editingItem,
              date: new Date(editingItem.date)
            } : { 
              kg: '', 
              crates: '', 
              date: getToday(), 
              notes: '',
              destination: '' 
            }}
            isEditing={!!editingItem}
            onCancel={() => setEditingItem(null)}
          />
        </div>
        
        <div className="lg:col-span-2">
          <DistributionList 
            data={distributionData}
            loading={loading}
            onEdit={setEditingItem}
            onDelete={handleDeleteDistribution}
          />
        </div>
      </div>
    </div>
  );
}