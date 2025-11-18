import React from 'react'

function BlogDetailsTagsAndShare() {
  return (
    <div className="p-8    flex flex-wrap items-center justify-between gap-4">

    <div className="flex items-center gap-4">
      <span className="text-dark ">اشتراک گذاری : </span>
      <a
        href="#"
        className="text-secondary hover:text-deepblue text-xl"
      >
        <i className="fab fa-facebook-f text-base"></i>
      </a>
      <a
        href="#"
        className="text-secondary hover:text-deepblue text-xl opacity-80"
      >
        <i className="fab fa-twitter text-base"></i>
      </a>
      <a
        href="#"
        className="text-pink-600 hover:text-pink-700 text-xl"
      >
        <i className="fab fa-instagram-square text-base"></i>
      </a>
    </div>
  </div>
  )
}

export default BlogDetailsTagsAndShare
