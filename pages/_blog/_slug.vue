<template>
  <div class="blog-content">
    <Header />
    <main class="main">
      <h1 class="title">{{ title }}</h1>
      <p
        class="publishedAt"
        v-text="$dayjs(publishedAt).format('YYYY-MM-DD')"
      />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="post" v-html="content"></div>
      <div class="link"><nuxt-link to="/blog" tag="a">もどる</nuxt-link></div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $microcms }) {
    const data = await $microcms.get({
      endpoint: `blog/${params.slug}`,
    })
    return data
  },
  data() {
    return {}
  },
  head() {
    return {
      title: `${this.title} || blog || ryone9re`,
      meta: [
        { hid: 'description', name: 'description', content: 'description' },
      ],
    }
  },
}
</script>

<style>
.main {
  width: 80%;
  margin: 20px auto;
  border: 1px solid #444;
}

.title {
  margin-top: 20px;
  color: #444;
  text-align: center;
  font-family: 'Noto Serif JP', sans-serif;
  text-decoration-line: underline;
}

.publishedAt {
  text-align: right;
  margin-right: 20px;
  font-family: 'Noto Serif JP', sans-serif;
}

.post {
  padding: 30px;
  font-family: 'Noto Serif JP', sans-serif;
}

.link {
  margin-bottom: 20px;
  text-align: center;
}

.link a {
  text-decoration: none;
  color: #444;
}

footer {
  height: 20px;
}
</style>
