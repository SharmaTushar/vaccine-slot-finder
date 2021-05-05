import {findEligibleCenters, getFormattedDate} from "../index";
import {VaccinationCenter} from "../../types";

describe('getFormattedDate', () => {
    it('formats the date correctly', () => {
        const date = new Date(2001, 2, 5);
        const formattedDate = getFormattedDate(date);
        expect(formattedDate).toEqual('05-03-2001');
    });
});

describe('findEligibleCenters', () => {

    const allCenters: Array<VaccinationCenter> = [
        {
            name: 'Center 1',
            pincode: 123456,
            district_name: 'ABC',
            sessions: [
                {
                    min_age_limit: 45,
                    available_capacity: 10
                },
                {
                    min_age_limit: 45,
                    available_capacity: 10
                }
            ]
        },
        {
            name: 'Center 2',
            pincode: 123456,
            district_name: 'ABC',
            sessions: [
                {
                    min_age_limit: 18,
                    available_capacity: 0
                },
                {
                    min_age_limit: 18,
                    available_capacity: 0
                }
            ]
        },
        {
            name: 'Center 3',
            pincode: 123456,
            district_name: 'ABC',
            sessions: [
                {
                    min_age_limit: 45,
                    available_capacity: 0
                },
                {
                    min_age_limit: 45,
                    available_capacity: 0
                }
            ]
        },
        {
            name: 'Center 4',
            pincode: 123456,
            district_name: 'ABC',
            sessions: [
                {
                    min_age_limit: 18,
                    available_capacity: 0
                },
                {
                    min_age_limit: 18,
                    available_capacity: 1
                }
            ]
        },
        {
            name: 'Center 5',
            pincode: 123456,
            district_name: 'ABC',
            sessions: [
                {
                    min_age_limit: 18,
                    available_capacity: 0
                },
                {
                    min_age_limit: 45,
                    available_capacity: 2
                }
            ]
        },
        {
            name: 'Center 6',
            pincode: 123456,
            district_name: 'ABC',
            sessions: [
                {
                    min_age_limit: 18,
                    available_capacity: 1
                },
                {
                    min_age_limit: 18,
                    available_capacity: 1
                }
            ]
        },
    ]

    it('finds centers with open slots for those above 18 in age', () => {
        const eligibleCenters = findEligibleCenters(allCenters);
        expect(eligibleCenters).toEqual(
            expect.arrayContaining([
                expect.objectContaining({name: 'Center 4'}),
                expect.objectContaining({name: 'Center 6'}),
            ])
        )
    })
});
