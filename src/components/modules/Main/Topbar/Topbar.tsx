import { useGetSettings } from '../../../../services/useSettings'
import { useGetAllClinics } from '../../../../services/useClinics'
import { useClinicSelection } from '../../../../contexts/useClinicSelection'

function Topbar() {
  const { data: settingsData } = useGetSettings()
  const { data: clinicsData } = useGetAllClinics(1, 100)
  const { selectedClinic, openModal: openClinicModal } = useClinicSelection()
  const settings = settingsData?.data?.settings
  
  const clinics = clinicsData?.data?.clinics || []
  // Get the first clinic (oldest - first created) as fallback
  const sortedClinics = [...clinics].sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
  const firstClinic = sortedClinics[0] || null;

  // اگر کلینیکی انتخاب شده، از اطلاعات آن استفاده کن؛ در غیر این صورت fallback قدیمی
  const activeClinic = selectedClinic || firstClinic;

  // Get phone numbers from clinic - handle JSON string, array, or string with separator
  const getPhoneNumbersFromString = (phoneStr: string | string[] | undefined): string[] => {
    if (!phoneStr) return [];
    if (Array.isArray(phoneStr)) return phoneStr.filter(p => p && p.trim());
    
    if (typeof phoneStr === 'string') {
      const trimmed = phoneStr.trim();
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            return parsed.filter(p => p && String(p).trim()).map(p => String(p).trim());
          }
        } catch {
          // If JSON parse fails, continue to separator splitting
        }
      }
      return trimmed.split(/[,|;|\n]/).map(p => p.trim()).filter(p => p);
    }
    
    return [];
  };
  
  const activeClinicPhones = getPhoneNumbersFromString(activeClinic?.phoneNumber);
  
  // Fallback to settings if no clinic phone numbers
  const fallbackPhone = settings?.phoneNumber || '123456789'
  
  const email = settings?.email
  const address = activeClinic?.address || settings?.address || 'شیراز. خیابان نیایش. ساختمان پزشکان'
  
  // Social media links from settings
  const facebook = settings?.facebook
  const twitter = settings?.twitter
  const youtube = settings?.youtube
  const instagram = settings?.instagram
  const telegram = settings?.telegram
  const eitaa = settings?.eitaa

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-accent via-accent/85 via-primary/85 to-primary text-white h-[32px] flex items-center">
      <div className="container mx-auto px-3 sm:px-4 relative z-10 w-full">
        <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-3">
          {/* Social Media - Left side (mobile and desktop) */}
          <ul className="flex flex-wrap gap-2 sm:gap-2.5 xl:gap-3 items-center order-2">
            {facebook && (
              <li>
                <a 
                  href={facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                >
                  <i className="fab fa-facebook-f text-sm text-white"></i>
                </a>
              </li>
            )}
            {twitter && (
              <li>
                <a 
                  href={twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-400 hover:bg-blue-500 transition-all duration-200"
                >
                  <i className="fab fa-twitter text-sm text-white"></i>
                </a>
              </li>
            )}
            {youtube && (
              <li>
                <a 
                  href={youtube} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200"
                >
                  <i className="fab fa-youtube text-sm text-white"></i>
                </a>
              </li>
            )}
            {instagram && (
              <li>
                <a 
                  href={instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-6 h-6 hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src="/images/insta.png"
                    alt="Instagram"
                    width={24}
                    height={24}
                    loading="lazy"
                    className="w-6 h-6 object-contain"
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
                  className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                >
                  <i className="fab fa-telegram-plane text-sm text-white"></i>
                </a>
              </li>
            )}
            {eitaa && (
              <li>
                <a 
                  href={eitaa} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-6 h-6 hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src="/images/eita.png"
                    alt="Eitaa"
                    width={25}
                    height={25}
                    loading="lazy"
                    className="w-6 h-6 object-contain"
                  />
                </a>
              </li>
            )}
          </ul>

          {/* Contact Info - Right side */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 order-1">
            {/* Mobile: Phone numbers from active clinic */}
            <div className="flex md:hidden items-center gap-2 sm:gap-3 text-xs sm:text-sm leading-none flex-wrap">
              {activeClinicPhones.length > 0 ? (
                <>
                  <i className="fas fa-phone-alt text-[10px]"></i>
                  {activeClinicPhones.map((phone, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      {index > 0 && <span className="opacity-60">|</span>}
                      <a href={`tel:${phone}`} className="leading-none whitespace-nowrap font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                        {phone}
                      </a>
                    </div>
                  ))}
                </>
              ) : fallbackPhone ? (
                <div className="flex items-center gap-1.5">
                  <i className="fas fa-phone-alt text-[10px]"></i>
                  <a href={`tel:${fallbackPhone}`} className="leading-none whitespace-nowrap font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                    {fallbackPhone}
                  </a>
                </div>
              ) : null}
            </div>
            
            {/* Desktop: Phone numbers, Email, Address */}
            <ul className="hidden md:flex flex-wrap gap-3 lg:gap-4 text-xs sm:text-sm leading-none items-center">
              {activeClinicPhones.length > 0 ? (
                <li className="flex items-center gap-1.5">
                  <i className="fas fa-phone-alt text-[10px]"></i>
                  {activeClinicPhones.map((phone, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      {index > 0 && <span className="opacity-60">|</span>}
                      <a href={`tel:${phone}`} className="leading-none hover:text-white/80 transition-colors font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                        {phone}
                      </a>
                    </div>
                  ))}
                </li>
              ) : fallbackPhone ? (
                <li className="flex items-center gap-1.5">
                  <i className="fas fa-phone-alt text-[10px]"></i>
                  <a href={`tel:${fallbackPhone}`} className="leading-none hover:text-white/80 transition-colors font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                    {fallbackPhone}
                  </a>
                </li>
              ) : null}
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

            {/* Clinic switch badge */}
            {selectedClinic && (
              <button
                onClick={openClinicModal}
                className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 transition-all duration-200 text-[11px] leading-none cursor-pointer border border-white/20"
                title="تغییر کلینیک"
              >
                <i className="fas fa-clinic-medical text-[9px]"></i>
                <span className="font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>{selectedClinic.name}</span>
                <i className="fas fa-exchange-alt text-[8px] opacity-70"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Topbar

