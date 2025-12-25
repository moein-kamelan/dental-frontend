import { useGetSettings } from '../../../../services/useSettings'
import { useGetAllClinics } from '../../../../services/useClinics'

function Topbar() {
  const { data: settingsData } = useGetSettings()
  const { data: clinicsData } = useGetAllClinics(1, 2)
  const settings = settingsData?.data?.settings
  
  const clinics = clinicsData?.data?.clinics || []
  const firstClinic = clinics[0] || null
  const secondClinic = clinics[1] || null

  // Get phone numbers from clinics
  const firstClinicPhone = firstClinic?.phoneNumber
  const secondClinicPhone = secondClinic?.phoneNumber
  
  // Fallback to settings if no clinic phone numbers
  const fallbackPhone = settings?.phoneNumber || '123456789'
  
  const email = settings?.email // Only use email from settings, no fallback
  const address = firstClinic?.address || settings?.address || 'شیراز. خیابان نیایش. ساختمان پزشکان'
  
  // Social media links from settings
  const facebook = settings?.facebook
  const twitter = settings?.twitter
  const youtube = settings?.youtube
  const instagram = settings?.instagram
  const telegram = settings?.telegram
  const eitaa = settings?.eitaa

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-accent via-accent/85 via-primary/85 to-primary text-white py-2">
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-3">
          {/* Social Media - Left side (mobile and desktop) */}
          <ul className="flex flex-wrap gap-2 sm:gap-2.5 xl:gap-3 items-center order-2">
            {facebook && (
              <li>
                <a 
                  href={facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                >
                  <i className="fab fa-facebook-f text-xs text-white"></i>
                </a>
              </li>
            )}
            {twitter && (
              <li>
                <a 
                  href={twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-400 hover:bg-blue-500 transition-all duration-200"
                >
                  <i className="fab fa-twitter text-xs text-white"></i>
                </a>
              </li>
            )}
            {youtube && (
              <li>
                <a 
                  href={youtube} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200"
                >
                  <i className="fab fa-youtube text-xs text-white"></i>
                </a>
              </li>
            )}
            {instagram && (
              <li>
                <a 
                  href={instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src="/images/insta.png"
                    alt="Instagram"
                    width={20}
                    height={20}
                    loading="lazy"
                    className="w-5 h-5 object-contain"
                  />
                </a>
              </li>
            )}
            {telegram && (
              <li>
                <a 
                  href={telegram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                >
                  <i className="fab fa-telegram-plane text-xs text-white"></i>
                </a>
              </li>
            )}
            {eitaa && (
              <li>
                <a 
                  href={eitaa} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src="/images/eita.png"
                    alt="Eitaa"
                    width={20}
                    height={20}
                    loading="lazy"
                    className="w-5 h-5 object-contain"
                  />
                </a>
              </li>
            )}
          </ul>

          {/* Contact Info - Right side */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 order-1">
            {/* Mobile: Phone numbers from both clinics */}
            <div className="flex md:hidden items-center gap-2 sm:gap-3 text-xs sm:text-sm leading-none flex-wrap">
              {firstClinicPhone && (
                <div className="flex items-center gap-1.5">
                  <i className="fas fa-phone-alt text-[10px]"></i>
                  <a href={`tel:${firstClinicPhone}`} className="leading-none whitespace-nowrap font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                    {firstClinicPhone}
                  </a>
                </div>
              )}
              {secondClinicPhone && (
                <>
                  <span className="opacity-60">|</span>
                  <div className="flex items-center gap-1.5">
                    <i className="fas fa-phone-alt text-[10px]"></i>
                    <a href={`tel:${secondClinicPhone}`} className="leading-none whitespace-nowrap font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                      {secondClinicPhone}
                    </a>
                  </div>
                </>
              )}
              {!firstClinicPhone && !secondClinicPhone && fallbackPhone && (
                <div className="flex items-center gap-1.5">
                  <i className="fas fa-phone-alt text-[10px]"></i>
                  <a href={`tel:${fallbackPhone}`} className="leading-none whitespace-nowrap font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                    {fallbackPhone}
                  </a>
                </div>
              )}
            </div>
            
            {/* Desktop: Phone numbers, Email, Address */}
            <ul className="hidden md:flex flex-wrap gap-3 lg:gap-4 text-xs sm:text-sm leading-none items-center">
              {firstClinicPhone && (
                <li className="flex items-center gap-1.5">
                  <i className="fas fa-phone-alt text-[10px]"></i>
                  <a href={`tel:${firstClinicPhone}`} className="leading-none hover:text-white/80 transition-colors font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                    {firstClinicPhone}
                  </a>
                </li>
              )}
              {secondClinicPhone && (
                <li className="flex items-center gap-1.5">
                  <i className="fas fa-phone-alt text-[10px]"></i>
                  <a href={`tel:${secondClinicPhone}`} className="leading-none hover:text-white/80 transition-colors font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                    {secondClinicPhone}
                  </a>
                </li>
              )}
              {!firstClinicPhone && !secondClinicPhone && fallbackPhone && (
                <li className="flex items-center gap-1.5">
                  <i className="fas fa-phone-alt text-[10px]"></i>
                  <a href={`tel:${fallbackPhone}`} className="leading-none hover:text-white/80 transition-colors font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                    {fallbackPhone}
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
        </div>
      </div>
    </section>
  )
}

export default Topbar

