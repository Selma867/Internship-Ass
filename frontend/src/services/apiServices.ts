import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

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

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  async registerUser(user: User): Promise<ApiResponse<User>> {
    try {
      const response = await this.client.post<ApiResponse<User>>('/register', user);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || {
          success: false,
          error: 'Network error occurred'
        };
      }
      return {
        success: false,
        error: 'Unexpected error occurred'
      };
    }
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    try {
      const response = await this.client.get<ApiResponse<User>>(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || {
          success: false,
          error: 'Network error occurred'
        };
      }
      return {
        success: false,
        error: 'Unexpected error occurred'
      };
    }
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await this.client.get<ApiResponse<User[]>>('/users');
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || {
          success: false,
          error: 'Network error occurred'
        };
      }
      return {
        success: false,
        error: 'Unexpected error occurred'
      };
    }
  }
}

export const apiService = new ApiService();