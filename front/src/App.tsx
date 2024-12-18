import './App.css';

import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Medicine as MedicineType} from './types/Medicine';
import Header from './components/Header';
import {Medicine} from './components/Medicine';
import MedicTable from './components/MedicTable';
import {loadCategories, loadMedicines} from './utils';
import {Category} from './types/Category';

const App: React.FC = () => {
  const [products, setProducts] = useState<MedicineType[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        await loadMedicines(setProducts);
      } catch (error) {
        console.error('Error loading medicines:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchCategories = async () => {
      await loadCategories(setCategories);
    };
    fetchMedicines();
    fetchCategories();
  }, []);

  return (
    <>
      <Header></Header>
      <main>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                loading ? (
                  <p>Loading medicines...</p>
                ) : (
                  <MedicTable
                    medicines={products}
                    setMedicines={setProducts}
                    categories={categories}
                  />
                )
              }
            />
            <Route
              path="/medicine/:id"
              element={<Medicine products={products} categories={categories} />}
            />
          </Routes>
        </Router>
      </main>
    </>
  );
};

export default App;
