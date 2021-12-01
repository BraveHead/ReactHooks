import React, {  } from 'react';
import useName from './hooks/Name';
import ToolBar from './modules/toolbar/index';
import {ThemeContext} from './store/useToolbarReducer';
import { gen } from './utils/generator';

import Dinner from './design-patterns/decorator/Dinner';
import Customobj from './design-patterns/decorator/customObj';

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
        <div 
          onClick={() => {  
            let todayDinner = new Dinner('白饭', '白开水');
            console.log(`${todayDinner}`, todayDinner); 
            const customObj = new Customobj();
            // customObj.sex = 'man';
            console.log('customObj:', customObj, 'name:', customObj.name);
          }}
        >
          点我执行装饰者代码
        </div>
      </header>
    </div>
  );
}

export default App;
