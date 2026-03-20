import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { getItemById, deleteItem } from '../api/api';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    try {
      setLoading(true);
      const data = await getItemById(id);
      setItem(data.item);
      setError(null);
    } catch (error) {
      setError('Failed to load item details.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      setDeleting(true);
      await deleteItem(id, user.id);
      navigate('/marketplace');
    } catch (error) {
      alert('Failed to delete item. Please try again.');
      console.error('Error:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleContactSeller = () => {
    setShowContactModal(true);
  };

  const handleSendMessage = () => {
    if (!contactMessage.trim()) {
      alert('Please write a message');
      return;
    }

    // Open email client with pre-filled message
    const subject = `Interest in: ${item.title}`;
    const body = `Hello ${item.seller?.username},\n\nI am interested in your listing: ${item.title}\n\nMy message:\n${contactMessage}\n\nPlease contact me back. Thank you!`;
    const mailtoLink = `mailto:${item.seller?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    setShowContactModal(false);
    setContactMessage('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-400">Loading item...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-6">{error || 'Item not found'}</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const isOwner = user && user.id === item.seller?.clerkId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/marketplace')}
          className="text-blue-400 hover:text-blue-300 mb-8 flex items-center gap-2"
        >
          ← Back to Marketplace
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Item Image */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg h-96 flex items-center justify-center">
            <span className="text-gray-300 text-lg">Item Image</span>
          </div>

          {/* Item Details */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-white mb-4">{item.title}</h1>

            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">Price</p>
              <p className="text-blue-400 text-4xl font-bold">₹{item.price}</p>
            </div>

            <div className="mb-6 pb-6 border-b border-slate-700">
              <p className="text-gray-400 text-sm mb-3">Seller Information</p>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-white text-lg font-semibold">{item.seller?.username || 'Unknown'}</p>
                <p className="text-gray-400 text-sm mt-1">{item.seller?.email || 'No email'}</p>
                {item.seller?.phone && (
                  <p className="text-gray-400 text-sm">{item.seller.phone}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">Description</p>
              <p className="text-white whitespace-pre-wrap">{item.description}</p>
            </div>

            <div className="mb-6 pb-6 border-b border-slate-700">
              <p className="text-gray-400 text-sm mb-2">Posted On</p>
              <p className="text-white">
                {new Date(item.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {isOwner ? (
                <>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                  >
                    {deleting ? 'Deleting...' : 'Delete Listing'}
                  </button>
                  <button
                    onClick={() => navigate('/marketplace')}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Back to Marketplace
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleContactSeller}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Contact Seller
                  </button>
                  <button
                    onClick={() => navigate('/marketplace')}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </>
              )}
            </div>

            {isOwner && (
              <p className="text-blue-400 text-sm mt-4 text-center">
                ✓ This is your listing
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Seller Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Seller</h2>

            <div className="mb-6 p-4 bg-slate-700/50 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Seller:</p>
              <p className="text-white font-semibold">{item.seller?.username}</p>
              <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                <span>📧</span>
                {item.seller?.email}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Your Message
              </label>
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Hello, I'm interested in this item. Can we discuss the price?"
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            <p className="text-gray-400 text-sm mb-4">
              💡 This will open your email client to send a message to the seller.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleSendMessage}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Send Message
              </button>
              <button
                onClick={() => {
                  setShowContactModal(false);
                  setContactMessage('');
                }}
                className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
