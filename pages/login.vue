<template>
  <a-flex
    class="login-page"
    wrap="wrap"
    justify="center"
    align="center"
    gap="100"
  >
    <a-flex class="login-content" vertical justify="center" align="center">
      <a-typography-title style="color: #ffffff">
        Chào mừng đến với dự án E-learning
      </a-typography-title>
      <a-image
        src="/images/login.png "
        :preview="false"
        :style="{ width: '500px', maxWidth: '100%' }"
      />
    </a-flex>
    <a-card class="login-card">
      <a-flex :vertical="true" align="center" gap="large">
        <UserOutlined style="font-size: 32px; color: #4b89dc" />
        <a-typography-title style="font-size: 32px"
          >Đăng Nhập</a-typography-title
        >
      </a-flex>
      <a-form :model="loginData" class="login-form">
        <a-form-item
          name="email"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-flex :vertical="true" gap="middle">
            <label style="font-size: 18px">Email: </label>
            <a-input v-model:value="loginData.email" />
          </a-flex>
        </a-form-item>
        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-flex :vertical="true" gap="middle">
            <label style="font-size: 18px">Password: </label>
            <a-input-password v-model:value="loginData.password" />
          </a-flex>
        </a-form-item>

        <a-button type="primary" html-type="submit" @click="onSubmit"
          >Đăng Nhập</a-button
        >
      </a-form>
    </a-card>
  </a-flex>
</template>

<script setup lang="ts">
import { COURSE_ID } from '~/constants/course'
import { USER_ENDPOINT } from '~/constants/endpoint'

definePageMeta({
  layout: 'unlogin',
})

interface loginFormType {
  email: string
  password: string
}

const loginData = reactive<loginFormType>({
  email: '',
  password: '',
})

const userStore = useUserStore()
const { startLoading, finishLoading } = useLoading()

async function onSubmit() {
  if (!loginData.email || !loginData.password) {
    message.error('Vui lòng nhập đầy đủ thông tin')
    return
  }
  try {
    startLoading()
    await userStore.login(loginData)
    finishLoading()
    useRouter().push('/course/map')
  } catch (error) {
    finishLoading()
    throw error
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  background-color: #4b89dc;
  padding-top: 50px;
  padding-bottom: 200px;
}

.login-card {
  min-width: 40%;
  border-radius: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 0% 10%;
  margin-top: 10%;
}

.login-content {
  justify-content: space-between;
  height: 100%;
}
</style>
