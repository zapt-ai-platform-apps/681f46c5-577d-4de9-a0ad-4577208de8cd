import React, { useState, useEffect } from 'react';
import DatePicker from '@/modules/core/components/DatePicker';
import { kgToEggs, cratesToEggs, formatNumber } from '@/modules/core/utils/conversions';

export default function DistributionForm({ onSubmit, initialData, isEditing, onCancel }) {
  const [formData, setFormData] = useState(initialData);
  const [eggPreview, setEggPreview] = useState({
    fromKg: 0,
    fromCrates: 0,
    total: 0
  });

  // Update form when initialData changes (e.g., when editing)
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Update egg preview when kg or crates change
  useEffect(() => {
    const kg = formData.kg === '' ? 0 : parseFloat(formData.kg);
    const crates = formData.crates === '' ? 0 : parseFloat(formData.crates);
    
    if (!isNaN(kg) && !isNaN(crates)) {
      const eggsFromKg = kgToEggs(kg);
      const eggsFromCrates = cratesToEggs(crates);
      
      setEggPreview({
        fromKg: eggsFromKg,
        fromCrates: eggsFromCrates,
        total: eggsFromKg + eggsFromCrates
      });
    }
  }, [formData.kg, formData.crates]);

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
    const kg = formData.kg === '' ? 0 : parseFloat(formData.kg);
    const crates = formData.crates === '' ? 0 : parseFloat(formData.crates);
    
    if ((kg === 0 && crates === 0) || (isNaN(kg) && isNaN(crates))) {
      alert('Masukkan setidaknya satu nilai kg atau peti.');
      return;
    }
    
    if (!formData.date) {
      alert('Tanggal harus diisi.');
      return;
    }
    
    onSubmit(formData);
    
    // Clear form if not editing
    if (!isEditing) {
      setFormData({ ...initialData, kg: '', crates: '' });
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">
        {isEditing ? 'Edit Distribusi' : 'Tambah Distribusi'}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="kg" className="form-label">Kilogram (kg)</label>
            <input
              type="number"
              id="kg"
              name="kg"
              value={formData.kg}
              onChange={handleChange}
              className="form-input"
              placeholder="Jumlah kg"
              min="0"
              step="0.1"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="crates" className="form-label">Peti</label>
            <input
              type="number"
              id="crates"
              name="crates"
              value={formData.crates}
              onChange={handleChange}
              className="form-input"
              placeholder="Jumlah peti"
              min="0"
              step="0.1"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="destination" className="form-label">Tujuan</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination || ''}
            onChange={handleChange}
            className="form-input"
            placeholder="Tujuan distribusi"
          />
        </div>
        
        <DatePicker
          label="Tanggal Distribusi"
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
        
        {(formData.kg !== '' || formData.crates !== '') && (
          <div className="bg-blue-50 p-3 rounded-md mb-4">
            <p className="text-sm font-medium text-blue-800">Konversi ke Butir:</p>
            <ul className="text-sm text-blue-700">
              {formData.kg !== '' && parseFloat(formData.kg) > 0 && (
                <li>{formatNumber(parseFloat(formData.kg))} kg = {formatNumber(eggPreview.fromKg)} butir</li>
              )}
              {formData.crates !== '' && parseFloat(formData.crates) > 0 && (
                <li>{formatNumber(parseFloat(formData.crates))} peti = {formatNumber(eggPreview.fromCrates)} butir</li>
              )}
              <li className="font-medium mt-1">Total: {formatNumber(eggPreview.total)} butir</li>
            </ul>
          </div>
        )}
        
        <div className="flex space-x-2">
          <button type="submit" className="btn-primary flex-grow">
            {isEditing ? 'Simpan Perubahan' : 'Tambah Distribusi'}
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