import type Application from '@ember/application';

export interface WrapAppOptions {
  tagName?: string;
  styles?: string;
  appConfig?: unknown;
}

export function wrapApp(
  App: typeof Application,
  options: WrapAppOptions = {},
): typeof HTMLElement {
  class WrappedAppElement extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });
      const rootElement = document.createElement('body');

      if (options.styles) {
        const style = document.createElement('style');
        style.textContent = options.styles;
        shadow.appendChild(style);
      }

      App.create(options.appConfig ?? {});

      shadow.append(rootElement);
    }
  }

  if (options.tagName) {
    customElements.define(options.tagName, WrappedAppElement);
  }

  return WrappedAppElement;
}
