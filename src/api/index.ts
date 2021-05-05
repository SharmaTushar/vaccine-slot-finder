import axios from "axios";
import {addHeaders} from "./interceptors/request-incerceptors";
import {logError, returnData} from "./interceptors/response-interceptors";
import {VaccinationCenter} from "../types";

axios.interceptors.request.use(addHeaders);
axios.interceptors.response.use(returnData, logError);

const baseUrl = "https://cdn-api.co-vin.in/api/v2";

type getCentersByDistrictDto = { date: string, district: number | string };
export const getCentersByDistrictApi = ({date, district}: getCentersByDistrictDto): Promise<{ centers: Array<VaccinationCenter>}> => axios.get(baseUrl + '/appointment/sessions/calendarByDistrict', {params: {date, district_id: district}});

type getCentersByPinCodeDto = { date: string, pinCode: number | string };
export const getCentersByPinCodeApi = ({date, pinCode}: getCentersByPinCodeDto): Promise<{ centers: Array<VaccinationCenter>}> => axios.get(baseUrl + '/appointment/sessions/calendarByPin', {params: {date, pincode: pinCode}});
