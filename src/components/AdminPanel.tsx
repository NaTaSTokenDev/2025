import React from 'react';
import { Recipe } from '../types';
import { X, Check, X as XIcon, Trash } from 'lucide-react';

interface AdminPanelProps {
  recipes: Recipe[];
  onClose: () => void;
  onAction: (recipeId: string, action: 'approve' | 'reject' | 'delete') => void;
}

export function AdminPanel({ recipes, onClose, onAction }: AdminPanelProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-900">Admin Panel - Pending Recipes</h2>
          <button
            onClick={onClose}
            className="text-amber-600 hover:text-amber-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {recipes.length === 0 ? (
          <p className="text-center text-amber-800 py-8">No pending recipes to review</p>
        ) : (
          <div className="space-y-6">
            {recipes.map(recipe => (
              <div key={recipe.id} className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-amber-900">{recipe.title}</h3>
                    <p className="text-sm text-amber-700">
                      Submitted by: {recipe.submittedBy || 'Anonymous'} | 
                      Category: {recipe.category} | 
                      Date: {new Date(recipe.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onAction(recipe.id, 'approve')}
                      className="p-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                      title="Approve"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onAction(recipe.id, 'reject')}
                      className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                      title="Reject"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onAction(recipe.id, 'delete')}
                      className="p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                      title="Delete"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Ingredients</h4>
                    <ul className="list-disc list-inside space-y-1 text-amber-900">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Steps</h4>
                    <ol className="list-decimal list-inside space-y-1 text-amber-900">
                      {recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                {recipe.notes && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-amber-800 mb-2">Notes</h4>
                    <p className="text-amber-900">{recipe.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}