<template>
  <a-row class="container" type="flex" justify="space-around" align="middle">
    <a-form :model="formInline" @submit="handleSubmit">
      <a-form-item>
        <a-input v-model:value="formInline.username" placeholder="输入用户名">
          <template #prefix
            ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="formInline.password"
          type="password"
          placeholder="输入密码"
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="formInline.confirmPassword"
          type="password"
          placeholder="确认密码"
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
          :disabled="formInline.username === '' || formInline.password === ''"
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </a-row>
</template>

<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import service from "@/utils/request";
export default {
  components: {
    UserOutlined,
    LockOutlined
  },
  data() {
    return {
      formInline: {
        username: "",
        password: "",
        confirmPassword: "",
      }
    };
  },
  methods: {
    async handleSubmit() {
      console.log(this.formInline);
      const res = await service.post("/user/signup", this.formInline);
      if (res.code == 0) {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style>
.container {
  height: 100vh;
}
</style>
