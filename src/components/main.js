'use strict';

var DgRpgfApp = require('./DgRpgfApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={DgRpgfApp}>
    <Route name="/" handler={DgRpgfApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
