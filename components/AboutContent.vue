<template>
  <div class="about-container">
    <p class="about">
      こんにちは！ ryone9reと申す者です｡ Ruby, Goをメインに書いてます｡<br />
      C++, Vue.js/ts, Python も書けます｡<br />
      この子はcuriosityくんです｡ かわいいですね〜<br />
    </p>
    <div class="curiosity">
      <a href="https://mars.nasa.gov/"><Curiosity /></a>
    </div>
    <ToTopButton />
  </div>
</template>

<script>
export default {}
</script>

<style>
.about-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation: 0.5s appear;
}

.about {
  width: 80%;
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: calc(10px + 2vw);
  color: #212836;
  letter-spacing: 1px;
}
</style>
