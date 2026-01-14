import { Circle, Heart, Bell, ChevronRight, LogOut } from 'lucide-react';

interface SidebarProps {
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
}

export function Sidebar({ selectedCategory, onCategorySelect }: SidebarProps) {
  const categories = [
    'Action',
    'Horror',
    'Adventure',
    'animation',
    'adventure,action',
    'SF, Adventure',
    'Crime',
    'Catoon',
    'War',
    'Sport',
  ];

  return (
    <aside className="w-64 bg-sidebar-bg text-white h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          DXX.<span className="text-red-600">MOVIES</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 overflow-y-auto">
        <div className="mb-6">
          <p className="text-gray-500 text-xs mb-4">New feed</p>

          <button className="flex items-center gap-3 text-white py-3 px-4 rounded-lg bg-card-bg w-full mb-2">
            <Circle size={20} />
            <span>Browse</span>
          </button>

          <button className="flex items-center gap-3 text-gray-400 py-3 px-4 rounded-lg hover:bg-card-bg w-full mb-2">
            <Heart size={20} />
            <span>Watchlist</span>
          </button>

          <button className="flex items-center gap-3 text-gray-400 py-3 px-4 rounded-lg hover:bg-card-bg w-full">
            <Bell size={20} fill="red" className="text-red-600" />
            <span>Remind</span>
          </button>
        </div>

        <div>
          <p className="text-gray-500 text-sm mb-4">Categories</p>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect?.(category)}
              className={`block text-left py-2 px-4 rounded-lg hover:bg-card-bg w-full text-sm ${
                selectedCategory === category ? 'text-white bg-gray-900' : 'text-gray-400'
              }`}
            >
              {category}
            </button>
          ))}
          <button className="flex items-center gap-2 text-gray-400 py-2 px-4 rounded-lg hover:bg-card-bg w-full text-sm mt-2">
            <span>View mores</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </nav>

      <div className="p-4">
        <button className="flex items-center gap-3 text-gray-400 py-3 px-4 rounded-lg hover:bg-card-bg w-full">
          <LogOut size={20} />
          <span>Log_Out</span>
        </button>
      </div>
    </aside>
  );
}
