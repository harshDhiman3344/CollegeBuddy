import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, useUser } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import CreateListing from './pages/CreateListing';
import ItemDetail from './pages/ItemDetail';
import { syncUser } from './api/api';
import './index.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

// Component to sync user to backend
const UserSyncProvider = ({ children }) => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      // Sync user to backend when they sign in
      syncUser(
        user.id,
        user.username || user.emailAddresses[0]?.emailAddress?.split('@')[0] || 'User',
        user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress
      ).catch((error) => {
        console.error('Failed to sync user:', error);
      });
    }
  }, [isLoaded, user]);

  return children;
};

function App() {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Configuration Error</h1>
          <p className="text-gray-400">
            Please set VITE_CLERK_PUBLISHABLE_KEY in your .env.local file
          </p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <UserSyncProvider>
          <div className="min-h-screen bg-slate-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route
                path="/create-listing"
                element={
                  <ProtectedRoute>
                    <CreateListing />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </UserSyncProvider>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
