<template>
  <a-card
    style="width: 100%"
    title="Trang quản trị"
    :tab-list="tabList"
    :active-tab-key="key"
    @tabChange="(key) => onTabChange(key, 'key')"
  >
    <template #customTab="item">
      <component :is="iconTabs[item.key]" />
      {{ item.tab }}
    </template>
    <component :is="contentList[key]" />
  </a-card>
</template>
<script lang="ts" setup>
import type { Component } from 'vue'
import QuestionManger from './-question-manager.vue'
import UserManager from './-user-manager.vue'
import { BankOutlined, UserOutlined } from '@ant-design/icons-vue'
definePageMeta({
  layout: 'logined',
})
const tabList = [
  {
    key: 'tab1',
    tab: 'Ngân hàng câu hỏi',
  },
  {
    key: 'tab2',
    tab: 'Quản lý người dùng',
  },
]
const contentList: Record<string, Component> = {
  tab1: QuestionManger,
  tab2: UserManager,
}
const iconTabs: Record<string, Component> = {
  tab1: BankOutlined,
  tab2: UserOutlined,
}
const key = ref('tab1')

const onTabChange = (value: string, type: string) => {
  console.log(value, type)
  key.value = value
}
</script>
