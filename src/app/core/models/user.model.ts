export interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: string;
  profile_pic: string;
  supervisor_id?: string;
  greenhouses_id: Array<string>
}
