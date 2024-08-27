import './App.css';

import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Medicine as MedicineType} from './types/Medicine';
import Header from './components/Header';
import {Medicine} from './components/Medicine';
import MedicTable from './components/MedicTable';
import {getMedicines} from './api';

const App: React.FC = () => {
  const [products, setProducts] = useState<MedicineType[]>([]);

  useEffect(() => {
    loadProducts();
  }, [products]);

  const loadProducts = async () => {
    const response = await getMedicines();
    setProducts(response.data);
  };

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
