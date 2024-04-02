import { userbasic } from "../user/userbasic";
import { attachment } from "./attachment";

export interface blog{
  createdby: userbasic;
  createdon: Date;
  heading: string;
  description: string;
  attachment: attachment;
  comments: number;
  reacts: number;
  ispublic: boolean;
  isreacted: boolean;
  iscollapsed: boolean;
}