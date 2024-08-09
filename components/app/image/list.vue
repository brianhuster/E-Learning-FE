<template>
  <a-flex align="center" vertical gap="large">
    <a-button type="primary" ghost @click="openModal(-1)" v-if="editing">
      <PlusCircleOutlined />
      Thêm ảnh
    </a-button>
    <a-card v-for="(src, index) in images" :key="index">
      <template #actions v-if="editing">
        <a-button
          type="primary"
          danger
          ghost
          @click="() => images.splice(index, 1)"
        >
          <CloseCircleFilled />
          Xoá
        </a-button>
        <a-button type="primary" ghost @click="openModal(index)">
          <PlusCircleOutlined />
          Thêm ảnh
        </a-button>
      </template>
      <app-image v-if="src" :src="src"> </app-image>
    </a-card>
  </a-flex>
  <a-modal v-model:open="showModal" title="Thêm ảnh" @ok="addImage">
    <a-input v-model:value="imageUrl" placeholder="Nhập URL ảnh" />
  </a-modal>
</template>

<script setup lang="ts">
const images = defineModel<string[]>('images', {
  type: Array,
  default: () => [],
})
const editing = defineModel<boolean>('editing', {
  type: Boolean,
  default: false,
})
const showModal = ref(false)
const imageUrl = ref('')
const currentIndex = ref(-1)
const openModal = (index: number) => {
  currentIndex.value = index
  showModal.value = true
}
const addImage = () => {
  images.value.splice(currentIndex.value + 1, 0, imageUrl.value)
  imageUrl.value = ''
  showModal.value = false
}
</script>
