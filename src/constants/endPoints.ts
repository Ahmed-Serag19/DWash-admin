const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const endpoints = {
  Login: `${API_BASE_URL}/auth/login`,
  changePassword: `${API_BASE_URL}/auth/changePassword`,
};
