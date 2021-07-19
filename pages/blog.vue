<template>
  <div class="blog-container">
    <Header />
    <div class="body">
      <ul>
        <li v-for="content in contents" :key="content.id">
          <nuxt-link :to="`/blog/${content.id}`" tag="a">
            <div class="blog-title">
              <h2>{{ content.title }}</h2>
              <p v-text="$dayjs(content.publishedAt).format('YYYY-MM-DD')" />
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="toIndex">
      <a href="/">
        <font-awesome-icon :icon="['fas', 'chevron-circle-left']" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $microcms }) {
    const data = await $microcms.get({
      endpoint: 'blog',
      queries: { limit: 20 },
    })
    return data
  },
}
</script>

<style>
HTML {
  background: #edede8;
  background-size: cover;
  background-position: 50% 50%;
  height: 100%;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  width: 80%;
  margin: 0 auto;
}

.blog-title {
  border: 1px solid #444;
  margin-top: 20px;
  color: #444;
  text-align: center;
  font-family: 'Noto Sans JP', sans-serif;
}

.blog-title p {
  text-align: right;
  margin-right: 20px;
}

a {
  text-decoration: none;
}

.toIndex {
  margin: 0 auto;
  text-align: center;
}

.toIndex a {
  color: #444;
  font-size: calc(10px + 1.5vw);
}
</style>
