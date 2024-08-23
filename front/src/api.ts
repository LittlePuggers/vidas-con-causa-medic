import axios, {AxiosResponse} from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Define types for the response data
interface Medicine {
  id: number;
  name: string;
  component: string;
  concentration: string;
  category: string;
  stock: number;
  bestUsedBy: string;
}

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
): Promise<AxiosResponse<Medicine>> => api.put(`/medicines/${id}`, data);
export const deleteMedicine = (id: number): Promise<void> =>
  api.delete(`/medicines/${id}`);

export const getInstances = (): Promise<AxiosResponse<Instance[]>> =>
  api.get('/instances');
export const createInstance = (
  data: Partial<Instance>
): Promise<AxiosResponse<Instance>> => api.post('/instances', data);
export const updateInstance = (
  id: number,
  data: Partial<Instance>
): Promise<AxiosResponse<Instance>> => api.put(`/instances/${id}`, data);
export const deleteInstance = (id: number): Promise<void> =>
  api.delete(`/instances/${id}`);
