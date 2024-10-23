import {getCategories, getInstances, getMedicines} from './api';

export const loadMedicines = async (setterFn: any) => {
  const response = await getMedicines();
  // console.log(response.data);
  setterFn(response.data);
};

export const loadInstances = async (id: number, setterFn: any) => {
  const response = await getInstances(id);
  // console.log(response.data);
  setterFn(response.data);
};

export const loadCategories = async (setterFn: any) => {
  const response = await getCategories();
  setterFn(response.data);
};

// export const categories = [
//   {id: 1, optionName: 'Antibiótico'},
//   {id: 2, optionName: 'Dolor'},
//   {id: 3, optionName: 'Parasiticida'},
//   {id: 4, optionName: 'Articulaciones'},
//   {id: 5, optionName: 'Oftálmico'},
// ];

export const instanceUnits = [
  {id: 1, name: 'Tabletas'},
  {id: 2, name: 'Mililitros'},
  {id: 3, name: 'Gramos'},
];
