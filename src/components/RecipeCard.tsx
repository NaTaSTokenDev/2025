import React from 'react';
import { Recipe } from '../types';
import { Beaker, FlaskRound as Flask, Brain as Grain, File, Clock } from 'lucide-react';

const categoryIcons = {
  'agar': Beaker,
  'liquid-culture': Flask,
  'substrate': Grain,
  'other': File
};

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  isAdmin?: boolean;
}

export function RecipeCard({ recipe, onClick, isAdmin }: RecipeCardProps) {
  const Icon = categoryIcons[recipe.category];
  
  return (
    <div 
      onClick={onClick}
      className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:bg-white/90 cursor-pointer border border-amber-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-amber-900">{recipe.title}</h3>
        <Icon className="w-6 h-6 text-amber-700" />
      </div>
      <div className="text-sm text-amber-800">
        <p>{recipe.ingredients.length} ingredients</p>
        <p>{recipe.steps.length} steps</p>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {recipe.isCustom && (
          <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
            Custom Recipe
          </span>
        )}
        {recipe.status === 'pending' && isAdmin && (
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </span>
        )}
      </div>
    </div>
  );
}