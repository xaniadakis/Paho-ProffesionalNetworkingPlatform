export interface Friend {
  name: string;
  surname: string;
  country: string;
  city: string;
  address: string;
  number: number;
  postcode: string;
  job_description: string;
  education: string;
  skills: string;
  age: number;
  mobile: number;
  email: string;
  github: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  is_active: boolean;
  friends: Array<Friend>;
  password: string;
  __v: number;
  _id: string;
  // user_Image: string;
  user_Image:File;
}
