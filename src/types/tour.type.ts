/* eslint-disable @typescript-eslint/no-explicit-any */


export interface ITourPayload {
  title: string
  description: string
  images: any[]
  deleteImages: any[]
  included: any[]
  excluded: any[]
  amenities: any[]
  tourPlan: any[]
  division: string
  tourType: string
  _id: string
  createdAt: string
  updatedAt: string
  slug: string
}


export interface ITourPackage {
  _id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  arrivalLocation: string;
  departureLocation: string;
  location: string;
  description: string;
  costFrom: number;
  maxGuest: number;
  minAge: number;
  division: string;
  tourType: string;
  amenities: string[];
  included: string[];
  excluded: string[];
  tourPlan: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}