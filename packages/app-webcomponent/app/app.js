import Application from '@ember/application';
import compatModules from '@embroider/virtual/compat-modules';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'app-webcomponent/config/environment';
import { wrapApp } from '@ember/webcomponent';

import styles from './app.css?inline';

class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver.withModules(compatModules);
}

loadInitializers(App, config.modulePrefix, compatModules);

export default wrapApp(App, {
  tagName: 'app-webcomponent',
  styles,
  appConfig: config.APP,
});
