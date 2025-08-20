import App from './app/app';
import { wrapApp } from '@ember/webcomponent';
import config from 'app-webcomponent/config/environment';

import styles from './app/app.css?inline';

export default wrapApp(App, {
  tagName: 'app-webcomponent',
  styles,
  appConfig: config.APP,
});
