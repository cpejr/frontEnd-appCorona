import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './pages/Register';
import Pendings from './pages/Pendings';
import List from './pages/List';
import UploadTest from './pages/UploadTest';
import Home from './pages/Home';
import OngShow from './pages/OngShow';
import Login from './pages/Login';
import Adm from './pages/Adm';
import Stats from './pages/Adm/Stats';
import Profile from './pages/Adm/Profile';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ongShow" exact  component={OngShow} />
        <Route path="/list" exact component={List} />

        <Route path="/register" exact component={Register} />
        <Route path="/pendings" exact component={Pendings} />
        <Route path="/login" exact component={Login} />
        <Route path="/imgupload" exact component={UploadTest} />
        <Adm>
          <Route exact path="/adm/stats" component={Stats} />
          <Route exact path="/adm/profile" component={Profile} />
        </Adm>
        <Route component={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
}
