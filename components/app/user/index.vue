<template>
  <a-card :title="user._id">
    <template #extra>
      <a-flex gap="large">
        <a-button type="primary" danger @click="handleDelete"> Xoá</a-button>
        <a-button @click="handleEdit">
          <EditOutlined />
          {{ editing ? 'Hoàn tất' : 'Sửa' }}
        </a-button>
      </a-flex>
    </template>
    <a-flex vertical>
      <label class="label-space">
        <strong>Email: </strong>
        <a-typography-text :editable="editing" v-model:content="user.email" />
      </label>
      <label class="label-space">
        <strong>FirstName: </strong>
        <a-typography-text
          :editable="editing"
          v-model:content="user.firstName"
        />
      </label>
      <label class="label-space">
        <strong>LastName: </strong>
        <a-typography-text
          :editable="editing"
          v-model:content="user.lastName"
        />
      </label>
      <label class="label-space">
        <strong>Role: </strong>
        <a-select v-model:value="user.role" :disabled="!editing">
          <a-select-option
            v-for="[key, value] in Object.entries(ROLE)"
            :key="key"
            :value="value"
          >
            {{ key }}</a-select-option
          >
        </a-select>
      </label>
      <label class="label-space">
        <strong>Password: </strong>
        <a-input
          type="password"
          :disabled="!editing"
          v-model="user.password"
        />
      </label>
    </a-flex>
  </a-card>
</template>

<script setup lang="ts">
const user = defineModel('user', {
  required: true,
  default: new UserEntity(),
})
const editing = ref(false)
const ROLE = {
  ADMIN: 'admin',
  USER: 'user',
}
function handleEdit() {
  if (editing.value) {
    useUserStore().editUser(user.value)
  }
  editing.value = !editing.value
}

function handleDelete() {
  useUserStore().deleteUser(user.value._id)
}
</script>

<style lang="scss" scoped>
.label-space {
  margin-bottom: 20px; /* Tăng khoảng cách dưới của mỗi label */
}
</style>
