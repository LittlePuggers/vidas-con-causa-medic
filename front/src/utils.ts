import {getInstances, getMedicines} from './api';

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

export const categories = [
  'Antibiótico',
  'Dolor',
  'Parasiticida',
  'Articulaciones',
  'Oftálmico',
];

export const instanceUnits = ['Tabletas', 'Mililitros', 'Gramos'];
