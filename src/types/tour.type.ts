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
