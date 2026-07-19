export interface UserProfile {
  isAuthenticated: boolean;
  username: string;
  email: string;
  roles: string[]; // e.g., ['PBM_Admin', 'Pharmacist', 'Patient']
}
