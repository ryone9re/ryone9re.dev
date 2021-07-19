<template>
  <AboutContent />
</template>

<script>
export default {
  data() {
    return {}
  },
  head() {
    return {
      title: 'about || ryone9re',
      meta: [
        { hid: 'description', name: 'description', content: 'description' },
      ],
    }
  },
}
</script>

<style>
HTML,
BODY,
#__nuxt,
#__layout {
  margin: 0;
  width: 100%;
  height: 100%;
}

#__layout {
  display: flex;
  justify-content: center;
  align-items: center;
}

HTML {
  background: #edede8;
  background-size: cover;
  background-position: 50% 50%;
  height: 100%;
}
</style>
