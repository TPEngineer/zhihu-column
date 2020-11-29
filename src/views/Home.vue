<template>
  <a-row type="flex" justify="center">
    <img src="../assets/callout.svg" alt="callout" width="250" />
  </a-row>
  <h1 style="text-align: center">随心写作，自由表达</h1>
  <a-row type="flex" justify="center">
    <a-button type="primary">开始写文章</a-button>
  </a-row>

  <h1 :style="{ textAlign: 'center', marginTop: '72px' }">发现精彩</h1>
  <a-row :gutter="16">
    <a-col :span="6">
      <a-card title="Card title" hoverable>
        <p>card content</p>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card title="Card title" hoverable>
        <p>card content</p>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card hoverable>
        <template #cover>
          <img
            alt="example"
            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3895225068,1041998716&fm=26&gp=0.jpg"
          />
        </template>

        <a-card-meta title="Card title" description="This is the description">
          <template #avatar>
            <a-avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
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
