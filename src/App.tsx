import React, { useState } from 'react';
import { Recipe, RecipeFormData, AdminState } from './types';
import { defaultRecipes } from './data/defaultRecipes';
import { RecipeCard } from './components/RecipeCard';
import { RecipeForm } from './components/RecipeForm';
import { RecipeDetail } from './components/RecipeDetail';
import { AdminPanel } from './components/AdminPanel';
import { Plus, Search, Shield, Menu, X, MapPin, Phone, Mail, Sprout, Book, ShoppingBag, ChefHat, FileText } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { LinksPage } from './components/LinksPage';
import { BlogList } from './components/BlogList';
import { BlogForm } from './components/BlogForm';
import { BlogPost } from './components/BlogPost';
import { CommentList } from './components/CommentList';
import { CommentForm } from './components/CommentForm';
import { auth } from './lib/firebase';
import yourImage from './images/mushroomservicelogo.png';
import kingOyster from './images/kingoyster_1.jpeg';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(defaultRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Recipe['category'] | 'all'>('all');
  const [adminState, setAdminState] = useState<AdminState>({
    isAdmin: false,
    password: ''
  });
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const pendingRecipes = recipes.filter(recipe => recipe.status === 'pending');
  const isAdmin = auth.currentUser?.email === 'admin@mushroomservice.com';

  // Recipe filtering logic
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const isVisible = recipe.status === 'approved' || adminState.isAdmin;
    return matchesSearch && matchesCategory && isVisible;
  });

  const handleAddRecipe = (formData: RecipeFormData) => {
    const newRecipe: Recipe = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date(),
      isCustom: true,
      status: 'pending'
    };
    setRecipes(prev => [...prev, newRecipe]);
    setShowForm(false);
  };

  const handleRecipeAction = (recipeId: string, action: 'approve' | 'reject' | 'delete') => {
    setRecipes(prev => prev.map(recipe => {
      if (recipe.id === recipeId) {
        if (action === 'delete') {
          return null;
        }
        return {
          ...recipe,
          status: action === 'approve' ? 'approved' : 'rejected'
        };
      }
      return recipe;
    }).filter(Boolean) as Recipe[]);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            {/* Hero Section */}
            <section className="relative h-[600px] bg-cover bg-center" style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=2574&auto=format&fit=crop')"
            }}>
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-8 mb-8">
                  <img
                    src={yourImage}
                    alt="Mushroom Service Logo"
                    className="w-48 h-48 object-contain rounded-lg"
                  />
                  <img
                    src={kingOyster}
                    alt="King Oyster Mushrooms"
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Fresh Mushrooms & Professional Growing Supplies
                </h1>
                <p className="text-xl text-amber-100 mb-8 max-w-2xl">
                  Your premier source for gourmet mushrooms and cultivation equipment in Edenton, NC
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <button
                    onClick={() => setActiveSection('shop')}
                    className="bg-amber-600 text-white px-8 py-3 rounded-md hover:bg-amber-700 transition-colors flex items-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Shop Now
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setActiveSection('recipes')}
                      className="bg-amber-100 text-amber-900 px-8 py-3 rounded-md hover:bg-amber-200 transition-colors flex items-center gap-2"
                    >
                      <ChefHat className="w-5 h-5" />
                      Cultivation Recipes
                    </button>
                    <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      New!
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-amber-900 mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <ProductCard
                    title="Fresh Blue Oyster Mushrooms"
                    price={12.99}
                    imagePlaceholder="Add product image URL here"
                    description="Locally grown, fresh Blue Oyster mushrooms. Available in 1lb packages."
                  />
                  <ProductCard
                    title="Complete Growing Kit"
                    price={49.99}
                    imagePlaceholder="Add growing kit image URL here"
                    description="Everything you need to start growing gourmet mushrooms at home."
                  />
                  <ProductCard
                    title="Premium Spawn Bags"
                    price={24.99}
                    imagePlaceholder="Add spawn bags image URL here"
                    description="Professional-grade spawn bags for mushroom cultivation."
                  />
                </div>
              </div>
            </section>
          </>
        );

      case 'about':
        return (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-amber-900 mb-6">About MushRoomService</h2>
                  <p className="text-gray-700 mb-4">
                    Located in Edenton, North Carolina, MushRoomService is your premier source for fresh gourmet mushrooms and professional cultivation supplies.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Our state-of-the-art growing facility produces the highest quality mushrooms, while our shop provides everything you need to start your own cultivation journey.
                  </p>
                  <div className="space-y-4 mt-8">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-amber-600 mr-3" />
                      <span>Edenton, NC 27932</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-amber-600 mr-3" />
                      <span>(252) 862-7223</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-amber-600 mr-3" />
                      <span>mushroomservice@gmail.com</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    src={yourImage}
                    alt="Mushroom Service Logo"
                    className="mb-6 mx-auto max-w-sm rounded-lg shadow-lg"
                  />
                  <div className="text-center">
                    <button
                      onClick={() => setActiveSection('shop')}
                      className="bg-amber-600 text-white px-8 py-3 rounded-md hover:bg-amber-700 transition-colors mb-4"
                    >
                      Shop Now
                    </button>
                    <br />
                    <a
                      href="https://amzn.to/40POY6h"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-amber-600 underline hover:text-amber-700"
                    >
                      Coir Bricks on Amazon - Here
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'shop':
        return (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-amber-900 mb-8">Our Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold text-amber-800">Fresh Mushrooms</h3>
                  <div className="grid gap-6">
                    <ProductCard
                      title="Blue Oyster Mushrooms"
                      price={12.99}
                      imagePlaceholder="Add product image URL here"
                      description="Fresh, locally grown Blue Oyster mushrooms"
                    />
                    <ProductCard
                      title="Lion's Mane Mushrooms"
                      price={15.99}
                      imagePlaceholder="Add product image URL here"
                      description="Fresh, locally grown Lion's Mane mushrooms"
                    />
                  </div>
                </div>
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold text-amber-800">Growing Supplies</h3>
                  <div className="grid gap-6">
                    <ProductCard
                      title="Sterilized Grain Spawn"
                      price={24.99}
                      imagePlaceholder="Add product image URL here"
                      description="Professional grade grain spawn bags"
                    />
                    <ProductCard
                      title="Substrate Blocks"
                      price={19.99}
                      imagePlaceholder="Add product image URL here"
                      description="Ready-to-fruit substrate blocks"
                    />
                  </div>
                </div>
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold text-amber-800">Equipment</h3>
                  <div className="grid gap-6">
                    <ProductCard
                      title="Flow Hood"
                      price={599.99}
                      imagePlaceholder="Add product image URL here"
                      description="Professional laminar flow hood"
                    />
                    <ProductCard
                      title="Pressure Cooker"
                      price={299.99}
                      imagePlaceholder="Add product image URL here"
                      description="23qt Pressure cooker for sterilization"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'recipes':
        return (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-amber-900">Cultivation Recipes</h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Submit Recipe
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => setShowAdminPanel(true)}
                      className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Admin Panel
                      {pendingRecipes.length > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {pendingRecipes.length}
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 space-y-2">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold text-amber-900 mb-4">Categories</h3>
                    <div className="space-y-2">
                      {[
                        { id: 'all', label: 'All Recipes', count: filteredRecipes.length },
                        { id: 'agar', label: 'Agar Recipes', count: filteredRecipes.filter(r => r.category === 'agar').length },
                        { id: 'liquid-culture', label: 'Liquid Culture', count: filteredRecipes.filter(r => r.category === 'liquid-culture').length },
                        { id: 'substrate', label: 'Substrate', count: filteredRecipes.filter(r => r.category === 'substrate').length },
                        { id: 'other', label: 'Other', count: filteredRecipes.filter(r => r.category === 'other').length }
                      ].map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id as Recipe['category'] | 'all')}
                          className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-amber-700 text-white'
                              : 'hover:bg-amber-100 text-amber-900'
                          }`}
                        >
                          <span>{category.label}</span>
                          <span className="float-right bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs">
                            {category.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search recipes..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white/80 backdrop-blur-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredRecipes.map(recipe => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onClick={() => setSelectedRecipe(recipe)}
                        isAdmin={isAdmin}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'blog':
        return (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-amber-900">Blog</h2>
                {isAdmin && (
                  <button
                    onClick={() => setShowBlogForm(true)}
                    className="flex items-center px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    New Post
                  </button>
                )}
              </div>
              <BlogList posts={[]} isAdmin={isAdmin} />
            </div>
          </section>
        );

      case 'links':
        return <LinksPage />;

      case 'admin':
        if (!isAdmin) return null;
        return (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-amber-900 mb-8">Admin Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-amber-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-4">Blog Management</h3>
                  <button
                    onClick={() => setShowBlogForm(true)}
                    className="flex items-center px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    New Blog Post
                  </button>
                </div>
                
                <div className="bg-amber-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-4">Recipe Management</h3>
                  <button
                    onClick={() => setShowAdminPanel(true)}
                    className="flex items-center px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Manage Recipes
                    {pendingRecipes.length > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {pendingRecipes.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {renderContent()}

      {/* Modals */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Submit New Recipe</h2>
            <RecipeForm
              onSubmit={handleAddRecipe}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
          <RecipeDetail
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            isAdmin={isAdmin}
          />
        </div>
      )}

      {showAdminPanel && isAdmin && (
        <AdminPanel
          recipes={pendingRecipes}
          onClose={() => setShowAdminPanel(false)}
          onAction={handleRecipeAction}
        />
      )}

      {/* Blog Form Modal */}
      {showBlogForm && isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Create New Blog Post</h2>
            <BlogForm
              onSubmit={(data) => {
                // Handle blog post submission
                setShowBlogForm(false);
              }}
              onCancel={() => setShowBlogForm(false)}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;