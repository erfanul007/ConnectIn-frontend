import { userbasic } from "../user/userbasic";

export interface comment{
  createdby: userbasic;
  createdon: string;
  message: string;
  reactions: number;
  isreacted: boolean;
}