<template>
  <div class="target-page">
    <CourseCarousel />
    <div class="target-title">
      <p>NHẬP THÔNG TIN ĐỂ TẠO LỘ TRÌNH CÁ NHÂN</p>
    </div>
    <a-row :gutter="[40, 40]">
      <a-col v-for="(rows, index) in splitCols" :key="index" :span="12">
        <a-flex
          v-for="item in rows"
          :key="item.id"
          :vertical="true"
          style="margin-top: 20px"
        >
          <label>
            {{ item.config.label }}
          </label>
          <a-select
            v-if="item.type === 'select'"
            v-model:value="data[item.id]"
            :options="item.config.options as DefaultOptionType[]"
          >
          </a-select>
          <a-input-number
            v-else
            v-model:value="data[item.id]"
            :min="item.config.min!"
            :max="item.config.max!"
            style="width: 100%"
          >
            <template #upIcon>
              <ArrowUpOutlined />
            </template>
            <template #downIcon>
              <ArrowDownOutlined />
            </template>
          </a-input-number>
        </a-flex>
      </a-col>
    </a-row>
    <a-flex
      :vertical="false"
      justify="space-between"
      class="tutorial-details"
      style="margin-top: 20px"
    >
      <div class="testTutorial" style="width: 65%">
        <p>Hướng dẫn làm bài trắc nghiệm:</p>
        <p>
          1. Click vào nút "Bắt đầu làm bài" để tiến hành làm bài thi <br />
          2. Ở mỗi câu hỏi, chọn đáp án đúng <br />
          3. Hết thời gian làm bài, hệ thống tự thu bài. Bạn có thể nộp bài
          trước khi thời gian kết thúc bằng cách ấn vào nút nộp bài.
        </p>
      </div>
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          width: 35%;
        "
      >
        <a-button type="primary" @click="onSubmit">Bắt đầu làm bài</a-button>
      </div>
    </a-flex>
  </div>
</template>
<script setup lang="ts">
import type { DefaultOptionType } from 'ant-design-vue/es/select'
import { COURSE_ID } from '~/constants/course'
import { createMap } from '~/helper/create-map'

definePageMeta({
  layout: 'course',
})

interface selectType {
  id: string
  type: 'inputNumber' | 'select'
  config: {
    label: string
    min?: number
    max?: number
    options?: {
      value: unknown
      label: string
      disabled?: boolean
    }[]
  }
}

const chapters = useCourseStore().$state.chapters
const figures: {
  value: unknown
  label: string
}[] = []

chapters?.map((chapter) => {
  if (chapter.chapterNumber < 2) return
  chapter.figures.map((figure) => {
    figures.push({
      value: `${chapter.chapterNumber} ${figure.figureNumber}`.toString(),
      label: `Chương ${chapter.chapterNumber}: ${figure.figureName}`,
    })
  })
})

const selectConfig: selectType[] = [
  {
    id: 'score',
    type: 'select',
    config: {
      label: 'Điểm mong muốn (Thang 15):',
      options: [
        {
          value: '0-2',
          label: '0-2',
        },
        {
          value: '3-7',
          label: '3-7',
        },
        {
          value: '8-13',
          label: '8-13',
        },
        {
          value: '14-15',
          label: '14-15',
        },
      ],
    },
  },
  {
    id: 'period',
    type: 'select',
    config: {
      label: 'Chọn kì thi',
      options: [
        {
          value: 1,
          label: 'Kì giữa kì 1',
          disabled: true,
        },
        {
          value: 2,
          label: 'Kì giữa kì 2',
        },
        {
          value: 3,
          label: 'Kì cuối kì',
          disabled: true,
        },
      ],
    },
  },
  {
    id: 'remainDays',
    type: 'inputNumber',
    config: {
      label: 'Số ngày còn lại:',
      min: 0,
      max: 365,
    },
  },
  {
    id: 'studiedChapter',
    type: 'select',
    config: {
      label: 'Chọn chương đã học tới:',
      options: figures,
    },
  },
]

const halfLength = Math.floor(selectConfig.length / 2)

const splitCols = [
  selectConfig.slice(0, halfLength),
  selectConfig.slice(halfLength),
]

interface dataType {
  score: number
  period: number
  remainDays: number
  studiedChapter: string
}

const data = reactive<dataType>({
  score: 0,
  period: 0,
  remainDays: 0,
  studiedChapter: '',
})

const { startLoading, finishLoading } = useLoading()

async function onSubmit() {
  if (!data.score || !data.period || !data.remainDays || !data.studiedChapter) {
    message.error('Vui lòng nhập đầy đủ thông tin')
    return
  }
  startLoading()
  const target = `${data.period}-${data.score}`
  const studyPath = createMap(target, data.remainDays * 14)
  const sheetId = await useCourseStore().submitTarget({
    remainDays: data.remainDays,
    studyPath,
    score: data.score,
    period: data.period,
    studiedChapter: data.studiedChapter
      .split(' ')
      .map((item) => parseInt(item)),
    courseId: COURSE_ID,
  })
  useRouter().push(`/quiz/attempt/${sheetId}`)
  finishLoading()
}
</script>
<style scoped lang="scss">
.target-title {
  align-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: $yellow;
  margin-top: 20px;
  margin-bottom: 20px;
}

.target-page {
  margin: 0 10% 0 10%;
}
</style>
