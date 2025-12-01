export type OptionType = {
  value: string;
  label: string;
};

export interface Clinic {
  id: string;
  name: string;
  slug: string;
  address: string;
  phoneNumber: string;
  description?: string;
  latitude?: number | null;
  longitude?: number | null;
  _count?: {
    doctors: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  slug: string;
  profileImage?: string;
  university: string;
  shortDescription?: string;
  biography?: string;
  skills: string[];
  medicalLicenseNo: string;
  clinics?: {
    clinic: Clinic;
  }[];
  workingDays?: Record<string, string | null>;
  _count?: {
    comments: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
  published: boolean;
  _count?: {
    articles: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
  published: boolean;
  _count?: {
    services: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  price?: number;
  durationMinutes?: number;
  coverImage?: string;
  categories?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  author?: string;
  published: boolean;
  categories?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  rating?: number | null;
  published: boolean;
  userId: string;
  parentId?: string | null;
  doctorId?: string | null;
  articleId?: string | null;
  serviceId?: string | null;
  user: {
    firstName: string;
    lastName: string;
  };
  doctor?: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
  article?: {
    id: string;
    title: string;
  } | null;
  service?: {
    id: string;
    title: string;
  } | null;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Gallery {
  id: string;
  title?: string | null;
  description?: string | null;
  image: string;
  order: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  subject?: string | null;
  message: string;
  read: boolean;
  clinicId?: string | null;
  clinic?: {
    id: string;
    name: string;
  } | null;
  createdAt: string;
}

export interface DoctorApplication {
  id: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phoneNumber: string;
  doctorInfo: string;
  documents?: string | null; // JSON array of document paths
  read: boolean;
  clinicId?: string | null;
  clinic?: {
    id: string;
    name: string;
  } | null;
  createdAt: string;
}


export interface Review {
  id: string;
  name: string;
  content: string;
  rating: number;
  profileImage?: string | null;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;

export interface User {
  id: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "SECRETARY" | "PATIENT";
  nationalCode?: string | null;
  address?: string | null;
  gender?: "MALE" | "FEMALE" | "OTHER" | null;
  profileImage?: string | null;
  clinicId?: string | null;
  clinic?: {
    id: string;
    name: string;
  } | null;
  createdAt?: string;
  updatedAt?: string;

}
