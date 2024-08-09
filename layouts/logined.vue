<template>
  <a-layout class="layout">
    <a-layout-header
      class="layout-header"
      :style="{ backgroundColor: '#F5F5F5' }"
    >
      <img src="/images/logo.png" alt="logo" class="logo" />
      <a-flex wrap="wrap" justify="center">
        <a-button>
          <NuxtLink to="/course/target">
            <PlusSquareOutlined />
            Cá nhân hoá lộ trình
          </NuxtLink>
        </a-button>
        <a-button>
          <HomeOutlined />
          Trang chủ
        </a-button>
        <a-dropdown>
          <a-button>
            <BellOutlined />
            Thông báo
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-for="notif in notificationStore.notifications"
                @click="
                  () => {
                    if (notif.type === NOTIFICATION_TYPE.REMIND_QUESTION)
                      navigateTo(`/quiz/attempt/${notif.message}`)
                  }
                "
              >
                <a-typography-text strong>{{ notif.title }}</a-typography-text>
                <br />
                <a-typography-text>{{ notif.message }}</a-typography-text>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <a-dropdown>
          <a-button>
            <UserOutlined />
            Xin chào, {{ userStore.$state.owner?.lastName }}
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a-button type="text" danger @click="logout"
                  >Đăng xuất</a-button
                >
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-flex>
    </a-layout-header>
    <slot />
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts" setup>
import { NOTIFICATION_TYPE } from '~/constants/course'

const userStore = useUserStore()
const notificationStore = useNotificationState()

function logout() {
  localStorage.removeItem('token')
  window.location.href = '/login'
}
</script>
<style lang="scss" scoped>
.layout-header {
  display: flex;
  height: auto;
  justify-content: space-between;
  align-items: center;
}

.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

.ant-input {
  float: right;
}

.logo {
  float: left;
  width: 80px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
</style>
