<template>
  <a-row class="container" type="flex" justify="space-around" align="middle">
    <a-form layout="vertical" :model="formInline" @submit="handleSubmit">
      <a-form-item>
        <a-input v-model:value="formInline.user" placeholder="用户名">
          <template #prefix
            ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="formInline.password"
          type="password"
          placeholder="密码"
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formInline.user === '' || formInline.password === ''"
        >
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </a-row>
</template>

<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    UserOutlined,
    LockOutlined,
  },
  data() {
    return {
      formInline: {
        user: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.formInline);
    },
  },
};
</script>

<style>
.container {
  height: 100vh;
}
</style>