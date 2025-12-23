import { useState } from 'react'
import { useGetSettings } from '../../../../services/useSettings'
import { useGetAllClinics } from '../../../../services/useClinics'

function Topbar() {
  const { data: settingsData } = useGetSettings()
  const { data: clinicsData } = useGetAllClinics(1, 2)
  const settings = settingsData?.data?.settings
  
  const clinics = clinicsData?.data?.clinics || []
  const firstClinic = clinics[0] || null
  const secondClinic = clinics[1] || null
  
  // State for toggling between clinics (only if we have two clinics)
  const [activeClinicIndex, setActiveClinicIndex] = useState(0)
  const hasTwoClinics = firstClinic && secondClinic
  
  // Determine which clinic to show
  const activeClinic = hasTwoClinics 
    ? (activeClinicIndex === 0 ? firstClinic : secondClinic)
    : firstClinic

  // Use clinic data if provided, otherwise fallback to settings or default values
  const phoneNumber = activeClinic?.phoneNumber || settings?.phoneNumber || '123456789'
  const email = settings?.email // Only use email from settings, no fallback
  const address = activeClinic?.address || settings?.address || 'شیراز. خیابان نیایش. ساختمان پزشکان'
  
  // Social media links from settings
  const facebook = settings?.facebook
  const twitter = settings?.twitter
  const youtube = settings?.youtube
  const instagram = settings?.instagram

  const handleToggleClinic = () => {
    if (hasTwoClinics) {
      setActiveClinicIndex(prev => (prev === 0 ? 1 : 0))
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/95 to-accent text-white py-2 md:py-2.5">
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {hasTwoClinics && (
              <button
                onClick={handleToggleClinic}
                className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors text-[10px] sm:text-xs leading-none backdrop-blur-sm"
                title={`تبدیل به ${activeClinicIndex === 0 ? secondClinic.name : firstClinic.name}`}
                style={{ fontFamily: 'var(--font-vazir)' }}
              >
                <i className="fas fa-exchange-alt text-xs"></i>
                <span className="hidden sm:inline font-medium">
                  {activeClinicIndex === 0 ? firstClinic.name : secondClinic.name}
                </span>
              </button>
            )}
            
            <div className="flex md:hidden items-center gap-1.5 sm:gap-2 text-xs sm:text-sm leading-none">
              {phoneNumber && (
                <div className="flex items-center gap-1.5">
                  <i className="fas fa-phone-alt text-[10px]"></i>
                  <a href={`tel:${phoneNumber}`} className="leading-none whitespace-nowrap font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                    {phoneNumber}
                  </a>
                </div>
              )}
              {activeClinic && (
                <span className="text-[10px] sm:text-xs opacity-80 whitespace-nowrap" style={{ fontFamily: 'var(--font-vazir)' }}>
                  - {activeClinic.name}
                </span>
              )}
            </div>
            
            <ul className="hidden md:flex flex-wrap gap-3 lg:gap-4 text-xs sm:text-sm leading-none">
              {phoneNumber && (
                <li className="flex items-center gap-1.5">
                  <i className="fas fa-phone-alt text-[10px]"></i>
                  <a href={`tel:${phoneNumber}`} className="leading-none hover:text-white/80 transition-colors font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                    {phoneNumber}
                  </a>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-1.5">
                  <i className="fas fa-envelope text-[10px]"></i>
                  <a href={`mailto:${email}`} className="leading-none hover:text-white/80 transition-colors font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                    {email}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-center gap-1.5">
                  <i className="fas fa-map-marker-alt text-[10px]"></i>
                  <p className="leading-none m-0 font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>{address}</p>
                </li>
              )}
            </ul>
          </div>
          
          <ul className="hidden lg:flex flex-wrap gap-2.5 xl:gap-3 items-center">
            {facebook && (
              <li>
                <a 
                  href={facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
                >
                  <i className="fab fa-facebook-f text-xs"></i>
                </a>
              </li>
            )}
            {twitter && (
              <li>
                <a 
                  href={twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
                >
                  <i className="fab fa-twitter text-xs"></i>
                </a>
              </li>
            )}
            {youtube && (
              <li>
                <a 
                  href={youtube} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
                >
                  <i className="fab fa-youtube text-xs"></i>
                </a>
              </li>
            )}
            {instagram && (
              <li>
                <a 
                  href={instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
                >
                  <i className="fab fa-instagram text-xs"></i>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Topbar

