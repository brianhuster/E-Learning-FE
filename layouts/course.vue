<template>
  <a-layout class="layout">
    <a-layout-header class="course-header">
      <a-typography-title class="title"
        >{{ courseStore.$state.courseName }}
        <ReadOutlined />
      </a-typography-title>
    </a-layout-header>
    <a-layout-content style="overflow: scroll;">
      <slot />
    </a-layout-content>
    <a-layout-footer class="course-footer">
      <a-flex justify="space-between" wrap="wrap" gap="small">
        <a-flex :vertical="true">
          <a-typography-title :level="4" class="title"
            >CÁC CHUYÊN MỤC CHÍNH</a-typography-title
          >
          <a-divider class="divider" />
          <a-space direction="vertical">
            <a-typography-text>Trắc nghiệm</a-typography-text>
            <a-typography-text>Chương trình</a-typography-text>
            <a-typography-text>Ngân hàng câu hỏi</a-typography-text>
          </a-space>
        </a-flex>
        <a-flex :vertical="true">
          <a-typography-title :level="4" class="title"
            >CÁC CHUYÊN MỤC CHÍNH</a-typography-title
          >
          <a-divider class="divider" />
          <a-space direction="vertical">
            <a-typography-text>Trắc nghiệm</a-typography-text>
            <a-typography-text>Chương trình</a-typography-text>
            <a-typography-text>Ngân hàng câu hỏi</a-typography-text>
          </a-space>
        </a-flex>
        <a-flex :vertical="true">
          <a-typography-title class="title" :level="4"
            >CÁC CHUYÊN MỤC CHÍNH</a-typography-title
          >
          <a-divider class="divider" />
          <a-space direction="vertical">
            <a-typography-text>Trắc nghiệm</a-typography-text>
            <a-typography-text>Chương trình</a-typography-text>
            <a-typography-text>Ngân hàng câu hỏi</a-typography-text>
          </a-space>
        </a-flex>
      </a-flex>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
const courseStore = useCourseStore()
</script>

<style scoped lang="scss">
.course-header {
  display: flex;
  height: auto;
  margin-bottom: 20px;
  align-items: center;

  > .title {
    color: $primary;
  }
}

.course-footer {
  margin: 0 10% 0 10%;
}

.course-footer {
  .title {
    color: $gold;
    align-content: center;
  }
  .divider {
    border-color: $gold;
  }
}
</style>
