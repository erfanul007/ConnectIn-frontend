import { schooldetails } from "./schooldetails";
import { workdetails } from "./workdetails";

export interface userinfo{
  bio: string | null;
  work: workdetails[];
  school: schooldetails[];
  livesin: string;
  hometown: string;
  relationship: string;
}