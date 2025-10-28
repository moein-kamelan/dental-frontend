import React from 'react'

function Topbar() {
  return (
    
     <section className="bg-linear-to-l from-primary to-deepblue text-white py-3 block h-11 font-estedad-medium">
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:justify-between items-center">
                <ul className=" hidden md:flex flex-wrap gap-6 text-sm ">
                    <li className="flex items-center gap-2">
                        <i className="fas fa-phone-alt"></i>
                        <a href="callto:123456789">(۷۰۰) ۲۳۰-۰۰۳۵ ۲۱+</a>
                    </li>
                    <li className="flex items-center gap-2">
                        <i className="fas fa-envelope"></i>
                        <a href="mailto:example@gmail.com">support@gmail.com</a>
                    </li>
                    <li className="flex items-center gap-2">
                        <i className="fas fa-map-marker-alt"></i>
                        <p>شیراز. خیابان نیایش. ساختمان پزشکان</p>
                    </li>
                </ul>
                <ul className=" flex md:hidden  lg:flex flex-wrap gap-4">
                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                    <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default Topbar

