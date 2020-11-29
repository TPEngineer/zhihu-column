<template>
  <a-layout
    id="components-layout-demo-top"
    class="layout"
    :style="{ minHeight: '100vh' }"
  >
    <a-layout-header style="background: #f0f4f7">
      <div :style="{ float: 'left' }">知乎专栏</div>
      <div :style="{ lineHeight: '64px', float: 'right' }">
        <a-button type="primary">登陆 </a-button>
        <a-button type="primary" :style="{ marginLeft: '12px' }"
          >注册
        </a-button>
      </div>
    </a-layout-header>
    <a-layout-content>
      <div :style="{ background: '#fff', padding: '24px' }">
        <router-view />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script>
export default {
  data() {
    return { selectedKeys: ["2"] };
  }
};
</script>
<style></style>
