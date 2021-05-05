import axios from "axios";
import {returnData} from "./interceptors/response-interceptors.js";
import {VaccinationCenter} from "../types";

axios.interceptors.response.use(returnData);

const baseUrl = "https://cdn-api.co-vin.in/api/v2";

type getCentersByDistrictDto = { date: string, district: number | string };
export const getCentersByDistrictApi = ({date, district}: getCentersByDistrictDto): Promise<{ centers: Array<VaccinationCenter>}> => axios.get(baseUrl + '/appointment/sessions/calendarByDistrict', {params: {date, district_id: district}});

type getCentersByPinCodeDto = { date: string, pinCode: number | string };
export const getCentersByPinCodeApi = ({date, pinCode}: getCentersByPinCodeDto): Promise<{ centers: Array<VaccinationCenter>}> => axios.get(baseUrl + '/appointment/sessions/calendarByPin', {params: {date, pincode: pinCode}});
