import { ChevronLeft, ChevronRight, Search, MessageCircle, Menu } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onBack?: () => void;
  onForward?: () => void;
}

export function Header({ onSearch, onBack, onForward }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-panel-bg/80 border-b border-white/5 backdrop-blur">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="p-2 hover:bg-card-bg rounded-lg transition-colors"
          onClick={() => onBack?.()}
        >
          <ChevronLeft size={24} className="text-gray-400" />
        </button>
        <button
          type="button"
          className="p-2 hover:bg-card-bg rounded-lg transition-colors"
          onClick={() => onForward?.()}
        >
          <ChevronRight size={24} className="text-gray-400" />
        </button>

        <div className="relative ml-4">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="search any movies....."
            onChange={(e) => onSearch?.(e.target.value)}
            className="bg-search-bg text-gray-300 rounded-full pl-12 pr-7 h-12 w-[420px] shadow-[0_14px_35px_rgba(0,0,0,0.75)] border border-white/5 focus:outline-none focus:ring-2 focus:ring-accent-red/40 placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-card-bg rounded-lg transition-colors">
          <MessageCircle size={24} className="text-gray-400" />
        </button>
        <button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-white font-bold">U</span>
        </button>
        <button className="p-2 hover:bg-card-bg rounded-lg transition-colors">
          <Menu size={24} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}
