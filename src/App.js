import React, { useEffect } from 'react';
import useName from './hooks/Name';
import ToolBar from './modules/toolbar/index';
import {ThemeContext} from './store/useToolbarReducer';
import { gen } from './utils/generator';

import './App.css';

function App() {

  const name = useName({ name: 'sanye' });

  const genInstance = gen();

  const handleFarClick = (e) => {
    // e.stopPropagation();
    // e.stopImmediatePropagation();
    // e.nativeEvent.stopImmediatePropagation();
    console.log('far react click!');
  }

  const handleChildClick = (e) => {
    // e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    console.log('child react click!');
  }

  useEffect(() => {
    document.addEventListener('click', (e) => {
      // e.stopPropagation();
      // e.stopImmediatePropagation();
      console.log('document click 1!');
    }, true);
    document.addEventListener('click', (e) => {
      // e.stopPropagation();
      // e.stopImmediatePropagation();
      console.log('document click 2!');
    }, false);

    // const farDom = document.querySelector('#far');
    // const child = document.querySelector('#child');

    // farDom.addEventListener('click', (e) => {
    //   console.log('fardom js click!');
    // }, true);
    // child.addEventListener('click', (e) => {
    //   console.log('childDom js click!');
    // }, true)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <span>{name}</span>
        <div onClick={() => { console.log(genInstance.next()) }}>点我切换</div>
        <ThemeContext.Provider value='dark'>
          <ToolBar/>
        </ThemeContext.Provider>

        <div id="far" onClick={handleFarClick} style={{ width: 200, height: 200, position: 'relative', background: 'yellow' }}>
            <div id="child" onClick={handleChildClick} style={{ width: 100, height: 100, position: 'absolute', left: 50, top: 50, background: 'red' }}>Child</div>
        </div>
      </header>
    </div>
  );
}

export default App;
