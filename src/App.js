import useName from './hooks/Name';

import './App.css';

function App() {

  const name = useName({ name: 'sanye' });

  return (
    <div className="App">
      <header className="App-header">
        { name }
      </header>
    </div>
  );
}

export default App;
