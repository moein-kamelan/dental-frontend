import React from 'react'
import Breadcrumb from '../../components/modules/Main/Breadcrumb/Breadcrumb'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
    <Breadcrumb/>

      <section className="py-20">
        <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-8">
                    <img src="images/errore-img.png" alt="404" className="mx-auto max-w-md"/>
                </div>
                <h3 className="text-4xl font-bold mb-4">اوپس! چیزی پیدا نشد</h3>
                <p className="text-paragray text-lg mb-8">با عرض پوزش این صفحه یافت نشد نگاهی به محبوب‌ترین ما بیندازید</p>
                <Link to={"/home"} className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-deepblue transition font-semibold">
                    برو به خانه
                </Link>
            </div>
        </div>
    </section>
    
    </>
  )
}

export default NotFound