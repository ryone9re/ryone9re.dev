<template>
  <div class="top-container">
    <h1>ryone9re</h1>
    <div class="link-btn">
      <nuxt-link to="/about" class="icon-btn"
        ><font-awesome-icon :icon="['far', 'address-card']" class="icon"
      /></nuxt-link>
      <a href="/blog" class="icon-btn"
        ><font-awesome-icon :icon="['fas', 'blog']" class="icon"
      /></a>
      <a href="https://github.com/KuRImoN0o6/" class="icon-btn"
        ><font-awesome-icon :icon="['fab', 'github']" class="icon"
      /></a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.top-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation: 2s appear;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}

.top-container h1 {
  font-weight: 300;
  font-size: calc(10px + 10vw);
  color: #8697a6;
  letter-spacing: 1px;
  margin-top: 5%;
  margin-bottom: 5%;
}

.link-btn {
  display: flex;
  flex-flow: row;
  justify-content: center;
}

.icon-btn {
  margin: 0 10%;
}

.icon {
  font-size: calc(10px + 5vw);
  color: #8697a6;
}

.icon:hover {
  color: #bfcdd9;
}
</style>
