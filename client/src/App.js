import React from 'react';
import './App.css';
import Table from './components/table';
import { COLUMNS } from './components/table/columns'

const App = () => {
  return (
    <div className="container mtb-3">
      <Table COLUMNS={COLUMNS}/>
    </div>
  );
}

export default App;
