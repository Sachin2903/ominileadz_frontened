export type ILeadsInitialState = {
  leadId: string;
  leadType: string;
  leadDate: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  subject: string;
  companyName: string;
  companyAddress: string;
  city: string;
  state: string;
  pincode: string;
  country_iso: string;
  contactPersonPhoneAlt: string;
  contactPersonEmailAlt: string;
  productName: string;
  description: string;
  lead_mcat_name: string;
  callDuration: string;
  receiverMobile: string;
  source: string;

  // old keys
  stage: string;
  followUpDate?: string | null;
  assignedTo: string | null;
  status: string | null;
  quotationNumber: string | null;
  detailsSent?: boolean;
};
export interface ILeadsState extends ILeadsInitialState {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export type IContact = {
  _id?: string;
  fullName: string;
  email: string;
  industry: string;
  jobtitle: string;
  phone: string;
  address: string;
  pincode: string;
  country: string;
  city: string;
  company: string;
  gender: string;
  title: string;
  leadStatus: string;
  prefLanguage: string;
  workEmail: string;
  source: string;
  createdAt?: string;
};
export type editLeadsDataProps = {
  leadId: string;
  lead: ILeadsInitialState;
};
export type IJobSliceInitialStateFieldPayload = {
  [K in keyof ILeadsInitialState]: {
    key: K;
    value: ILeadsInitialState[K];
  };
}[keyof ILeadsInitialState];

export type Member = {
  id: string;
  text: string;
};

export type GroupMemberType = {
  _id: string;
  groupName: string;
  leaderName: string;
  leaderId: string;
  slogan: string;
  status: string;
  members: Member[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type IUserRoleArray = {
  id: string;
  text: string;
};

export interface Tag {
  id: string;
  text: string;
}

export type TeamMembersType = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type IBusinessType = {
  _id: string;
  lat: number;
  long: number;
  isPrimary: boolean;
  category: number; //
  brand: number;
  pincode: string; //
  name: string; //
  code: string; //
  address: string;
  phone: string; //
  email: string; //
  website: string;
  description: string; //
  cash: boolean;
  upi: boolean;
  card: boolean;
  businessType: string; //
  paymentType: string;
  printLogo: string;
  adminLogo: string;
  adminSmallLogo: string;
  appLogo: string;
  favicon: string;
  footerText: string;
  gtmCode: string; //
  smsSenderId: number;
  emailFrom: string;
  paymentGatewayConfig: number;
};

export type IBusinessInitialType = {
  lat: number;
  long: number;
  isPrimary: boolean;
  category: number; //
  brand: number;
  pincode: string; //
  name: string; //
  code: string; //
  address: string;
  phone: string; //
  email: string; //
  website: string;
  description: string; //
  cash: boolean;
  upi: boolean;
  card: boolean;
  businessType: string; //
  paymentType: string;
  printLogo: string;
  adminLogo: string;
  adminSmallLogo: string;
  appLogo: string;
  favicon: string;
  footerText: string;
  gtmCode: string; //
  smsSenderId: number;
  emailFrom: string;
  paymentGatewayConfig: number;
};

// dashboard member Interface
export interface IMemberLead {
  assignedTo: string;
  count: number;
  leadIds: string[];
}

export interface ICompanyObject {
  _id?: string;
  name: string;
  industry: string;
  aboutUs: string;
  owner: number;
  size: string;
  address: string;
  website: string;
  type: "Prospect" | "Partner" | "Reseller" | "Vendor" | "Other";
  country: string;
  city: string;
  state: string;
  postalCode: string;
  annualRevenue: string;
  moneyRaised: string;
  sources: {
    type: string;
    source: string;
    asOn: number;
  }[];
  description: string;
  linkedInPage: string;
  parentCompany: number;
  childCompanies: number[];
  ownership: "public" | "private";
  lifecycleStage:
    | "Subscriber"
    | "Lead"
    | "Marketing Qualified Lead"
    | "Opportunity"
    | "Customer"
    | "Evangelist"
    | "Other";
  contactPersons: number[];
  incorporationDate: string; // You might consider using a Date object instead
  social: {
    type: string;
    link: string;
    impact: string;
    bio: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ICommentObject {
  _id?: string;
  leadId: string;
  text: string;
}

export interface IUserObject {
  exp: number;
  iat: number;
  name: string;
  role: string[];
  sub: string;
  username: string;
}

export interface IComment {
  name: string;
  date: string;
  text: string;
}
