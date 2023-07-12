import { repairsTypes } from "../repairs/types";

export type carTypes = {
    _id: string,
    owner: string,
    carNumber: string,
    phoneNumber: string,
    carModel: string,
    carVin: string,
    carMark: string,
    comanyHoldRepairs: string,
    buildDate: Date,
    repairs: repairsTypes[]
}

export type carState = {
    loading: boolean;
    isDoneLoading: boolean,
    cars: carTypes[] | null,
    error: string | null,
}
