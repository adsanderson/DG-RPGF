'use strict';

describe('DgRpgfApp', () => {
  let React = require('react/addons');
  let DgRpgfApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    DgRpgfApp = require('components/DgRpgfApp.js');
    component = React.createElement(DgRpgfApp);
  });

  it('should create a new instance of DgRpgfApp', () => {
    expect(component).toBeDefined();
  });
});
