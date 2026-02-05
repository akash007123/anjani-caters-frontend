import countriesStatesCities from 'countries-states-cities';

export const getAllCountries = () => countriesStatesCities.getAllCountries();
export const getStatesOfCountry = (countryId: number) => countriesStatesCities.getStatesOfCountry(countryId);
export const getCitiesOfState = (stateId: number) => countriesStatesCities.getCitiesOfState(stateId);
export const getCountryByCode = (code: string) => countriesStatesCities.getCountryByCode(code);
export const getStateById = (id: number) => countriesStatesCities.getStateById(id);

export type { ICountry, IState, ICity } from 'countries-states-cities';
