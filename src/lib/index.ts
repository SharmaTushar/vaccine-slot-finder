import {VaccinationCenter} from "../types";
import {getCentersByDistrictApi, getCentersByPinCodeApi} from "../api";

export const getFormattedDate = (date: Date) => {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return `${d.toString().padStart(2, "0")}-${m.toString().padStart(2, "0")}-${y}`;
}

const getCurrentFormattedDate = () => getFormattedDate(new Date());

export const getCenters = async (params: { districts: Array<number | string>, pinCode?: never } | { pinCode: number | string, districts?: never }): Promise<Array<VaccinationCenter>> => {
    const date = getCurrentFormattedDate();

    if (params.districts) {
        const result = await Promise.allSettled(
            params.districts.map((district) => getCentersByDistrictApi({date, district}))
        );

        return result.reduce((acc: Array<VaccinationCenter>, item) => {
            if (item.status === "fulfilled" && item.value) {
                return acc.concat(...item.value.centers);
            }
            return acc;
        }, []);
    } else {
        const result = await getCentersByPinCodeApi({ date, pinCode: params.pinCode });
        return result.centers;
    }
};


export const findEligibleCenters = (list: Array<VaccinationCenter>) => {
    const eligibleCenters = list.filter((center: VaccinationCenter) =>
        center.sessions.some(
            (session) =>
                session.min_age_limit === 18 && session.available_capacity > 0
        )
    );
    return eligibleCenters;
};
