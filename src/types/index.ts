 
export interface IResponse<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
}

export interface ISidebarItem {
  title: string;
  url: string;
  Component: React.ComponentType;
};

export interface ISidebarItemsArray  {
  title: string;
  items: ISidebarItem[];
};

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";
