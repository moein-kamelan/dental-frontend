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
  const email = settings?.email || 'support@gmail.com'
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
    <section className="bg-linear-to-l overflow-hidden from-primary to-accent text-white block h-9 sm:h-10 md:h-11 font-estedad-medium">
      <div className="container mx-auto px-3 sm:px-4 h-full">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-1.5 sm:gap-2 h-full">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {hasTwoClinics && (
              <button
                onClick={handleToggleClinic}
                className="flex items-center gap-1 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-md hover:bg-white/10 transition-colors text-[10px] sm:text-xs md:text-sm leading-none"
                title={`تبدیل به ${activeClinicIndex === 0 ? secondClinic.name : firstClinic.name}`}
              >
                <i className="fas fa-exchange-alt text-xs sm:text-sm"></i>
                <span className="hidden sm:inline">
                  {activeClinicIndex === 0 ? firstClinic.name : secondClinic.name}
                </span>
              </button>
            )}
            
            <div className="flex md:hidden items-center gap-1.5 sm:gap-2 text-sm sm:text-base leading-none">
              {phoneNumber && (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="text-xs sm:text-sm">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <a href={`tel:${phoneNumber}`} className="leading-none whitespace-nowrap font-estedad-medium">{phoneNumber}</a>
                </div>
              )}
              {activeClinic && (
                <span className="text-xs sm:text-sm opacity-90 whitespace-nowrap">- {activeClinic.name}</span>
              )}
            </div>
            
            <ul className="hidden md:flex flex-wrap gap-4 lg:gap-6 text-sm leading-none">
              {phoneNumber && (
                <li className="flex items-center gap-2">
                  <i className="fas fa-phone-alt"></i>
                  <a href={`tel:${phoneNumber}`} className="leading-none">{phoneNumber}</a>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-2">
                  <i className="fas fa-envelope"></i>
                  <a href={`mailto:${email}`} className="leading-none">{email}</a>
                </li>
              )}
              {address && (
                <li className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt"></i>
                  <p className="leading-none m-0">{address}</p>
                </li>
              )}
            </ul>
          </div>
          
          <ul className="hidden lg:flex flex-wrap gap-3 xl:gap-4 items-center">
            {facebook && (
              <li>
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
            )}
            {twitter && (
              <li>
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
            )}
            {youtube && (
              <li>
                <a href={youtube} target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
            )}
            {instagram && (
              <li>
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
                  <i className="fab fa-instagram"></i>
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

