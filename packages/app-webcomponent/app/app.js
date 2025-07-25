import Application from '@ember/application';
import compatModules from '@embroider/virtual/compat-modules';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'app-webcomponent/config/environment';

import appStyles from './app.css?inline';

export default class EmberWebComponent extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const rootElement = document.createElement("body");

    const style = document.createElement("style");
    style.textContent = appStyles;
    shadow.appendChild(style);

    class App extends Application {
      rootElement = rootElement;
      modulePrefix = config.modulePrefix;
      podModulePrefix = config.podModulePrefix;
      Resolver = Resolver.withModules(compatModules);
    }

    loadInitializers(App, config.modulePrefix, compatModules);

    App.create(config.APP);

    shadow.append(rootElement);
  }
}

customElements.define("app-webcomponent", EmberWebComponent);
