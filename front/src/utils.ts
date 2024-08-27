import {getMedicines} from './api';

export const loadMedicines = async (setterFn: any) => {
  const response = await getMedicines();
  console.log(response.data);
  setterFn(response.data);
};
