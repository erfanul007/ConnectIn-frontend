export interface userprofile{
  username: string;
  fname: string;
  lname: string;
  email: string;
  dateofbirth: Date;
  gender: string;
  followers: number;
  following: number;
  profilepicture: string|null;
  coverphoto: string|null;
}