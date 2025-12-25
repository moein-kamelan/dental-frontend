import React, { useState } from 'react'
import type { Article, Doctor, Service } from '../../../../types/types';
import { useNavigate } from 'react-router-dom';

function SearchForm({services, doctors, articles}: {services?: {data: {services: Service[]}}, doctors?: {data: {doctors: Doctor[]}}, articles?: {data: {articles: Article[]}}}) {
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchTerm = search.trim();
        if (services) {
          if (searchTerm) {
            navigate(`/services?page=1&limit=9&search=${encodeURIComponent(searchTerm)}`);
          } else {
            navigate(`/services?page=1&limit=9`);
          }
        }
        if (doctors) {
          if (searchTerm) {
            navigate(`/doctors?page=1&limit=8&search=${encodeURIComponent(searchTerm)}`);
          } else {
            navigate(`/doctors?page=1&limit=8`);
          }
        }
        if (articles) {
          if (searchTerm) {
            navigate(`/blog?page=1&limit=9&search=${encodeURIComponent(searchTerm)}`);
          } else {
            navigate(`/blog?page=1&limit=9`);
          }
        }
    }
    return (
        <form onSubmit={handleSearch} className="w-full lg:w-auto">
            <div className="relative group">
                <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    type="text" 
                    placeholder="جستجو..." 
                    className="w-full lg:w-64 xl:w-72 pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:border-accent focus:bg-white text-dark placeholder:text-gray-400 text-sm transition-all duration-300 shadow-sm"
                    style={{ fontFamily: 'var(--font-vazir)' }}
                />
                <button 
                    type="submit" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-accent transition-colors duration-200 shrink-0 cursor-pointer focus:outline-none"
                >
                    <i className="fas fa-search text-sm"></i>
                </button>
            </div>
        </form>
    )
}

export default SearchForm
