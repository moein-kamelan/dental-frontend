import { Link } from 'react-router-dom'
import SEO from '../../components/SEO/SEO'
import Topbar from '../../components/modules/Main/Topbar/Topbar'
import Navbar from '../../components/modules/Main/Navbar/Navbar'
import Footer from '../../components/modules/Main/Footer/Footer'

function NotFound({ text }: { text?: string }) {
  return (
    <>
    <SEO 
      title="404 - صفحه یافت نشد | کلینیک دندان پزشکی طاها"
      description="صفحه مورد نظر شما یافت نشد. به صفحه اصلی برگردید یا از منوی راهبری استفاده کنید."
      noindex={true}
      nofollow={true}
    />
    <Topbar/>
    <Navbar/>

      <section className="py-20">
        <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-8">
                    <img 
                      src="/images/errore-img.png" 
                      alt="صفحه 404 - یافت نشد" 
                      className="mx-auto max-w-md"
                      width="384"
                      height="auto"
                    />
                </div>
                <h1 className="text-4xl font-bold mb-4">{text || "اوپس! چیزی پیدا نشد"}</h1>
                <p className="text-paragray text-lg mb-8">
                  با عرض پوزش این صفحه یافت نشد. به صفحات زیر مراجعه کنید:
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link 
                    to="/home" 
                    className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-deepblue transition font-semibold"
                  >
                    صفحه اصلی
                  </Link>
                  <Link 
                    to="/services" 
                    className="inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-full hover:bg-gray-300 transition font-semibold"
                  >
                    خدمات ما
                  </Link>
                  <Link 
                    to="/doctors" 
                    className="inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-full hover:bg-gray-300 transition font-semibold"
                  >
                    پزشکان
                  </Link>
                </div>

                <div className="text-right bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-3">لینک‌های مفید:</h2>
                  <ul className="space-y-2">
                    <li><Link to="/articles" className="text-primary hover:underline">مقالات</Link></li>
                    <li><Link to="/contact" className="text-primary hover:underline">تماس با ما</Link></li>
                    <li><Link to="/about" className="text-primary hover:underline">درباره ما</Link></li>
                    <li><Link to="/appointment" className="text-primary hover:underline">رزرو نوبت</Link></li>
                  </ul>
                </div>
            </div>
        </div>
    </section>

    <Footer/>
    
    </>
  )
}

export default NotFound
