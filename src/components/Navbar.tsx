import React from 'react';
import { Menu, X, Sprout, Book, ShoppingBag, ChefHat, Link as LinkIcon, FileText, Shield } from 'lucide-react';
import { AuthButton } from './AuthButton';
import { auth } from '../lib/firebase';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function Navbar({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  const user = auth.currentUser;
  const isAdmin = user?.email === 'admin@mushroomservice.com';

  const navItems = [
    { id: 'home', label: 'Home', icon: Sprout },
    { id: 'about', label: 'About', icon: Book },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'recipes', label: 'Recipes', icon: ChefHat },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'links', label: 'Links', icon: LinkIcon },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: Shield }] : []),
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Sprout className="h-8 w-8 text-amber-600" />
            <span className="ml-2 text-xl font-bold text-amber-900">MushRoomService</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeSection === item.id
                    ? 'text-amber-600'
                    : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                <item.icon className="h-5 w-5 mr-1" />
                {item.label}
              </button>
            ))}
            <AuthButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-amber-600"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium ${
                  activeSection === item.id
                    ? 'bg-amber-100 text-amber-600'
                    : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.label}
              </button>
            ))}
            <div className="px-3 py-2">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}