import { useEffect, useState } from 'react';
import { Planets } from '../types/types';

function useFetch() {
  const [loading, setLoading] = useState(true);
  const [planets, setPlanets] = useState<Planets[]>([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets/');
        const data = await response.json();
        setPlanets(data.results);
      } catch (error) {
        console.error('Error fetching planets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanets();
  }, []);

  return { planets, loading };
}

export default useFetch;
