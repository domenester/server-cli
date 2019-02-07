#!/usr/bin/env node
import 'babel-polyfill';
import commander from 'commander';
import co from 'co';
import prompt from 'co-prompt';
import ApiStrategy from './strategy/api';

commander
.option('-c, --create <component>', 'The component to create.')
.action( (args) => {
  co(function * (){
    const component = args.create.toLocaleLowerCase();
    switch (component) {
      case "api": 
        const apiName = yield prompt('Api name: ');
        yield ApiStrategy(apiName);
      break;
    }
    process.exit(0);
  });
})
.parse(process.argv);