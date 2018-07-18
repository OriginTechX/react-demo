import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '@/utils/asyncComponent';

import Home from "@/pages/home/home";
const Record = asyncComponent(() => import("@/pages/record/record"));
const HelpCenter = asyncComponent(() => import("@/pages/helpcenter/helpcenter"));
const Production = asyncComponent(() => import("@/pages/production/production"));
const Balance = asyncComponent(() => import("@/pages/balance/balance"));

export default class RouteConfig extends Component{
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/record" component={Record} />
          <Route path="/helpcenter" component={HelpCenter} />
          <Route path="/production" component={Production} />
          <Route path="/balance" component={Balance} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    )
  }
}
