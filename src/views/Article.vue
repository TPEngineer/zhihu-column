<template>
  <a-row type="flex" justify="center">
    <a-col :md="10">
      <img alt="logo" :src="article.header_image" :style="{ width: '100%' }" />
      <h1
        :style="{
          fontSize: '24px',
          lineHeight: '1.22',
          margin: '24px 0'
        }"
      >
        {{ article.title }}
      </h1>
      <div v-html="article.content"></div>
    </a-col>
  </a-row>
</template>

<script>
import { useRoute } from "vue-router";
import service from "@/utils/request";
import { onMounted, ref } from "vue";
export default {
  setup() {
    const article = ref({});
    const getArticleDetail = async () => {
      const route = useRoute();
      const { article_id } = route.query;
      const res = await service.post("/article/detail", {
        article_id: parseInt(article_id, 10)
      });
      console.log(res);
      article.value = res;
    };
    // fetch the user information when params change
    onMounted(() => {
      getArticleDetail();
    });
    return {
      article
    };
  }
};
</script>

<style></style>
