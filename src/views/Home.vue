<template>
  <a-row type="flex" justify="center">
    <img src="../assets/callout.svg" alt="callout" width="250" />
  </a-row>
  <h1 style="text-align: center">随心写作，自由表达</h1>

  <h1 :style="{ textAlign: 'center', marginTop: '72px' }">发现精彩</h1>
  <a-row type="flex" justify="center">
    <a-col :md="16">
      <a-row :gutter="32">
        <a-col :span="6" v-for="item in discoverList" :key="item.id">
          <a-card hoverable @click="pushWithQuery(item.id)">
            <template #cover>
              <img alt="example" :src="item.cover" />
            </template>

            <a-card-meta :title="item.title" :description="item.description">
              <template #avatar>
                <a-avatar :src="item.author_avatar" />
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script>
import service from "@/utils/request";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const discoverList = ref([]);
    const getDiscoverList = async () => {
      const res = await service.post("/column/discover", { page: 1 });

      discoverList.value = res;
    };
    onMounted(getDiscoverList);
    const router = useRouter();
    const pushWithQuery = column_id => {
      router.push({
        path: "/article/list",
        query: {
          column_id
        }
      });
    };
    return {
      discoverList,
      pushWithQuery
    };
  }
};
</script>
<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
