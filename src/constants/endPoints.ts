export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  Login: `${API_BASE_URL}/auth/login`,
  changePassword: `${API_BASE_URL}/auth/changePassword`,
  activeServiceProviders: (page: number, size: number) =>
    `${API_BASE_URL}/admin/getFreelancers?page=${page}&size=${size}&type=0`,
  inactiveServiceProviders: (page: number, size: number) =>
    `${API_BASE_URL}/admin/getFreelancers?page=${page}&size=${size}&type=1`,
  getIdentificationTypes: `${API_BASE_URL}/admin/getIdentificationTypes`,

  addServiceProvider: `${API_BASE_URL}/admin/addFreelancer`,
  activateServiceProvider: (id: number) =>
    `${API_BASE_URL}/admin/activateFreelancer?userId=${id}`,
  deactivateServiceProvider: (id: number) =>
    `${API_BASE_URL}/admin/deactivateFreelancer?userId=${id}`,
  editServiceProvider: (id: number) =>
    `${API_BASE_URL}/admin/editFreelancer?userId=${id}`,

  addDiscount: `${API_BASE_URL}/request/admin/addDiscount`,
  getDiscounts: `${API_BASE_URL}/request/admin/getDiscount`,
  deleteDiscount: (id: number) =>
    `${API_BASE_URL}/request/admin/deleteDiscount?discountId=${id}`,

  getOrders: (page: number, size: number) =>
    `${API_BASE_URL}/request/admin/getPendingOrders?page=${page}&size=${size}`,
  cancelOrder: (orderId: number) =>
    `${API_BASE_URL}/request/admin/cancelOrder?orderId=${orderId}`,
  completeOrder: (orderId: number) =>
    `${API_BASE_URL}/request/admin/completeOrder?orderId=${orderId}`,
  getWaitingServices: (page: number, size: number) =>
    `${API_BASE_URL}/request/admin/getWaitingServiceRequest?page=${page}&size=${size}`,
  getClosedServices: (page: number, size: number) =>
    `${API_BASE_URL}/request/admin/getClosedServiceRequest?page=${page}&size=${size}`,
  acceptRequest: (id: number) =>
    `${API_BASE_URL}/request/admin/acceptRequest?requestId=${id}`,
  rejectRequest: (id: number) =>
    `${API_BASE_URL}/request/admin/rejectRequest?requestId=${id}`,

  getWaitingBrandRequest: (page: number, size: number) =>
    `${API_BASE_URL}/request/admin/getWaitingBrandRequest?page=${page}&size=${size}`,
  getClosedBrandRequest: (page: number, size: number) =>
    `${API_BASE_URL}/request/admin/getClosedBrandRequest?page=${page}&size=${size}`,
};
