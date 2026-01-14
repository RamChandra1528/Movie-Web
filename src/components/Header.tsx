import { ChevronLeft, ChevronRight, Search, MessageCircle, Menu } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <ChevronLeft size={24} className="text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <ChevronRight size={24} className="text-gray-400" />
        </button>

        <div className="relative ml-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="search any movies....."
            onChange={(e) => onSearch?.(e.target.value)}
            className="bg-gray-900 text-gray-400 rounded-full pl-12 pr-6 py-3 w-80 focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <MessageCircle size={24} className="text-gray-400" />
        </button>
        <button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-white font-bold">U</span>
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Menu size={24} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}
