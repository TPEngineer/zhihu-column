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
        <a-input v-model:value="article.column_id" />
      </a-form-item>
      <a-form-item label="文章id" v-if="isEdit">
        <a-textarea v-model:value="article.article_id" />
      </a-form-item>
    </a-form>
  </a-modal>
  <a-row type="flex" justify="center">
    <a-col :md="16">
      <a-button type="primary" @click="showModal">写文章 </a-button>
      <a-list
        item-layout="vertical"
        size="large"
        :pagination="pagination"
        :data-source="listData"
      >
        <template #renderItem="{ item }">
          <a-list-item key="item.title">
            <template #actions>
              <span v-for="{ type, text } in actions" :key="type">
                <component v-bind:is="type" style="margin-right: 8px" />
                {{ text }}
              </span>
            </template>
            <template #extra>
              <img
                width="272"
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            </template>
            <a-list-item-meta :description="item.description">
              <template #title>
                <a :href="item.href">{{ item.title }}</a>
              </template>
            </a-list-item-meta>
            {{ item.content }}
          </a-list-item>
        </template>
      </a-list>
    </a-col>
  </a-row>
</template>

<script>
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined
} from "@ant-design/icons-vue";
import { ref, computed } from "vue";
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://www.antdv.com/",
    title: `ant design vue part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
  });
}
export default {
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined
  },
  setup() {
    let article = ref({
      title: "",
      short: "",
      header_image: "",
      content: "",
      column_id: 0,
      article_id: 0
    });
    const visible = ref(false);
    const isEdit = ref(false);
    const formTitle = computed(() => {
      return isEdit.value ? "编辑专栏" : "新增专栏";
    });
    const showModal = () => {
      article.value = {
        title: "",
        short: "",
        header_image: "",
        content: "",
        column_id: 0,
        article_id: 0
      };
      isEdit.value = false;
      visible.value = true;
    };
    const handleOK = async () => {
      //   if (!isEdit.value) {
      //     await service.post("/column/create", column.value);
      //     message.success("创建成功");
      //   } else {
      //     await service.post("/column/modify", column.value);
      //     message.success("修改成功");
      //   }
      //   await getColumnList(1);
      visible.value = false;
    };
    const handleModify = async item => {
      article.value = {
        title: item.title,
        short: item.short,
        header_image: item.header_image,
        content: item.content,
        column_id: item.column_id,
        article_id: item.article_id
      };
      isEdit.value = true;
      visible.value = true;
    };
    return {
      formTitle,
      showModal,
      handleOK,
      handleModify,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      visible,
      isEdit,
      article
    };
  },
  data() {
    return {
      listData,
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      },
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
