interface UserDto {
  id: number;
  nameEn: string;
  email: string;
  mobile: string;
  identificationNumber: string;
  userType: string;
  agreementAccept: number;
  createdOn: string;
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
