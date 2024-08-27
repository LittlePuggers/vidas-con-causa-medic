import './App.css';

import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Medicine as MedicineType} from './types/Medicine';
import Header from './components/Header';
import {Medicine} from './components/Medicine';
import MedicTable from './components/MedicTable';
import {loadMedicines} from './utils';

const App: React.FC = () => {
  const [products, setProducts] = useState<MedicineType[]>([]);

  useEffect(() => {
    loadMedicines(setProducts);
  }, []);

  return (
    <>
      <Header></Header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<MedicTable medicines={products} />} />
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
