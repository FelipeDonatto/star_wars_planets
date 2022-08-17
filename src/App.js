import React, { useContext, useEffect } from 'react';
import './App.css';
import AppContext from './context/context';
import Table from './pages/Table';

function App() {
  const { addAllPlanets } = useContext(AppContext);
  useEffect(() => {
    const planetApi = async () => {
      const fetchApi = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const apiJson = await fetchApi.json();
      const { results } = await apiJson;
      results.forEach((element) => delete element.residents);
      addAllPlanets(results);
    };
    planetApi();
  }, []);
  return (
    <Table />
  );
}

export default App;
