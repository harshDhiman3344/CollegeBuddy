import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to <span className="text-blue-400">Campus Buddy</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Buy and sell items with your fellow students. Find great deals and reach thousands of buyers in your campus community.
            </p>
            
            <div className="flex gap-4">
              <Link 
                to="/marketplace" 
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Items
              </Link>
              <SignedIn>
                <Link 
                  to="/create-listing" 
                  className="px-8 py-3 bg-transparent border-2 border-blue-600 text-blue-400 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Sell Now
                </Link>
              </SignedIn>
              <SignedOut>
                <Link 
                  to="/marketplace" 
                  className="px-8 py-3 bg-transparent border-2 border-blue-600 text-blue-400 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Start Selling
                </Link>
              </SignedOut>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">🛍️</div>
              <p className="text-white text-lg font-semibold">Your Campus Marketplace</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-700">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose Campus Buddy?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-white mb-2">Secure Trading</h3>
            <p className="text-gray-400">Trade safely with verified campus members</p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Fast & Easy</h3>
            <p className="text-gray-400">List items in seconds and connect with buyers instantly</p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-white mb-2">Best Deals</h3>
            <p className="text-gray-400">Find great bargains from your campus community</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
