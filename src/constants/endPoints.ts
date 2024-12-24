export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  Login: `${API_BASE_URL}/auth/login`,
  changePassword: `${API_BASE_URL}/auth/changePassword`,
  activeServiceProviders: `${API_BASE_URL}/admin/getFreelancers?page=0&size=15&type=0`,
  inactiveServiceProviders: `${API_BASE_URL}/admin/getFreelancers?page=0&size=15&type=1`,
};
