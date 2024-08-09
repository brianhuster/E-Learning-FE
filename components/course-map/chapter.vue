<template>
  <a-card>
    <template #title>
      <a-space>
        <a-typography-title
          :level="4"
          style="word-wrap: break-word; white-space: normal; color: white"
        >
          <BookOutlined />
          {{ chapterName }}
        </a-typography-title>
      </a-space>
    </template>
    <a-flex vertical justify="center" align="center">
      <a-typography-title
        :level="4"
        style="word-wrap: break-word; white-space: normal; text-align: center"
      >
        {{ figureName }}
      </a-typography-title>
      <AppIconTask type="theory" class="icon" @click="showModal" />
      <a-modal
        title="Document"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <div v-for="doc in figureConfig.documents" :key="doc.url">
          <iframe
            v-if="visible && doc.url"
            :src="getUrl(doc.url)"
            width="100%"
            height="500px"
          ></iframe>
        </div>
      </a-modal>

      <a-popover placement="right" v-for="i in 4">
        <template #content>
          <a-space v-if="lvs?.includes(i)" direction="vertical">
            <a-typography-text> Lần: {{ period }} </a-typography-text>
            <a-typography-text> Điểm: {{ groupPoint }} </a-typography-text>
          </a-space>
        </template>
        <AppIconTask
          :id="`M${i}-D${figureConfig.figureNumber}-C${chapterNumber}`"
          @click="joinQuizLevel(i)"
          :disabled="!getCanStudyThisLevel(i)"
          :type="i"
          :class="[
            'icon',
            {
              '-left': i % 2 === 0,
              '-right': i % 2 === 1,
            },
          ]"
        />
      </a-popover>
      <AppIconTask
        type="end"
        :disabled="!canStudyThisFigure"
        class="icon"
        :id="figureId"
        @click="joinQuizEndFigure"
      />
    </a-flex>
  </a-card>
</template>

<script lang="ts" setup>
import { tartGetStudyPath } from '~/helper/create-map'
import { slitIdToNumbers } from '~/utils'

const props = defineProps<{
  figureConfig: CourseFigureChapter
  chapterName: string
  chapterNumber: number
}>()
const figureId = `D${props.figureConfig.figureNumber}-C${props.chapterNumber}`
const quizStore = useQuizStore()
const mapStore = useStudyMapStore()
const currentStudy = computed((): number => {
  if (!mapStore.currentStudy) return 0
  return slitIdToNumbers(mapStore.currentStudy.element)
    .reverse()
    .reduce((acc, cur, i) => {
      return acc * 100 + cur
    }, 0)
})
const groupTarget = Object.entries(tartGetStudyPath).find(
  ([key, { members }]) => {
    const studyNodeIds = Array.from(
      { length: 4 },
      (_, i) => `M${i}-${figureId}`
    )
    return members.some((member) => studyNodeIds.includes(member))
  }
)
const [group = '', member] = groupTarget ?? []
const groupPoint = group.split('-').slice(1).join('-')
const period = group.split('-')[0]
const lvs = member?.members.reduce((acc, cur) => {
  const [m, f, c] = slitIdToNumbers(cur)
  if (f === props.figureConfig.figureNumber && c === props.chapterNumber)
    acc.push(m)
  return acc
}, [] as number[])

const canStudyThisFigure = computed(() => {
  const { figureNumber } = props.figureConfig
  const value = figureNumber * 100 + props.chapterNumber * 10000
  return currentStudy.value >= value
})
function getCanStudyThisLevel(level: number) {
  const { figureNumber } = props.figureConfig
  const value = figureNumber * 100 + props.chapterNumber * 10000 + level
  return currentStudy.value >= value
}

const {
  figureConfig: { figureName },
} = props

async function joinQuizLevel(level: number) {
  if (!getCanStudyThisLevel(level))
    return notification.error({
      message: 'Bạn cần hoàn thành các nhiệm vụ trước đó.',
    })
  const sheetId = await quizStore.joinQuizLevel({
    level,
    figure: props.figureConfig.figureNumber,
    chapter: props.chapterNumber,
  })
  navigateTo(`/quiz/attempt/${sheetId}`)
}

async function joinQuizEndFigure() {
  const sheetId = await quizStore.joinQuizEndFigure({
    figureId,
  })
  navigateTo(`/quiz/attempt/${sheetId}`)
}

const visible = ref(false)

const showModal = () => {
  console.log(visible)
  visible.value = true
}

const handleOk = () => {
  visible.value = false
}

const handleCancel = () => {
  visible.value = false
}

const getUrl = (url: string) => {
  const base = url.split('/view')[0]
  // Append '/preview' to the base URL
  return `${base}/preview`
}
</script>

<style scoped lang="scss">
::v-deep(.ant-card-head) {
  background-color: $blue;
}

.icon {
  width: 5em;
  height: 5em;
  cursor: pointer;
  &.-left {
    margin-right: 5em;
  }
  &.-right {
    margin-left: 5em;
  }
}
</style>
