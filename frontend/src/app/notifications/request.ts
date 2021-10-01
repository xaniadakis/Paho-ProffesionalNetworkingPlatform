export interface User {
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

  friends: Array<User>;
  password: string;
  __v: number;
  _id: string;
  user_Image: string;
}

export interface Request {
  _id: string;
  title: string;
  text: string;
  _owner: string;
  _owner_name: User;
  _to_friend: string;
}



export interface Requests {
  posts:Array<Request>
}


