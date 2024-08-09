<template>
  <a-modal
    title="Bạn có bài tập nhắc lại nè"
    :open="!!notificationStore.remindQuestions.length"
    :footer="false"
    :closable="false"
  >
    <NuxtLink
      v-for="(question, i) in notificationStore.remindQuestions"
      :key="question._id"
      :to="`/quiz/attempt/${question.message}`"
    >
      <a-button @click="notificationStore.makeRead(question._id)">
        Ôn lại kiến thức</a-button
      >
    </NuxtLink>
  </a-modal>
  <a-layout>
    <a-layout-sider
      breakpoint="lg"
      v-model:collapsed="collapsedSidebar.calendar"
      collapsedWidth="0"
      class="layout-sider"
    >
      <a-flex
        vertical
        gap="small"
        align="center"
        style="margin-right: 10px; margin-left: 10px"
      >
        <app-calendar class="calendar" v-model="selectedDay"></app-calendar>

        <a-card title="Cần hoàn thành" style="width: 100%">
          <a-space direction="vertical">
            <a-typography-link
              v-for="(item, i) in mustStudy"
              :href="`#${item.id}`"
              :type="item.complete ? 'success' : 'danger'"
              :key="i"
            >
              <CheckCircleOutlined v-if="item.complete" />
              <CloseCircleOutlined v-else />
              {{ item.message }}
            </a-typography-link>
          </a-space>
        </a-card>

        <a-card title="Lộ trình học ">
          <a-tree :tree-data="treeData" @select="console.log"> </a-tree>
        </a-card>
      </a-flex>
    </a-layout-sider>
    <a-layout-content style="overflow: scroll; height: 80vh">
      <a-flex vertical gap="small" style="overflow: scroll">
        <CourseMapChapter
          v-for="(item, index) in mapContent"
          :chapter-name="item.chapterName"
          :chapter-number="item.chapterNumber"
          :figure-config="item.figureConfig"
          :key="index"
        />
      </a-flex>
    </a-layout-content>
    <a-layout-sider
      breakpoint="sm"
      collapsedWidth="0"
      v-model:collapsed="collapsedSidebar.remember"
      class="layout-sider"
      width="400"
    >
      <a-flex
        vertical
        gap="large"
        align="center"
        style="margin-right: 10px; margin-left: 10px"
      >
        <a-card style="width: 100%">
          <template #title>
            <a-typography-title :level="3">
              <BookOutlined />Luyện đề
            </a-typography-title>
          </template>
          <template #actions>
            <a-space direction="vertical">
              <a
                href="https://drive.google.com/drive/folders/14WeqHLELG9k8IzjN9apXhy30247gUb6J"
                target="_blank"
              >
                <a-button type="primary">
                  <PlusSquareOutlined />
                  TÀI LIỆU THAM KHẢO
                </a-button>
              </a>
              <a-space>
                <a-button disabled>Thi thử lần 1</a-button>
                <a-button @click="joinQuizTestExam(2)"> Thi thử lần 2</a-button>
              </a-space>
            </a-space>
          </template>
          <a-space direction="vertical">
            <!-- <a-typography-link>Thi thử lần 1 </a-typography-link>
            <a-typography-link> Thi thử lần 2 </a-typography-link> -->
            <a-typography-link
              href="https://drive.google.com/drive/folders/1YaUM34qGeS7j17A2eJPoO7InBjEBRXkn"
            >
              Đề tổng hợp
            </a-typography-link>
          </a-space>
        </a-card>
        <a-card style="width: 100%">
          <template #title>
            <a-typography-title :level="3">
              <FlagOutlined />REMEMBER
            </a-typography-title>
          </template>
          <a-card v-for="(remember, i) in remembers" :key="remember.img">
            <!-- <a-typography-text>{{ remember.text }}</a-typography-text> -->
            <app-image :src="remember.img"></app-image>
          </a-card>
        </a-card>
      </a-flex>
    </a-layout-sider>
  </a-layout>
  <a-float-button-group
    v-if="collapsedSidebar.remember || collapsedSidebar.calendar"
    trigger="hover"
    type="primary"
  >
    <template #icon>
      <PlusCircleOutlined />
    </template>
    <a-float-button
      @click="
        () => {
          collapsedSidebar.remember = !collapsedSidebar.remember
          collapsedSidebar.calendar = true
        }
      "
    >
      <template #icon>
        <BookOutlined />
      </template>
      <template #tooltip>
        <div>Remember</div>
      </template>
    </a-float-button>
    <a-float-button
      @click="
        () => {
          collapsedSidebar.calendar = !collapsedSidebar.calendar
          collapsedSidebar.remember = true
        }
      "
    >
      <template #icon>
        <CalendarOutlined />
      </template>
      <template #tooltip>
        <div>Lịch học</div>
      </template>
    </a-float-button>
  </a-float-button-group>
</template>

<script lang="ts" setup>
import type { DataNode, TreeDataItem } from 'ant-design-vue/es/tree'
import dayjs from 'dayjs'
import { useRememberStore } from '~/stores/remember'

definePageMeta({
  layout: 'logined',
})
const courseStore = useCourseStore()
const studyMapStore = useStudyMapStore()
const rememberStore = useRememberStore()
const notificationStore = useNotificationState()
const quizStore = useQuizStore()
onMounted(() => {
  return Promise.all([
    studyMapStore.fetchMission(),
    studyMapStore.fetchStudyMap(),
    rememberStore.fetchRemembers(),
    notificationStore.fetchNotifications(),
  ])
})

const collapsedSidebar = reactive({
  calendar: false,
  remember: false,
})

const selectedDay = ref(dayjs())
const mustStudy = computed((): CaLendarStudyEntity[] => {
  const key = selectedDay.value.format('YYYY-MM-DD')
  return studyMapStore.$state.calendar[key] || []
})
const { remembers } = storeToRefs(useRememberStore())
const { chapters } = storeToRefs(courseStore)
const treeData = computed((): TreeDataItem[] => {
  if (!chapters?.value) return []
  return chapters.value.map((chapter): DataNode => {
    const { chapterNumber, chapterName, figures } = chapter
    return {
      key: `${chapterNumber}`,
      title: `Chương ${chapterNumber}: ${chapterName}`,
      children: figures.map((figure): DataNode => {
        const { figureNumber, figureName } = figure
        return {
          key: `${chapterNumber}-${figureNumber}`,
          title: `Dạng ${figureNumber}: ${figureName}`,
        }
      }),
    }
  })
})

const mapContent = computed(() => {
  if (!chapters?.value) return []
  const mapStudyConfig: {
    figureConfig: CourseFigureChapter
    chapterNumber: number
    chapterName: string
  }[] = []
  chapters.value.forEach((chapter) => {
    const { chapterName, figures, chapterNumber } = chapter
    figures.forEach((figure) => {
      mapStudyConfig.push({
        figureConfig: figure,
        chapterName: ` Chương ${chapterNumber}: ${chapterName}`,
        chapterNumber,
      })
    })
  })
  return mapStudyConfig
})

async function joinQuizTestExam(period: number) {
  const sheetId = await quizStore.joinQuizTestExam({ period })
  navigateTo(`/quiz/attempt/${sheetId}`)
}
</script>

<style lang="scss" scoped>
.layout-sider {
  overflow: scroll;
  height: 80vh;
  background-color: #f5f5f5;
}
.ant-layout-sider:not(.ant-layout-sider-collapsed) {
  min-width: 320px !important;
}
</style>
