import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import Generos from "./Generos";
import NovoGenero from "./NovoGenero";
import EditarGenero from "./EditarGenero";
import Series from "./Series";
import NovaSerie from "./NovaSerie";
import InfoSerie from "./InfoSerie";

function App() {
  return (
    <Router>
      <div>
        <Header></Header>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/generos" component={Generos} exact />
          <Route path="/generos/novo" component={NovoGenero} exact />
          <Route path="/generos/:id" component={EditarGenero} exact />
          <Route path="/series" component={Series} exact />
          <Route path="/series/novo" component={NovaSerie} exact />
          <Route path="/series/:id" component={InfoSerie} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
