export enum CategoryStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ARCHIVED = "archived",
}

export interface ICategory {
  title: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  status: CategoryStatus;
}
