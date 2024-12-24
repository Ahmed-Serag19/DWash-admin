interface UserDto {
  id: number;
  nameEn: string;
  email: string;
  mobile: string;
  identificationNumber: string;
  userType: string;
  agreementAccept: number;
  createdOn: string;
  identityTyNameAr: string;
  identityTyNameEn: string;
}

interface BrandWalletDto {
  deductionPrs: number | null;
}
export interface FreelancerData {
  brandId: number;
  userDto: UserDto;
  brandWalletDto: BrandWalletDto;
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
