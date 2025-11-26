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
        <section className="mb-1">
            <div className="container mx-auto px-4">
                <form onSubmit={handleSearch} className=" p-6 md:max-w-2xl ">
                    <div className="relative">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="جستجو.." className="w-full pl-16 pr-6 py-3  border-main-border-color border-2 rounded-full focus:outline-none focus:border-primary "/>
                        <button  type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-primary bg-primary  rounded-full p-2 size-9 hover:bg-deepblue transition-all duration-300 shrink-0 *:cursor-pointer"><i className="fa fa-search text-white"></i></button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default SearchForm
