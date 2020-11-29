<template>
  <a-row type="flex" justify="center">
    <img src="../assets/callout.svg" alt="callout" width="250" />
  </a-row>
  <h1 style="text-align: center">随心写作，自由表达</h1>
  <a-row type="flex" justify="center">
    <a-button type="primary">开始写文章</a-button>
  </a-row>
</template>
<script>
export default {
  data() {
    return {
      selectedKeys: ["2"]
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
