/**
 * Helper functions for generating JSON-LD structured data
 * This improves SEO and enables Rich Results in Google Search
 */

export interface MedicalBusinessData {
  name: string;
  description: string;
  url: string;
  image?: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
}

export interface ArticleData {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo?: {
      url: string;
      width?: number;
      height?: number;
    };
  };
}

export interface DoctorData {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  url: string;
  worksFor?: {
    name: string;
    url: string;
  };
  specialty?: string[];
}

export interface ServiceData {
  name: string;
  description: string;
  image?: string;
  url: string;
  provider: {
    name: string;
    url: string;
  };
  areaServed?: string;
  serviceType?: string;
}

/**
 * Generate MedicalBusiness structured data for homepage
 */
export const generateMedicalBusinessSchema = (data: MedicalBusinessData) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: data.name,
    description: data.description,
    url: data.url,
  };

  if (data.image) {
    schema.image = data.image;
  }

  if (data.telephone) {
    schema.telephone = data.telephone;
  }

  if (data.address) {
    schema.address = {
      "@type": "PostalAddress",
      ...data.address,
    };
  }

  if (data.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    };
  }

  if (data.openingHours && data.openingHours.length > 0) {
    schema.openingHoursSpecification = data.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours,
    }));
  }

  if (data.priceRange) {
    schema.priceRange = data.priceRange;
  }

  return schema;
};

/**
 * Generate Article structured data for blog posts
 */
export const generateArticleSchema = (data: ArticleData) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    datePublished: data.datePublished,
  };

  if (data.image) {
    schema.image = data.image;
  }

  if (data.dateModified) {
    schema.dateModified = data.dateModified;
  }

  schema.author = {
    "@type": "Person",
    name: data.author.name,
  };

  if (data.author.url) {
    schema.author.url = data.author.url;
  }

  schema.publisher = {
    "@type": "Organization",
    name: data.publisher.name,
  };

  if (data.publisher.logo) {
    schema.publisher.logo = {
      "@type": "ImageObject",
      url: data.publisher.logo.url,
    };

    if (data.publisher.logo.width) {
      schema.publisher.logo.width = data.publisher.logo.width;
    }

    if (data.publisher.logo.height) {
      schema.publisher.logo.height = data.publisher.logo.height;
    }
  }

  return schema;
};

/**
 * Generate Person/Doctor structured data for doctor pages
 */
export const generateDoctorSchema = (data: DoctorData) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    jobTitle: data.jobTitle,
    url: data.url,
  };

  if (data.description) {
    schema.description = data.description;
  }

  if (data.image) {
    schema.image = data.image;
  }

  if (data.specialty && data.specialty.length > 0) {
    schema.hasCredential = data.specialty.map((spec) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: spec,
    }));
  }

  if (data.worksFor) {
    schema.worksFor = {
      "@type": "Dentist",
      name: data.worksFor.name,
      url: data.worksFor.url,
    };
  }

  return schema;
};

/**
 * Generate Service structured data for service pages
 */
export const generateServiceSchema = (data: ServiceData) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    url: data.url,
    provider: {
      "@type": "Dentist",
      name: data.provider.name,
      url: data.provider.url,
    },
  };

  if (data.image) {
    schema.image = data.image;
  }

  if (data.areaServed) {
    schema.areaServed = {
      "@type": "Country",
      name: data.areaServed,
    };
  }

  if (data.serviceType) {
    schema.serviceType = data.serviceType;
  }

  return schema;
};

