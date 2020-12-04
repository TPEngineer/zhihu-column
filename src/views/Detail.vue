<template>
  <a-row type="flex" justify="center">
    <a-col :md="20" :lg="14" :xl="8">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="头像地址">
          <a-input v-model:value="userDetail.avatar" />
          <a-avatar :src="userDetail.avatar" size="large" />
        </a-form-item>
        <a-form-item label="昵称">
          <a-input v-model:value="userDetail.nickname" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model:value="userDetail.email" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import service from "@/utils/request";
import { message } from "ant-design-vue";

export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };
  },
  methods: {
    async onSubmit() {
      await service.post("/user/modify", this.userDetail);
      message.success("修改成功");
    }
  },
  setup() {
    const store = useStore();
    return {
      // access a state in computed function
      userDetail: computed(() => store.state.userDetail)
    };
  }
};
</script>

<style></style>
