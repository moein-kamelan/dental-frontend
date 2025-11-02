import React from 'react'

function SearchBox() {
  return (
      <div className="section-border  p-6">
                <h4 className="font-estedad-semibold text-2xl text-dark mb-4">جستجو</h4>
                <form className="flex justify-between items-center gap-2    px-3 py-2.5 border-2 border-[#5e5b5b17] rounded-full w-full">
                  <input
                    type="text"
                    placeholder="جستجو..."
                    className=" focus:outline-none h-10 w-2/3"
                  />
                  <button className="bg-primary text-white size-9 rounded-full hover:bg-secondary transition shrink-0">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
  )
}

export default SearchBox