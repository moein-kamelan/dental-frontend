import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SearchBox({ isServiceCategory , isArticleCategory }: { isServiceCategory?: boolean , isArticleCategory?: boolean } ) {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = search.trim();
    if (isServiceCategory) {
      if (searchTerm) {
        navigate(`/services?search=${encodeURIComponent(searchTerm)}`);
      } else {
        navigate(`/services`);
      }
    }
    if (isArticleCategory) {
      if (searchTerm) {
        navigate(`/blog?search=${encodeURIComponent(searchTerm)}`);
      } else {
        navigate(`/blog`);
      }
    }
  }
  return (
      <div className="section-border  p-6">
                <h4 className="font-estedad-semibold text-2xl text-dark mb-4">جستجو</h4>
                <form onSubmit={handleSearch} className="flex justify-between items-center gap-2    px-3 py-2.5 border-2 border-[#5e5b5b17] rounded-full w-full">
                  <input
                    type="text"
                    placeholder="جستجو..."
                    className=" focus:outline-none h-10 w-2/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button className="bg-accent text-white size-9 rounded-full hover:bg-secondary transition shrink-0">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
  )
}

export default SearchBox
