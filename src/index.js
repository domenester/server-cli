#!/usr/bin/env node
import 'babel-polyfill';
import commander from 'commander';
import co from 'co';
import prompt from 'co-prompt';
import ApiStrategy, { apiExists } from './strategy/api';
import EndpointStrategy from './strategy/endpoint';

commander
.option('-c, --create <component>', 'The component to create.')
.action( (args) => {
  co(function * (){
    let component;
    if (args.create){ component = args.create.toLocaleLowerCase(); }
    switch (component) {
      case "api": 
        const apiName = yield prompt('Api name: ');
        yield ApiStrategy(apiName);
      break;
      case "endpoint": 
        const api = yield prompt('Api name: ');
        if (!apiExists(api)) {
          console.log('This api wasn\'t create yet. Create it before.'); break;
        }
        const endpoint = yield prompt('Endpoint name: ');
        const path = yield prompt('Endpoint path: ');
        const verb = yield prompt('Endpoint verb: ');
        yield EndpointStrategy(api, endpoint, path, verb);
      break;
    }
    process.exit(0);
  });
})
.parse(process.argv);