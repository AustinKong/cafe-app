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
  emailAddress: string;
  phoneNumber: string;
  daysWorked: number;
  cafe: string;
}