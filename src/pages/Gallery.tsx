import React, { useState } from "react";
import { Camera, Image, Star, Eye, Filter, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Play, Users, Clock, Award } from "lucide-react";
import eventSetup from "@/assets/event-setup.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [imageDetails, setImageDetails] = useState<{category: string, alt: string} | null>(null);

  const images = [
    { src: eventSetup, alt: "Elegant event setup with decorated tables", category: "Events", featured: true, size: "large" },
    { src: eventSetup, alt: "Wedding reception venue", category: "Weddings", featured: false, size: "normal" },
    { src: eventSetup, alt: "Corporate event catering", category: "Corporate", featured: false, size: "normal" },
    { src: eventSetup, alt: "Buffet presentation", category: "Food", featured: true, size: "wide" },
    { src: eventSetup, alt: "Dessert table display", category: "Desserts", featured: false, size: "normal" },
    { src: eventSetup, alt: "Cocktail hour setup", category: "Events", featured: false, size: "normal" },
    { src: eventSetup, alt: "Birthday celebration", category: "Private", featured: false, size: "normal" },
    { src: eventSetup, alt: "Gourmet plating", category: "Food", featured: true, size: "tall" },
    { src: eventSetup, alt: "Garden party setup", category: "Events", featured: false, size: "normal" },
  ];

  const categories = ["All", "Events", "Weddings", "Corporate", "Food", "Desserts", "Private"];

  const filteredImages = activeFilter === "All" ? images : images.filter(img => img.category === activeFilter);

  // Navigation functions
  const handlePrevious = () => {
    if (selectedImageIndex > 0) {
      const newIndex = selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(filteredImages[newIndex].src);
      setImageDetails({ category: filteredImages[newIndex].category, alt: filteredImages[newIndex].alt });
    }
  };

  const handleNext = () => {
    if (selectedImageIndex < filteredImages.length - 1) {
      const newIndex = selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(filteredImages[newIndex].src);
      setImageDetails({ category: filteredImages[newIndex].category, alt: filteredImages[newIndex].alt });
    }
  };

  const handleImageClick = (imageSrc: string, index: number) => {
    setSelectedImage(imageSrc);
    setSelectedImageIndex(index);
    const image = filteredImages[index];
    setImageDetails({ category: image.category, alt: image.alt });
    setIsZoomed(false);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (event.key) {
        case "Escape":
          setSelectedImage(null);
          setSelectedImageIndex(-1);
          setImageDetails(null);
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case " ":
          event.preventDefault();
          setIsZoomed(!isZoomed);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, selectedImageIndex, isZoomed]);

  return (
    <div className="min-h-screen pt-[120px]">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={eventSetup}
            alt="Event Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        {/* Content */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-2 mb-8 animate-fade-in">
              <Camera className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Visual Stories</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-slide-in-up">
              Gallery
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 max-w-3xl mx-auto leading-relaxed opacity-95 animate-slide-in-up delay-200">
              A visual journey through our culinary creations, elegant events, and memorable experiences
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-90 leading-relaxed animate-slide-in-up delay-400">
              Explore our portfolio of stunning presentations, intricate food styling, and beautifully orchestrated events that showcase our commitment to excellence and attention to detail.
            </p>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in delay-600">
              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Eye className="h-5 w-5 inline mr-2" />
                Explore Gallery
              </button>
              <button className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                <Image className="h-5 w-5 inline mr-2" />
                Request Portfolio
              </button>
            </div>

            {/* Gallery Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-primary-foreground/20 animate-fade-in delay-800">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm md:text-base opacity-80">Event Photos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">8</div>
                <div className="text-sm md:text-base opacity-80">Event Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">1000+</div>
                <div className="text-sm md:text-base opacity-80">Dishes Featured</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">24/7</div>
                <div className="text-sm md:text-base opacity-80">New Additions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-foreground/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-32 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3 mb-6">
              <Camera className="h-5 w-5 text-accent" />
              <span className="text-sm font-semibold text-accent">Visual Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Our Gallery
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
              Explore our stunning portfolio of events, culinary creations, and memorable moments
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? "bg-accent text-accent-foreground shadow-lg"
                      : "bg-muted/50 text-muted-foreground hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredImages.length} of {images.length} images
              </p>
            </div>
          </div>

          {/* Enhanced Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl card-shadow hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl ${
                  image.featured ? "md:col-span-2 md:row-span-2" : ""
                } ${
                  image.size === "wide" ? "md:col-span-2" : ""
                } ${
                  image.size === "tall" ? "md:row-span-2" : ""
                }`}
                onClick={() => handleImageClick(image.src, index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full object-cover transition-all duration-500 group-hover:scale-110 ${
                    image.size === "tall" ? "h-96 md:h-[500px]" : "h-64 md:h-80"
                  }`}
                />
                
                {/* Enhanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-3 py-1 text-xs font-medium">
                        <Star className="h-3 w-3" />
                        {image.category}
                      </span>
                      {image.featured && (
                        <span className="inline-flex items-center gap-1 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full px-3 py-1 text-xs font-medium text-yellow-300">
                          <Award className="h-3 w-3" />
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">{image.alt}</h3>
                    <div className="flex items-center gap-4 text-sm opacity-80">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        View Details
                      </span>
                      <span className="flex items-center gap-1">
                        <ZoomIn className="h-4 w-4" />
                        Zoom
                      </span>
                    </div>
                  </div>
                  
                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ZoomIn className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Featured Badge */}
                {image.featured && (
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-8 h-8 bg-yellow-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <Image className="h-5 w-5 inline mr-2" />
              Load More Images
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            setSelectedImage(null);
            setSelectedImageIndex(-1);
            setImageDetails(null);
            setIsZoomed(false);
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-60 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
                setSelectedImageIndex(-1);
                setImageDetails(null);
                setIsZoomed(false);
              }}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            {selectedImageIndex > 0 && (
              <button
                className="absolute left-6 top-1/2 transform -translate-y-1/2 z-60 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {selectedImageIndex < filteredImages.length - 1 && (
              <button
                className="absolute right-6 top-1/2 transform -translate-y-1/2 z-60 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* Zoom Controls */}
            <div className="absolute top-6 left-6 z-60 flex gap-3">
              <button
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
              >
                {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
              </button>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-60">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                {selectedImageIndex + 1} / {filteredImages.length}
              </div>
            </div>

            {/* Main Image */}
            <img
              src={selectedImage}
              alt={imageDetails?.alt || "Gallery image"}
              className={`max-w-full max-h-full object-contain transition-all duration-500 cursor-zoom-${
                isZoomed ? "out" : "in"
              } ${isZoomed ? "scale-150 cursor-move" : "scale-100"}`}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

            {/* Image Details */}
            {imageDetails && (
              <div className="absolute bottom-20 left-6 right-6 z-60">
                <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-2 text-sm font-medium">
                      <Star className="h-4 w-4" />
                      {imageDetails.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{imageDetails.alt}</h3>
                  <div className="flex items-center gap-6 text-sm opacity-80">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      High Resolution
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Professional Quality
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Keyboard Shortcuts Help */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-60">
              <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 text-white text-xs opacity-60">
                Press ESC to close • ← → to navigate • Space to zoom
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
