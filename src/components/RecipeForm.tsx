import React, { useState } from 'react';
import { RecipeFormData } from '../types';
import { Plus, Minus } from 'lucide-react';

interface RecipeFormProps {
  onSubmit: (recipe: RecipeFormData) => void;
  onCancel: () => void;
}

export function RecipeForm({ onSubmit, onCancel }: RecipeFormProps) {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    category: 'other',
    ingredients: [''],
    steps: [''],
    notes: '',
    submittedBy: ''
  });

  const addListItem = (field: 'ingredients' | 'steps') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeListItem = (field: 'ingredients' | 'steps', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateListItem = (field: 'ingredients' | 'steps', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-amber-900">Your Name (Optional)</label>
        <input
          type="text"
          value={formData.submittedBy}
          onChange={e => setFormData(prev => ({ ...prev, submittedBy: e.target.value }))}
          className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          placeholder="Anonymous"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Recipe Title</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Category</label>
        <select
          value={formData.category}
          onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as RecipeFormData['category'] }))}
          className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        >
          <option value="agar">Agar</option>
          <option value="liquid-culture">Liquid Culture</option>
          <option value="substrate">Substrate</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Ingredients</label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="text"
              value={ingredient}
              onChange={e => updateListItem('ingredients', index, e.target.value)}
              className="flex-1 rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={() => removeListItem('ingredients', index)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem('ingredients')}
          className="mt-2 flex items-center text-amber-700 hover:text-amber-800"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Ingredient
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Steps</label>
        {formData.steps.map((step, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="text"
              value={step}
              onChange={e => updateListItem('steps', index, e.target.value)}
              className="flex-1 rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={() => removeListItem('steps', index)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem('steps')}
          className="mt-2 flex items-center text-amber-700 hover:text-amber-800"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Step
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Notes (Optional)</label>
        <textarea
          value={formData.notes}
          onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-amber-700 hover:text-amber-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
        >
          Submit Recipe
        </button>
      </div>
    </form>
  );
}