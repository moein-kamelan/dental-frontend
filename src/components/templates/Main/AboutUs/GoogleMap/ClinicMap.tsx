import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/images/leaflet/marker-icon.png",
  shadowUrl: "/images/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface Clinic {
  id: string;
  name: string;
  slug: string;
  address: string;
  phoneNumber: string;
  description: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  _count: {
    doctors: number;
  };
}

interface ClinicProps {
  clinics?: Clinic[];
}

function ClinicMap({ clinics }: ClinicProps) {
  console.log(clinics);

  // اگر داده‌ای نباشد یا آرایه خالی باشد، یک موقعیت پیش‌فرض استفاده می‌کنیم
  const defaultPosition: [number, number] = [35.6892, 51.389]; // تهران

  // اولین کلینیک را برای نمایش انتخاب می‌کنیم
  const clinic = clinics && clinics.length > 0 ? clinics[0] : null;
  const position: [number, number] = clinic
    ? [clinic.latitude, clinic.longitude]
    : defaultPosition;

  return (
    <section className="pt-8 pb-40">
      <div className="px-4">
        <div className="relative z-20">
          <MapContainer
            className="w-full h-[500px] rounded-2xl shadow-lg z-10"
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
            <div className="bg-white/95 backdrop-blur-lg border border-zinc-200 items-start rounded-xl p-4 w-[380px] max-w-[90%] right-4 -bottom-32 flex flex-col gap-2 shadow-xl absolute z-50 hover:shadow-2xl transition-all duration-300">
              {/* Clinic Name */}
              <h3 className="font-bold text-lg text-zinc-800 w-full">
                {clinic.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2">
                {clinic.description}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-zinc-200 my-1"></div>

              {/* Address with Icon */}
              <div className="flex items-start gap-2 w-full">
                <svg
                  className="w-4 h-4 text-blue-500 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-xs text-zinc-600 flex-1">{clinic.address}</p>
              </div>

              {/* Phone with Icon */}
              <div className="flex items-center gap-2 w-full">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-semibold text-zinc-700 text-sm">
                  {clinic.phoneNumber}
                </span>
              </div>

              {/* Link Button */}
              <Link
                to={`/clinics/${clinic.slug}`}
                className="mt-2 w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold text-center shadow-md hover:shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
              >
                مشاهده جزئیات
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ClinicMap;
