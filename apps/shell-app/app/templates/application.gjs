import { pageTitle } from 'ember-page-title';

<template>
  {{pageTitle "ShellApp"}}

  {{outlet}}

  <h1>This isn't our welcome-page, it's a webcomponent</h1>

  <app-webcomponent />
</template>
