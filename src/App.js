import React, {  } from 'react';
import useName from './hooks/Name';
import ToolBar from './modules/toolbar/index';
import {ThemeContext} from './store/useToolbarReducer';

import './App.css';

function App() {

  const name = useName({ name: 'sanye' });

  return (
    <div className="App">
      <header className="App-header">
        <span>{name}</span>
        <div>点我切换</div>
        <ThemeContext.Provider value='dark'>
          <ToolBar/>
        </ThemeContext.Provider>
      </header>
    </div>
  );
}

export default App;
