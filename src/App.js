import React, {  } from 'react';
import useName from './hooks/Name';
import ToolBar from './modules/toolbar/index';
import {ThemeContext} from './store/useToolbarReducer';
import { gen } from './utils/generator';

import './App.css';

function App() {

  const name = useName({ name: 'sanye' });

  const genInstance = gen();

  return (
    <div className="App">
      <header className="App-header">
        <span>{name}</span>
        <div onClick={() => { console.log(genInstance.next()) }}>点我切换</div>
        <ThemeContext.Provider value='dark'>
          <ToolBar/>
        </ThemeContext.Provider>
      </header>
    </div>
  );
}

export default App;
