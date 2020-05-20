import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import RootApp from "./Components/RootApp";
import { Provider } from "react-redux";
import store from "./Components/Redux/Store";

function App() {
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
}

export default App;
