export interface User {
  name: string;
  wallet: string;
  email: string;
  description: string;
  image: string;
  transactionsHash: string[];
  KYC: boolean;
  registrationDate: Date;
}