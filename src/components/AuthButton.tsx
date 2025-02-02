import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { LogIn, LogOut, User } from 'lucide-react';
import { AuthModal } from './AuthModal';

export function AuthButton() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {user ? (
        <div className="flex items-center gap-2">
          <span className="text-amber-700 flex items-center">
            <User className="w-4 h-4 mr-1" />
            {user.email}
          </span>
          <button
            onClick={handleSignOut}
            className="flex items-center px-3 py-1 text-amber-600 hover:text-amber-800"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAuthModal(true)}
          className="flex items-center px-3 py-1 text-amber-600 hover:text-amber-800"
        >
          <LogIn className="w-4 h-4 mr-1" />
          Sign In
        </button>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}