import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar } from 'react-icons/fi';

export default function DatePicker({ label, selected, onChange, className = '' }) {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <div className="relative">
        <ReactDatePicker
          selected={selected}
          onChange={onChange}
          dateFormat="dd MMMM yyyy"
          className="form-input pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FiCalendar />
        </div>
      </div>
    </div>
  );
}