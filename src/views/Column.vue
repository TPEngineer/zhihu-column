<template>
  <a-button type="primary" @click="showModal">新增专栏 </a-button>
  <a-modal v-model:visible="visible" :title="formTitle" @ok="handleOK">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="标题">
        <a-input v-model:value="column.title" />
      </a-form-item>
      <a-form-item label="描述">
        <a-input v-model:value="column.description" />
      </a-form-item>
      <a-form-item label="封面">
        <a-input v-model:value="column.cover" />
        <a-avatar :src="column.cover" size="large" />
      </a-form-item>
    </a-form>
  </a-modal>
  <a-row :gutter="16" :style="{ marginTop: '24px' }">
    <a-col :span="6" v-for="item in columnAll" :key="item.ID">
      <a-card hoverable>
        <template #cover>
          <img
            alt="example"
            :src="item.cover"
            @click="pushWithQuery(item.ID)"
          />
        </template>

        <a-card-meta :title="item.title" :description="item.description">
          <!-- <template #avatar>
            <a-avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </template> -->
        </a-card-meta>
        <div style="float: right">
          <a @click="handleModify(item)">修改</a>
          <a :style="{ marginLeft: '6px' }">删除</a>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import service from "@/utils/request";
import { ref, computed } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    let column = ref({
      title: "",
      description: "",
      cover: "",
      column_id: 0
    });

    const visible = ref(false);
    const isEdit = ref(false);
    const formTitle = computed(() => {
      return isEdit.value ? "编辑专栏" : "新增专栏";
    });
    const showModal = () => {
      column.value = {
        title: "",
        description: "",
        cover: "",
        column_id: 0
      };
      isEdit.value = false;
      visible.value = true;
    };
    const handleOK = async () => {
      if (!isEdit.value) {
        await service.post("/column/create", column.value);
        message.success("创建成功");
      } else {
        await service.post("/column/modify", column.value);
        message.success("修改成功");
      }
      await getcolumnAll();
      visible.value = false;
    };
    const handleModify = async item => {
      column.value = {
        title: item.title,
        description: item.description,
        cover: item.cover,
        column_id: item.ID
      };
      isEdit.value = true;
      visible.value = true;
    };

    const store = useStore();
    const columnAll = computed(() => store.state.columnAll);
    const getcolumnAll = () => store.dispatch("fetchColumnAll");
    // onMounted(getcolumnAll);

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
      columnAll,
      getcolumnAll,
      column,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      visible,
      isEdit,
      formTitle,
      showModal,
      handleModify,
      handleOK,
      pushWithQuery
    };
  }
};
</script>

<style></style>
