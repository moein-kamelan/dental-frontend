import React, { useState } from 'react'
import type { Article, Doctor, Service } from '../../../../types/types';
import { useNavigate } from 'react-router-dom';

function SearchForm({services, doctors, articles}: {services?: {data: {services: Service[]}}, doctors?: {data: {doctors: Doctor[]}}, articles?: {data: {articles: Article[]}}}) {
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (services) {
          navigate(`/services?page=1&limit=9&search=${search}`);
        }
        if (doctors) {
          navigate(`/doctors?page=1&limit=8&search=${search}`);
        }
        if (articles) {
          navigate(`/blog?page=1&limit=9&search=${search}`);
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
                    className="w-full lg:w-64 xl:w-72 pl-12 pr-4 py-2.5 bg-white border-2 border-primary/30 rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-dark placeholder:text-paragray text-sm transition-all duration-300 shadow-md"
                    style={{ fontFamily: 'var(--font-vazir)' }}
                />
                <button 
                    type="submit" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-primary hover:text-accent transition-colors duration-200 shrink-0 cursor-pointer focus:outline-none"
                >
                    <i className="fas fa-search text-sm"></i>
                </button>
            </div>
        </form>
    )
}

export default SearchForm
