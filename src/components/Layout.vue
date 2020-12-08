<template>
  <a-layout
    id="components-layout-demo-top"
    class="layout"
    :style="{ minHeight: '100vh' }"
  >
    <a-layout-header style="background: #f0f2f5">
      <a
        :style="{ float: 'left', fontWeight: 750 }"
        @click="$router.push('/home')"
      >
        知乎专栏
      </a>
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
          <a> {{ userDetail.nickname }} <UserOutlined /> </a>
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
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', height: '100%' }"
    >
      <router-view />
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      XIN ©2021
    </a-layout-footer>
  </a-layout>
</template>
<script>
import { UserOutlined } from "@ant-design/icons-vue";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    UserOutlined
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
