export interface CafeListItem {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  location: string;
  employees: number;
}

export interface EmployeeListItem {
  id: string;
  name: string;
  email_address: string;
  phone_number: string;
  days_worked: number;
  cafe: string;
}