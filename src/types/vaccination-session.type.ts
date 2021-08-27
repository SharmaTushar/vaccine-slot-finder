import {VaccineName} from "./vaccine-name.type";

export type VaccinationSession = {
    min_age_limit: number;
    available_capacity: number;
    vaccine?: VaccineName
};
