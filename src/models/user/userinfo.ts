import { schooldetails } from "./schooldetails";
import { workdetails } from "./workdetails";

export interface userinfo{
  bio: string | null;
  work: Array<workdetails>;
  school: Array<schooldetails>;
  livesin: string;
  hometown: string;
  relationship: string;
}