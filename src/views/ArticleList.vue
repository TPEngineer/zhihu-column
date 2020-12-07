<template>
  <a-modal v-model:visible="visible" :title="formTitle" @ok="handleOK">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="标题">
        <a-input v-model:value="article.title" />
      </a-form-item>
      <a-form-item label="简介">
        <a-input v-model:value="article.short" />
      </a-form-item>
      <a-form-item label="文章内容(h5格式)">
        <a-textarea v-model:value="article.content" />
      </a-form-item>
      <a-form-item label="头图">
        <a-input v-model:value="article.header_image" />
        <a-avatar :src="article.header_image" size="large" />
      </a-form-item>
      <a-form-item label="专栏">
        <a-select
          v-model:value="article.column_id"
          placeholder="please select your zone"
          :disabled="isEdit"
        >
          <a-select-option
            v-for="item in columnAll"
            :value="item.ID"
            :key="item.ID"
          >
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="文章id" v-if="isEdit">
        <a-input v-model:value="article.article_id" disabled />
      </a-form-item>
    </a-form>
  </a-modal>
  <a-row type="flex" justify="center">
    <a-col :md="16">
      <a-button type="primary" @click="showModal">写文章 </a-button>
      <a-list item-layout="vertical" size="large" :data-source="articleList">
        <template #renderItem="{ item }">
          <a-list-item key="item.title">
            <template #actions>
              <span v-for="{ type, text } in actions" :key="type">
                <component v-bind:is="type" style="margin-right: 8px" />
                {{ text }}
              </span>
              <span @click="handleModify(item)">修改</span>
            </template>
            <template #extra>
              <img width="272" alt="logo" :src="item.header_image" />
            </template>
            <a-list-item-meta>
              <template #title>
                <a>{{ item.title }}</a>
              </template>
            </a-list-item-meta>
            {{ item.short }}
          </a-list-item>
        </template>
      </a-list>
      <a-pagination v-model:current="current" :total="500" />
    </a-col>
  </a-row>
</template>

<script>
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined
} from "@ant-design/icons-vue";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import service from "@/utils/request";
import { message } from "ant-design-vue";

export default {
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined
  },
  setup() {
    const store = useStore();
    const columnAll = computed(() => store.state.columnAll);
    const articleList = ref([]);
    const getArticleList = async () => {
      const { column_id } = route.query;
      const res = await service.post("/article/list", {
        page: current.value,
        column_id: parseInt(column_id, 10)
      });
      articleList.value = res;
    };
    const current = ref(1);
    watch(current, () => {
      getArticleList();
    });

    const route = useRoute();
    // fetch the user information when params change
    onMounted(() => {
      console.log(route.query);
      getArticleList();
    });

    let article = ref({
      title: "",
      short: "",
      header_image: "",
      content: "",
      column_id: null,
      article_id: 0
    });
    const visible = ref(false);
    const isEdit = ref(false);
    const formTitle = computed(() => {
      return isEdit.value ? "编辑文章" : "新增文章";
    });
    const showModal = () => {
      article.value = {
        title: "",
        short: "",
        header_image: "",
        content: "",
        column_id: null,
        article_id: 0
      };
      isEdit.value = false;
      visible.value = true;
    };
    const handleOK = async () => {
      if (!isEdit.value) {
        await service.post("/article/create", article.value);
        message.success("创建成功");
      } else {
        await service.post("/article/modify", article.value);
        message.success("修改成功");
      }
      // await getColumnList(1);
      visible.value = false;
      console.log(article.value);
    };
    const handleModify = async item => {
      article.value = {
        title: item.title,
        short: item.short,
        header_image: item.header_image,
        content: item.content,
        column_id: item.column_id,
        article_id: item.ID
      };
      isEdit.value = true;
      visible.value = true;
    };
    return {
      columnAll,
      formTitle,
      showModal,
      handleOK,
      handleModify,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      visible,
      isEdit,
      article,
      articleList,
      current,
      actions: [
        { type: "StarOutlined", text: "156" },
        { type: "LikeOutlined", text: "156" },
        { type: "MessageOutlined", text: "2" }
      ]
    };
  }
};
</script>

<style></style>
