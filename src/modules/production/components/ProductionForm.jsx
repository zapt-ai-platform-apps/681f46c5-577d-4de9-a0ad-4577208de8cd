import React, { useState, useEffect } from 'react';
import DatePicker from '@/modules/core/components/DatePicker';
import { eggsToKg, eggsToCrates, formatNumber } from '@/modules/core/utils/conversions';

export default function ProductionForm({ onSubmit, initialData, isEditing, onCancel }) {
  const [formData, setFormData] = useState(initialData);
  const [conversionPreview, setConversionPreview] = useState({
    kg: 0,
    crates: 0
  });

  // Update form when initialData changes (e.g., when editing)
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Update conversion preview when egg count changes
  useEffect(() => {
    if (formData.eggs) {
      const eggs = parseInt(formData.eggs);
      if (!isNaN(eggs)) {
        setConversionPreview({
          kg: eggsToKg(eggs),
          crates: eggsToCrates(eggs)
        });
      }
    } else {
      setConversionPreview({ kg: 0, crates: 0 });
    }
  }, [formData.eggs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form
    if (!formData.eggs || isNaN(parseInt(formData.eggs)) || parseInt(formData.eggs) <= 0) {
      alert('Jumlah telur harus berupa angka positif.');
      return;
    }
    
    if (!formData.date) {
      alert('Tanggal harus diisi.');
      return;
    }
    
    // Convert eggs to number before submitting
    const submissionData = {
      ...formData,
      eggs: parseInt(formData.eggs)
    };
    
    onSubmit(submissionData);
    
    // Clear form if not editing
    if (!isEditing) {
      setFormData({ ...initialData, eggs: '' });
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">
        {isEditing ? 'Edit Produksi' : 'Tambah Produksi'}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="eggs" className="form-label">Jumlah Telur (butir)</label>
          <input
            type="number"
            id="eggs"
            name="eggs"
            value={formData.eggs}
            onChange={handleChange}
            className="form-input"
            placeholder="Masukkan jumlah telur"
            min="1"
            required
          />
        </div>
        
        <DatePicker
          label="Tanggal Produksi"
          selected={formData.date}
          onChange={handleDateChange}
        />
        
        <div className="form-group">
          <label htmlFor="notes" className="form-label">Catatan (opsional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes || ''}
            onChange={handleChange}
            className="form-input"
            placeholder="Tambahkan catatan jika diperlukan"
            rows="2"
          />
        </div>
        
        {formData.eggs && !isNaN(parseInt(formData.eggs)) && parseInt(formData.eggs) > 0 && (
          <div className="bg-blue-50 p-3 rounded-md mb-4">
            <p className="text-sm font-medium text-blue-800">Konversi:</p>
            <p className="text-sm text-blue-700">
              {formatNumber(parseInt(formData.eggs))} butir = {formatNumber(conversionPreview.kg.toFixed(2))} kg = {formatNumber(conversionPreview.crates.toFixed(2))} peti
            </p>
          </div>
        )}
        
        <div className="flex space-x-2">
          <button type="submit" className="btn-primary flex-grow">
            {isEditing ? 'Simpan Perubahan' : 'Tambah Produksi'}
          </button>
          
          {isEditing && (
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onCancel}
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}