export interface schooldetails{
  institute: string;
  degree: string;
  started: Date;
  ended: Date|null;
  iscurrent: boolean;
  description: string|null;
}