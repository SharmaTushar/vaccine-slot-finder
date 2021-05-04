import { VaccinationSession } from "./vaccination-session.type";

export type VaccinationCenter = {
  name: string;
  district_name: string;
  pincode: number;
  sessions: Array<VaccinationSession>;
};
