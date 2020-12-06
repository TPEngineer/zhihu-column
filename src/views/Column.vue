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
    <a-col :span="6" v-for="item in columnList" :key="item.id">
      <a-card hoverable>
        <template #cover>
          <img alt="example" :src="item.cover" />
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
import { onMounted, ref, computed } from "vue";
import { message } from "ant-design-vue";

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
      await getColumnList(1);
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

    const columnList = ref([]);
    const getColumnList = async page => {
      const res = await service.post("/column/list", { page });
      columnList.value = res;
    };
    onMounted(getColumnList(1));
    return {
      columnList,
      getColumnList,
      column,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      visible,
      isEdit,
      formTitle,
      showModal,
      handleModify,
      handleOK
    };
  }
};
</script>

<style></style>
