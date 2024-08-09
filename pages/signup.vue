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
        <a-typography-title style="font-size: 32px">Đăng kí</a-typography-title>
      </a-flex>
      <a-form :model="signUpData" class="login-form">
        <a-form-item
          v-for="item in formSignUp"
          :name="item.name"
          :rules="
            item.name === 'cfPassword'
              ? [{ validator: validatePass2, trigger: 'change' }]
              : [{ required: true, message: item.message }]
          "
        >
          <a-flex align="center" justify="space-between">
            <label>{{ item.label + ':' }}</label>
            <a-input-password
              v-if="item.name === 'password' || item.name === 'cfPassword'"
              v-model:value="signUpData[item.name]"
              style="width: 60%"
            />
            <a-input
              v-else
              v-model:value="signUpData[item.name]"
              style="width: 60%"
            />
          </a-flex>
        </a-form-item>

        <a-button type="primary" html-type="submit" @click="onSubmit"
          >Đăng ký</a-button
        >
      </a-form>
    </a-card>
  </a-flex>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'unlogin',
})
import type { Rule } from 'ant-design-vue/es/form'

interface SignUpDataType {
  firstName: string
  lastName: string
  email: string
  password: string
  cfPassword: string
}

const signUpData = reactive<SignUpDataType>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  cfPassword: '',
})

const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password again')
  } else if (value !== signUpData.password) {
    return Promise.reject("Two password don't match!")
  } else {
    return Promise.resolve()
  }
}

interface formSignUp {
  name: string
  label: string
  message: string
}

const formSignUp: formSignUp[] = [
  {
    name: 'firstName',
    label: 'First name',
    message: 'Please input your First name',
  },
  {
    name: 'lastName',
    label: 'Last name',
    message: 'Please input your Last name',
  },
  {
    name: 'email',
    label: 'Email address',
    message: 'Please input your email',
  },
  {
    name: 'password',
    label: 'Password',
    message: 'Please input your password',
  },
  {
    name: 'cfPassword',
    label: 'Confirm Password',
    message: "Two password don't match!",
  },
]
const userStore = useUserStore()
const { startLoading, finishLoading } = useLoading()
async function onSubmit() {
  if (
    !signUpData.firstName ||
    !signUpData.lastName ||
    !signUpData.email ||
    !signUpData.password
  ) {
    message.error('Vui lòng nhập đầy đủ thông tin')
    return
  }
  startLoading()
  await userStore.register(signUpData)
  finishLoading()
  //create message success
  notification.success({
    message: 'Đăng ký thành công',
    duration: 10,
  })
  //redirect to login page
  navigateTo('/login')
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
