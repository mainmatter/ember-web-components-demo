/* global SHADOW_STYLE_URLS */
import App from './app/app';
import { wrapApp } from '@ember/webcomponent';
import config from 'app-webcomponent/config/environment';

export default wrapApp(App, {
  tagName: 'app-webcomponent',
  styleUrls: SHADOW_STYLE_URLS,
  appConfig: config.APP,
});
