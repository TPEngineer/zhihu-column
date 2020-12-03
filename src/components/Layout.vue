<template>
  <a-layout
    id="components-layout-demo-top"
    class="layout"
    :style="{ minHeight: '100vh' }"
  >
    <a-layout-header style="background: #f0f4f7">
      <h3 :style="{ float: 'left', fontWeight: 750 }">知乎专栏</h3>
      <div
        :style="{ lineHeight: '64px', float: 'right' }"
        v-if="!$store.state.isLogin"
      >
        <a-button type="primary" @click="$router.push('/login')"
          >登陆
        </a-button>
        <a-button
          type="primary"
          @click="$router.push('/signup')"
          :style="{ marginLeft: '12px' }"
          >注册
        </a-button>
      </div>
      <div :style="{ lineHeight: '64px', float: 'right' }" v-else>
        <a-dropdown>
          <a> 我的 <UserOutlined /> </a>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="$router.push('/user/detail')">
                <a href="javascript:;">个人信息</a>
              </a-menu-item>
              <a-menu-item @click="$router.push('/column')">
                <a href="javascript:;">我的专栏</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
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
import { UserOutlined,  } from '@ant-design/icons-vue';

export default {
  components: {
    UserOutlined,

  },
  methods: {}
};
</script>
