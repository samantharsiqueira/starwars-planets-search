import { useState, useEffect } from 'react';
import './App.css';
import PlanetsContext, { Planets } from './context/PlanetsContext';
import Table from './components/Table';

function App() {
  const [planets, setPlanets] = useState<Planets[]>([]);

    <span>Hello, App!</span>;

    useEffect(() => {
      const fetchPlanets = async () => {
        try {
          const response = await fetch('https://swapi.dev/api/planets/');
          const data = await response.json();
          setPlanets(data.results);
        } catch (error) {
          console.error('Error fetching planets', error);
        }
      };
      fetchPlanets();
    }, []);

    return (
      <PlanetsContext.Provider value={ { planets } }>
        <Table />
      </PlanetsContext.Provider>
    );
}

export default App;
