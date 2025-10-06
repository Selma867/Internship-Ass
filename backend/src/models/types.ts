export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface User {
  id?: number;
  personalInfo: PersonalInfo;
  residentialAddress: Address;
  postalAddress: Address;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserResponse {
  success: boolean;
  data?: User;
  message?: string;
  error?: string;
}

export interface UsersResponse {
  success: boolean;
  data?: User[];
  message?: string;
  error?: string;
}
