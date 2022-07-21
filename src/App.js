import Nav from './components/Nav'
import Dashboard from './components/dashboard/Dashboard'
import Sales from './components/sales/Sales'
import Edit from './components/edit/Edit'

import { useState } from 'react'

export default function App() {
  const [mode, setMode] = useState('dashboard');

  function changeMode(mode) {
    setMode(mode);
  }

  return (
    <div className="text-neutral-600">
      <Nav active={mode} changeMode={changeMode}></Nav>
      {mode === 'sales' ? <Sales></Sales> : mode === 'dashboard' ? <Dashboard></Dashboard> : <Edit></Edit>}
    </div>
  );
}

