import './App.css';
import Table from './components/Table';
import NumberFilter from './components/Filters';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (

    <PlanetsProvider>
      <NumberFilter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
