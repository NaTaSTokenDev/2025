import React from 'react';
import { Recipe } from '../types';
import { X } from 'lucide-react';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
}

export function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-2xl w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-900">{recipe.title}</h2>
        <button
          onClick={onClose}
          className="text-amber-600 hover:text-amber-800"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-amber-800 mb-2">Ingredients</h3>
          <ul className="list-disc list-inside space-y-1 text-amber-900">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-amber-800 mb-2">Steps</h3>
          <ol className="list-decimal list-inside space-y-2 text-amber-900">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        {recipe.notes && (
          <div>
            <h3 className="text-lg font-semibold text-amber-800 mb-2">Notes</h3>
            <p className="text-amber-900">{recipe.notes}</p>
          </div>
        )}

        <div className="text-sm text-amber-700">
          Added: {new Date(recipe.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}