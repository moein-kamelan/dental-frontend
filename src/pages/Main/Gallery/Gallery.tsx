import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import SEO from "../../../components/SEO/SEO";
import { useGetAllGallery } from "../../../services/useGallery";
import MainPagination from "../../../components/modules/MainPagination/MainPagination";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import EmptyState from "../../../components/modules/Main/EmptyState/EmptyState";
import { getImageUrl } from "../../../utils/helpers";
import type { Gallery } from "../../../types/types";

function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);

  // خواندن مقادیر از URL
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  const { data: galleryData, isLoading } = useGetAllGallery(
    page,
    limit,
    true // فقط تصاویر منتشر شده
  );

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      page: newPage.toString(),
      limit: limit.toString(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const images = galleryData?.data?.images || [];
  const hasImages = images.length > 0;

  // Debug: Log images data
  useEffect(() => {
    if (galleryData?.data?.images) {
      console.log("Gallery images:", galleryData.data.images);
      galleryData.data.images.forEach((img: Gallery, index: number) => {
        const imageUrl = img.image ? getImageUrl(img.image) : "NO IMAGE";
        console.log(`Image ${index + 1}:`, {
          id: img.id,
          title: img.title,
          image: img.image,
          imageUrl: imageUrl,
          hasImage: !!img.image,
          imageType: typeof img.image,
        });
        // Test if image URL is accessible
        if (img.image) {
          const testImg = new Image();
          testImg.onload = () => console.log(`✅ Image ${index + 1} loaded successfully:`, imageUrl);
          testImg.onerror = () => console.error(`❌ Image ${index + 1} failed to load:`, imageUrl);
          testImg.src = imageUrl;
        }
      });
    }
  }, [galleryData]);

  const handleImageClick = (image: Gallery) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // بستن modal با کلید Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        handleCloseModal();
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <>
      <SEO
        title="گالری تصاویر - کلینیک دندان پزشکی طاها"
        description="گالری تصاویر کلینیک دندان پزشکی طاها - مشاهده تصاویر محیط کلینیک، تجهیزات و نمونه کارهای انجام شده"
        keywords="گالری, تصاویر کلینیک, محیط کلینیک, تجهیزات دندانپزشکی, کلینیک طاها"
        url="/gallery"
      />
      <Breadcrumb />

      <section className="pt-6 pb-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <LoadingState text="در حال بارگذاری تصاویر..." />
          ) : hasImages ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image: Gallery) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer h-[300px] overflow-hidden rounded-2xl"
                    onClick={() => handleImageClick(image)}
                  >
                    {image.image ? (
                      <img
                        src={getImageUrl(image.image)}
                        alt={image.title || "تصویر گالری"}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                                <i class="far fa-image text-gray-400 text-4xl"></i>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <i className="far fa-image text-gray-400 text-4xl"></i>
                      </div>
                    )}
                    {image.title && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white font-estedad-medium text-sm line-clamp-2">
                          {image.title}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {galleryData?.meta && galleryData.meta.totalPages > 1 && (
                <div className="mt-12">
                  <MainPagination
                    meta={galleryData.meta}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon="far fa-image"
              title="هیچ تصویری یافت نشد"
              description="در حال حاضر هیچ تصویری در گالری منتشر نشده است. لطفاً بعداً مراجعه کنید."
            />
          )}
        </div>
      </section>

      {/* Modal برای نمایش تصویر بزرگتر */}
      <AnimatePresence mode="wait">
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={handleCloseModal}
                className="absolute top-5 left-5 z-20 flex items-center justify-center w-9 h-9 rounded-lg bg-white/80 backdrop-blur-md border border-gray-200/50 hover:bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-200 group"
                aria-label="بستن"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <i className="fas fa-times text-sm text-gray-600 group-hover:text-gray-800 transition-colors"></i>
              </motion.button>

              {/* Image */}
              <div className="w-full h-[80vh] flex items-center justify-center bg-gray-100">
                {selectedImage.image ? (
                  <img
                    src={getImageUrl(selectedImage.image)}
                    alt={selectedImage.title || "تصویر گالری"}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <i className="far fa-image text-6xl mb-4"></i>
                    <p>تصویر یافت نشد</p>
                  </div>
                )}
              </div>

              {/* Title and Description */}
              {(selectedImage.title || selectedImage.description) && (
                <div className="p-6 bg-white border-t">
                  {selectedImage.title && (
                    <h3 className="text-xl font-estedad-bold text-dark mb-2">
                      {selectedImage.title}
                    </h3>
                  )}
                  {selectedImage.description && (
                    <p className="text-paragray font-estedad-light leading-relaxed">
                      {selectedImage.description}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Gallery;
