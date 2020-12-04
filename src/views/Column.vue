<template>
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
export default {};
</script>

<style></style>
