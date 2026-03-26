import { pageTitle } from 'ember-page-title';
import { WelcomePage } from 'ember-welcome-page';
import SimpleCssImport from '../components/simple-css-import';

<template>
  {{pageTitle "AppWebcomponent"}}

  {{outlet}}

  <SimpleCssImport />

  {{! The following component displays Ember's default welcome message. }}
  <WelcomePage />
  {{! Feel free to remove this! }}
</template>
