import './App.css';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
import Filters from './components/Filters';

function App() {
  return (

    <PlanetsProvider>
      <Filters />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
