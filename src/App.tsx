import './App.css';

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Product} from './types/product';
import Header from './components/Header';
import {Medicine} from './components/Medicine';
import MedicTable from './components/MedicTable';

const products: Product[] = [
  {
    id: 1,
    component: 'Amoxicilina',
    concentration: '200mg',
    name: 'Amoxipet Plus',
    category: 'Antibiótico',
    stock: 35,
    bestUsedBy: '31/octubre/2025',
  },
  {
    id: 2,
    component: 'Tramadol',
    concentration: '20mg',
    name: 'Tramadol Pets NRV',
    category: 'Dolor',
    stock: 42,
    bestUsedBy: '31/octubre/2025',
  },
  {
    id: 3,
    component: 'Clindamicina',
    concentration: '110mg',
    name: 'Clindacin 10',
    category: 'Antibiótico',
    stock: 45,
    bestUsedBy: '31/octubre/2025',
  },
  {
    id: 4,
    component: 'Metronidazol',
    concentration: '150mg/ml',
    name: 'Metronida Pets 150 NRV',
    category: 'Antibiótico',
    stock: 16,
    bestUsedBy: '31/octubre/2025',
  },
  {
    id: 5,
    component: 'Meloxicam',
    concentration: '1.5mg',
    name: 'Meloxivet',
    category: 'Dolor',
    stock: 0,
    bestUsedBy: '31/octubre/2025',
  },
  {
    id: 6,
    component: 'Isoxazolinas: fluralaner',
    concentration: '250mg',
    name: 'Bravecto',
    category: 'Parasiticida',
    stock: 150,
    bestUsedBy: '31/octubre/2025',
  },
  {
    id: 7,
    component: 'Isoxazolinas: afoxolaner',
    concentration: '28.3mg',
    name: 'NexGard',
    category: 'Parasiticida',
    stock: 44,
    bestUsedBy: '31/octubre/2025',
  },
  {
    id: 8,
    component: 'UC-II',
    concentration: '10mg',
    name: 'Flexadin Advanced',
    category: 'Articulaciones',
    stock: 36,
    bestUsedBy: '31/octubre/2025',
  },
  {
    id: 9,
    component: 'Dorzolamida',
    concentration: '20mg/ml',
    name: 'Dorzolavet',
    category: 'Oftálmico',
    stock: 65,
    bestUsedBy: '31/octubre/2025',
  },
];

const App: React.FC = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<MedicTable products={products} />} />
            <Route
              path="/medicine/:id"
              element={<Medicine products={products} />}
            />
          </Routes>
        </Router>
      </main>
    </>
  );
};

export default App;
