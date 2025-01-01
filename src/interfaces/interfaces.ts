import { Key } from "react";

interface UserDto {
  id: number;
  nameEn: string;
  nameAr: string;
  email: string;
  mobile: string;
  identificationNumber: string;
  userType: string;
  agreementAccept: number;
  createdOn: string;
  identityTyNameAr: string;
  identityTyNameEn: string;
  identificationTypeId: string;
  identityId: number;
}

interface BrandWalletDto {
  deductionPrs: number | null;
}
export interface FreelancerData {
  brandId: number;
  userDto: UserDto;
  brandWalletDto: BrandWalletDto;
  identityId: number;
}
export interface UserCardProps {
  user: FreelancerData;
  isInactive: boolean;
  onActivate: (userId: number) => void;
  onDeactivate: (userId: number) => void;
}
export interface ModalProps {
  isOpen: boolean;
  titleKey: string; // Key for the title
  descriptionKey: string; // Key for the description
  onConfirm: () => void;
  onCancel: () => void;
}
export interface IdentificationType {
  id: number;
  identityTyNameEn: string;
  identityTyNameAr: string;
}

export interface FormData {
  id?: number;
  nameAr: string;
  nameEn: string;
  identificationTypeId: string;
  identificationNumber: string;
  mobileNumber: string;
  email: string;
  deductionPrs: number;
  identityId: number;
}

export interface Discount {
  discountId: number;
  discountCode: string;
  status: number;
  discountType: "AMOUNT" | "PERCENTAGE";
  discountAmount: number;
  startDate: string;
  endDate: string;
  createdOn: string;
  freelancer: string | null;
}

export interface DiscountFormInputs {
  discountCode: string;
  discountType: "AMOUNT" | "PERCENTAGE";
  discountAmount: number;
  startDate: string;
  endDate: string;
  brandMail: string;
}

export interface CouponModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export interface CouponCardProps {
  discount: Discount;
  handleOpenDeleteModal: () => void;
}

export interface Order {
  invoiceId: number;
  brandId: number;
  userPhoneNumber: string;
  latitude: number | string | null;
  longitude: number | string | null;
  brandNameAr: string;
  brandNameEn: string;
  userNameAr: string;
  userNameEn: string;
  totalAmount: number;
  reservationDate: string;
  status: string;
  discountAmount: number;
  dueAmount: number;
  reviewed: boolean;
  fromTime: string;
  timeTo: string;
  request: {
    id: number;
    requestCodeId: number;
    createdOn: string;
    waitingProcessId: number;
    status: number;
    statusName: string;
    requestTypeNameAr: string;
    requestTypeNameEn: string;
    cancellation: boolean;
  };
  itemDto: Record<string, unknown>;
}

export interface User {
  id: number;
  username: string;
  email: string;
  nameAr: string;
  nameEn: string;
  mobile: string;
}

export interface Request {
  id: number;
  user: User;
  requestId: number;
  statusName: string;
}

export interface ServiceRequest {
  createdOn: string;
  user: string;
  servicesDescriptionsAr: string;
  servicesDescriptionsEn: string;
  id: Key | null | undefined;
  serviceTempId: number;
  servicesNameAr: string;
  servicesNameEn: string;
  servicesPrice: number;
  request: Request;
}

interface RequestDetails {
  id: number;
  requestCodeId: number;
  createdOn: string;
  waitingProcessId: number;
  status: number;
  statusName: string;
  requestTypeNameAr: string;
  requestTypeNameEn: string;
  cancellation: boolean;
}

export interface ClosedService {
  serviceId: number;
  brandId: number;
  brandNameAr: string;
  brandNameEn: string;
  servicesNameAr: string;
  servicesNameEn: string;
  servicesDescriptionsAr: string;
  servicesDescriptionsEn: string;
  servicesPrice: number | null;
  servicesTypeId: number;
  serviceTypeNameAr: string;
  serviceTypeNameEn: string;
  identificationTypeId: string;
  servicesStatus: number | null;
  createdOn: string | null;
  lastUpdatedOn: string | null;
  request: RequestDetails;
  serviceImages: { url: string; description: string }[] | null;
  extraServices: { id: number; name: string; price: number }[] | null;
}

export interface ClosedServiceCardProps {
  service: ClosedService;
}
