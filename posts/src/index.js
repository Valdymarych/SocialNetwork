import store  from "./redux/store-redux";
import ReactDOM from 'react-dom/client';
import React from "react";
import './index.css';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "./AppContainer";


const root = ReactDOM.createRoot(document.getElementById('root'));
function rerenderAllTree(){
    root.render(
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </BrowserRouter>
    );  
}

store.subscribe(rerenderAllTree);
rerenderAllTree();