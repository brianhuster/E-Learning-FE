<template>
  <a-layout class='layout'>
    <a-layout-header class='layout-header'>
      <a-flex gap='middle' wrap="wrap">
        <a-button style='color: #4B89DC; border: 0px;'>
          <HomeOutlined />
          TRANG CHỦ
        </a-button>

        <a-button style='color: #4B89DC; border: 0px;'>
          <PlusOutlined />
          KHÓA ÔN THI
        </a-button>
        <a-button style='color: #4B89DC; border: 0px;'>
          <PlusOutlined />
          KHÓA HỌC
        </a-button>
      </a-flex>

      <a-input-search placeholder='search' style='width: 400px;color:#F6F6F6' />

      <a-flex gap='small' wrap="wrap" align="center" justify="center">
        <a-button class='login-btn' type='primary' @click='useRouter().push(`/login`)'>
          Đăng nhập
        </a-button>
        <a-button class='signup-btn' @click='useRouter().push(`/signup`)'>
          Đăng ký
        </a-button>
      </a-flex>
    </a-layout-header>
    <a-layout-content>
      <slot />
    </a-layout-content>
  </a-layout>
</template>
<script lang='ts' setup>
function handleMenuClick() {
}

function handleButtonClick() {
}
</script>
<style lang='scss' scoped>
.layout-header {
  display: flex;
  height: auto;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: $secondary;
}

.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}


.login-btn {
  width: 98px;
}

.signup-btn {
  width: 98px;
  background-color: $secondary;
  color: $black;
  border-color: $blue;
}
</style>
