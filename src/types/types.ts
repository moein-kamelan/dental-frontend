export type OptionType = {
  value: string;
  label: string;
};

export interface Clinic {
  id: string;
  name: string;
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

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  beforeTreatmentTips?: string;
  afterTreatmentTips?: string;
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
  published: boolean;
  categories?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
