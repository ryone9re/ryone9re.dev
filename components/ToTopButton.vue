<template>
  <nuxt-link to="/" class="button--top">
    <font-awesome-icon :icon="['fas', 'times']" />
  </nuxt-link>
</template>

<style>
.button--top {
  margin: 2%;
  color: #8697a6;
  font-size: calc(10px + 2vw);
}

.button--top:hover {
  color: #bfcdd9;
}
</style>
