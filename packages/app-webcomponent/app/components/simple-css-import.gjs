import './simple-css-import.css';

<template>
  <section class="coming-from-imported-css">
    <h1>I've been imported</h1>
    {{yield}}
  </section>
</template>
