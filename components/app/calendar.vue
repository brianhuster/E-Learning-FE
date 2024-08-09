<template>
  <a-card>
    <template #title>
      <a-typography-title :level="3"
        >Còn lại {{ remainDays || 0 }} ngày</a-typography-title
      >
    </template>
    <a-calendar
      v-model:value="value"
      :fullscreen="false"
      @panelChange="onPanelChange!"
    >
      <template
        #headerRender="{ value: current, type, onChange, onTypeChange }"
      >
        <div style="padding: 10px">
          <a-row type="flex" justify="space-between">
            <a-col>
              <a-radio-group
                size="small"
                :value="type"
                @change="(e) => onTypeChange(e.target.value)"
              >
                <a-radio-button value="month">Month</a-radio-button>
                <a-radio-button value="year">Year</a-radio-button>
              </a-radio-group>
            </a-col>
            <a-col>
              <a-select
                size="small"
                :dropdown-match-select-width="false"
                class="my-year-select"
                :value="String(current.year())"
                @change="
                  (newYear) => {
                    onChange(current.year(+newYear!))
                  }
                "
              >
                <a-select-option
                  v-for="val in getYears(current)"
                  :key="String(val)"
                  class="year-item"
                >
                  {{ val }}
                </a-select-option>
              </a-select>
            </a-col>
            <a-col>
              <a-select
                size="small"
                :dropdown-match-select-width="false"
                :value="String(current.month())"
                @change="
                  (selectedMonth) => {
                    onChange(current.month(parseInt(String(selectedMonth), 10)))
                  }
                "
              >
                <a-select-option
                  v-for="(val, index) in getMonths(current)"
                  :key="String(index)"
                  class="month-item"
                >
                  {{ val }}
                </a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </div>
      </template>
      <template #dateFullCellRender="{ current }">
        <a-popover v-if="getStudyNotif(current)">
          <template #title>
            <a-typography-text
              v-if="getStudyNotif(current)?.every(({ complete }) => complete)"
              type="success"
              ><CheckCircleFilled /> Đã hoàn thành</a-typography-text
            >
            <a-typography-text v-else type="danger"
              ><CloseCircleFilled /> Chưa hoàn thành</a-typography-text
            >
          </template>
          <!-- <template #content>
            <a-space direction="vertical">
              <a-typography-text
                type="secondary"
                v-for="(item, index) in getStudyNotif(current)"
                :key="index"
                >{{ item.message }}</a-typography-text
              >
            </a-space>
          </template> -->
          <a-typography-text
            :disabled="!isSameMonth(current)"
            :strong="isSameDay(current, today)"
            :mark="isSameDay(current, value as Dayjs)"
            type="danger"
            >{{ current.date() }}</a-typography-text
          >
        </a-popover>
        <a-typography-text
          v-else
          :disabled="!isSameMonth(current)"
          :strong="isSameDay(current, today)"
          :mark="isSameDay(current, value as Dayjs)"
          >{{ current.date() }}</a-typography-text
        >
      </template>
    </a-calendar>
  </a-card>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue'
const today = dayjs()
const studyMapStore = useStudyMapStore()
const { remainDays, calendar } = studyMapStore.$state

const value = defineModel<Dayjs>()

function getStudyNotif(value: Dayjs): CaLendarStudyEntity[] | undefined {
  const dateString = value.format('YYYY-MM-DD')
  if (!calendar) return
  return calendar[dateString]
}

function isSameMonth(day: Dayjs): boolean {
  return day.month() === value.value?.month()
}

function isSameDay(day1: Dayjs, day2: Dayjs): boolean {
  return day1.isSame(day2, 'date')
}

const onPanelChange = (value: Dayjs, mode: string) => {}

const getMonths = (value: Dayjs) => {
  const localeData = value.localeData()
  const months = []
  for (let i = 0; i < 12; i++) {
    months.push(localeData.monthsShort(value.month(i)))
  }
  return months
}

const getYears = (value: Dayjs) => {
  const year = value.year()
  const years = []
  for (let i = year - 10; i < year + 10; i += 1) {
    years.push(i)
  }
  return years
}
</script>
