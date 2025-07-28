import { module, test } from 'qunit';
import Application from '@ember/application';
import Resolver from 'ember-resolver';
import { wrapApp } from '#src/index.ts';
import EmberRouter from '@ember/routing/router';
import { settled } from '@ember/test-helpers';

class Router extends EmberRouter {
  location = 'none';
  rootURL = '/';
}

class App extends Application {
  modulePrefix = 'test-app';
  Resolver = Resolver.withModules({
    'test-app/router': { default: Router },
    'test-app/templates/application': { default: <template>TEST</template> },
  });
}

module('Unit | wrapApp', function () {
  test('it wrapps Ember app in web component', function (assert) {
    const WC = wrapApp(App);

    assert.true(
      WC.constructor === HTMLElement.constructor,
      'Wrapped WC extends HTMLElement',
    );
  });

  test('it does not register the custom element by default', function (assert) {
    const WC = wrapApp(App);

    assert.strictEqual(customElements.getName(WC), null);
  });

  test('it registers the custom element when tagName is given', function (assert) {
    const WC = wrapApp(App, { tagName: 'registered-test-app' });

    assert.strictEqual(customElements.getName(WC), 'registered-test-app');
  });

  test('it renders Ember app as web component', async function (assert) {
    wrapApp(App, { tagName: 'test-app' });

    const testingEl = document.getElementById('ember-testing')!;
    testingEl.innerHTML = '<test-app />';

    await settled();

    const shadowRoot = testingEl.querySelector('test-app')?.shadowRoot;
    assert.dom('*', shadowRoot).hasText('TEST');
  });
});
