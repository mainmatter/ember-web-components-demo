import type Application from '@ember/application';

export interface WrapAppOptions {
  tagName?: string;
  styles?: string;
  rootElementTag?: string;
  appConfig?: unknown;
}

export function wrapApp(
  App: typeof Application,
  options: WrapAppOptions = {},
): typeof HTMLElement {
  class WrappedAppElement extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });

      /**
       * We originally defaulted to body here because we were testing with the ember-welcome-page and it
       * had specific css targeting the body. The more we experimented and thought about it we thought
       * it was a decent thing for an application wrapped in a web-component to have it's own body,
       * and nobody seemed to be telling us it was a bad idea so 🤷
       */
      const rootElement = document.createElement(options.rootElementTag ?? 'body');

      if (options.styles) {
        const style = document.createElement('style');
        style.textContent = options.styles;
        shadow.appendChild(style);
      }

      const appConfig = {
        ...(options.appConfig ?? {}),
        rootElement,
      };
      App.create(appConfig);

      shadow.append(rootElement);
    }
  }

  if (options.tagName) {
    customElements.define(options.tagName, WrappedAppElement);
  }

  return WrappedAppElement;
}
