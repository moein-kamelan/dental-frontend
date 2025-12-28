import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Clinic } from "../../../../../types/types";

const customIcon = new L.Icon({
  iconUrl: "/images/leaflet/marker-icon.png",
  shadowUrl: "/images/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface ClinicProps {
  clinic?: Clinic;
}

function ClinicMap({ clinic }: ClinicProps) {
  // Check if clinic has valid coordinates, otherwise use default
  const hasValidCoordinates = clinic?.latitude != null && clinic?.longitude != null;
  const position: [number, number] = hasValidCoordinates
    ? [clinic.latitude!, clinic.longitude!]
    : [35.6892, 51.389];
  return (
    <div className="relative h-full min-h-[400px]">
      <div className="relative z-20 h-full flex flex-col">
          <MapContainer
          className="w-full h-full min-h-[370px] rounded-t-2xl z-10 flex-1"
            center={position}
            zoom={15}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
              <Popup>{clinic?.name || "کلینیک دندانپزشکی"}</Popup>
            </Marker>
          </MapContainer>

           {clinic && (
          <div className="bg-white rounded-b-2xl border-t-0 border border-gray-200 p-5 flex flex-col gap-3 shadow-sm">
              {/* Clinic Name */}
            <h3 className="font-estedad-bold text-lg text-dark mb-1">
                {clinic.name}
              </h3>

              {/* Description */}
            {clinic.description && (
              <p className="text-sm text-paragray leading-relaxed line-clamp-2 mb-3">
                {clinic.description}
              </p>
            )}

              {/* Divider */}
            <div className="w-full h-px bg-gray-200 my-2"></div>

              {/* Address with Icon */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <i className="fas fa-map-marker-alt text-blue-500 text-sm"></i>
              </div>
              <p className="text-sm text-paragray flex-1 leading-relaxed">
                {clinic.address}
              </p>
              </div>

              {/* Phone with Icon - List format */}
            <div className="flex flex-col gap-2">
              {(() => {
                // Parse phone numbers from string (handle JSON string, array, or string with separator)
                const getPhoneNumbers = (phoneStr: string | string[] | undefined): string[] => {
                  if (!phoneStr) return [];
                  if (Array.isArray(phoneStr)) return phoneStr.filter(p => p && p.trim());
                  
                  // Try to parse as JSON first (in case it's stored as JSON string)
                  if (typeof phoneStr === 'string') {
                    // Check if it looks like a JSON array
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
                    // Split by common separators: comma, pipe, semicolon, or newline
                    return trimmed.split(/[,|;|\n]/).map(p => p.trim()).filter(p => p);
                  }
                  
                  return [];
                };
                
                const phoneNumbers = getPhoneNumbers(clinic.phoneNumber);
                
                return phoneNumbers.length > 0 ? (
                  phoneNumbers.map((phone, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                        <i className="fas fa-phone text-green-500 text-sm"></i>
                      </div>
                      <a href={`tel:${phone}`} className="font-estedad-medium text-dark text-sm hover:text-primary transition-colors">
                        {phone}
                      </a>
                    </div>
                  ))
                ) : null;
              })()}
            </div>

              {/* Navigation Button */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full main-btn group/btn relative flex items-center justify-center"
              >
                <span className="group-hover/btn:translate-x-1 transition-all duration-200">مسیریابی روی نقشه</span>
                <i className="fas fa-route absolute left-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 -translate-x-2 transition-all duration-200 text-sm"></i>
              </a>
            </div>
          )}
        </div>
      </div>
  );
}

export default ClinicMap;
