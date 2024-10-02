import axios, {AxiosResponse} from 'axios';
import {Medicine} from './types/Medicine';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

interface Instance {
  id: number;
  medicineId: number;
}

export const getMedicines = (): Promise<AxiosResponse<Medicine[]>> =>
  api.get('/medicines');

export const createMedicine = (
  data: Partial<Medicine>
): Promise<AxiosResponse<Medicine>> => api.post('/medicines', data);

export const updateMedicine = (
  id: number,
  data: Partial<Medicine>
): Promise<AxiosResponse<Medicine>> => api.patch(`/medicines/${id}`, data);

export const deleteMedicine = (id: number): Promise<void> =>
  api.delete(`/medicines/${id}`);

export const getInstances = (id: number): Promise<AxiosResponse<Instance[]>> =>
  api.get(`/medicines/${id}/items`);

export const createInstance = (
  data: Partial<Instance>
): Promise<AxiosResponse<Instance>> =>
  api.post(`/medicines/${data.medicineId}/items`, data);

export const updateInstance = (
  medicineId: number,
  id: number,
  data: Instance
): Promise<AxiosResponse<Instance>> =>
  api.put(`/medicines/${medicineId}/items/${id}`, data);

export const deleteInstance = (medicineId: number, id: number): Promise<void> =>
  api.delete(`/medicines/${medicineId}/items/${id}`);
