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
  cityId?: number;
  districtId?: number;
}

export interface BrandWalletDto {
  walletId?: number;
  iban?: string | null;
  bankAccountNumber?: string | null;
  bankCertificate?: string | null;
  bankId?: number | null;
  bankName?: string | null;
  deductionPrs: number;
  rejectTotalFine?: number | null;
  totalAmount?: number | null;
  transferDate?: string | null;
  updateOn?: string | null;
  userId?: number | null;
}
export interface FreelancerData {
  brandId: number;
  userDto: UserDto;
  brandWalletDto: BrandWalletDto;
  identityId: number;
  cityNameAr: string;
  cityNameEn: string;
}
export interface UserCardProps {
  user: FreelancerData;
  isInactive: boolean;
  onActivate: (id: number) => void;
  onDeactivate: (id: number) => void;
  showWalletInfo?: boolean;
}
export interface ModalProps {
  isOpen: boolean;
  titleKey: string;
  descriptionKey: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export interface IdentificationType {
  id: number;
  identityTyNameEn: string;
  identityTyNameAr: string;
}

export interface FormData {
  nameAr: string;
  nameEn: string;
  identificationTypeId: string;
  identificationNumber: string;
  mobileNumber: string;
  email: string;
  deductionPrs: number;
  identityId: number;
  cityId: number;
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
  status: number;
  createdOn: any;
  id: number;
  user: User;
  requestId: number;
  statusName: string;
}

export interface ServiceRequest {
  extraServices: ExtraService[] | null;
  brandNameEn: string;
  brandNameAr: string;
  serviceId: number;
  serviceImages: { imagePath: string; id: number }[] | null;
  createdOn: string;
  user: string;
  servicesDescriptionsAr: string;
  servicesDescriptionsEn: string;
  id: number | null;
  serviceTempId: number;
  servicesNameAr: string;
  servicesNameEn: string;
  servicesPrice: number;
  request: Request;
}
export interface ExtraService {
  id: number;
  extraNameAr: string;
  extraNameEn: string;
  extraDescriptionsAr: string;
  extraDescriptionsEn: string;
  extraPrice: number;
  name?: string;
  price?: number;
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
  extraServices: ExtraService[] | null;
}
export interface ClosedServiceCardProps {
  service: ClosedService;
}

export interface City {
  cityId: number;
  cityNameAr: string;
  cityNameEn: string;
  cityStatus: number;
}

export interface District {
  districtId: number;
  districtNameAr: string;
  districtNameEn: string;
  districtStatus: number;
  cityId: number;
}

export interface WalletInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletInfo: BrandWalletDto;
}
