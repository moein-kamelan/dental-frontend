import React, { useState } from 'react'

function SearchForm({services, doctors, articles}: {services?: any, doctors?: any, articles?: any}) {
    const [search, setSearch] = useState<string>('');
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (services) {
          const filteredServices = services.filter((service: any) => service.title.toLowerCase().includes(search.toLowerCase()));
          console.log(filteredServices);
        }
        if (doctors) {
          const filteredDoctors = doctors.filter((doctor: any) => doctor.name.toLowerCase().includes(search.toLowerCase()));
          console.log(filteredDoctors);
        }
        if (articles) {
          const filteredArticles = articles.filter((article: any) => article.title.toLowerCase().includes(search.toLowerCase()));
          console.log(filteredArticles);
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
