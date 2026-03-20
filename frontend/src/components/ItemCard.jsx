import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  return (
    <Link to={`/item/${item._id}`}>
      <div className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition-shadow cursor-pointer border border-slate-700 hover:border-slate-600">
        <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">📦</span>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg text-white truncate mb-2">
            {item.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-blue-400 font-bold text-lg">
              ₹{item.price}
            </span>
            <span className="text-gray-400 text-xs bg-slate-700 px-2 py-1 rounded">
              By {item.seller?.username || 'Unknown'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
