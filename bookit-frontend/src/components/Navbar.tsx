interface NavbarProps {
  onSearch: (term: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-3">
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src="hd.png" alt="Logo" className="w-24 h-12"/>

        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search experiences"
            className="border rounded-md px-3 py-1 w-60 text-sm"
            onChange={(e) => onSearch(e.target.value)}
          />
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-md font-medium"
            onClick={() => {}}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}
