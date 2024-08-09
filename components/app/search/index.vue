<template>
  <a-card>
    <template #title>
      <a-space direction="vertical">
        <a-input-search placeholder="input search loading deault" disabled />
        <a-flex gap="large">
          <a-button
            type="primary"
            @click="showSearchPopup[item] = true"
            v-for="item in searchTypes"
            :key="item"
          >
            Search by {{ item }}
          </a-button>
        </a-flex>
      </a-space>
    </template>
    <a-flex vertical align="center" gap="large">
      <a-card
        hoverable
        v-for="(item, index) in searchResults"
        :key="item.title"
        style="width: 100%"
        :class="{ selected: selectedIndex === index }"
        @click="() => (selectedIndex = index)"
      >
        <a-flex align="center" gap="large">
          <app-image
            :src="item.imageUrl"
            :fallback="'/placeholder.png'"
            :width="100"
          />
          <a-space direction="vertical">
            <a-typography-title :level="4">{{ item.title }}</a-typography-title>
            <a-typography-text
              v-for="line in item.description.split('\n')"
              :key="line"
            >
              {{ line }}
            </a-typography-text>
          </a-space>
        </a-flex>
      </a-card>
      <a-pagination
        :total="searchResults?.length * 10"
        v-model:current="currentPage"
        v-model:pageSize="pageSize"
        @change="handlePageChange"
      />
    </a-flex>
    <!-- Popup for Search by ID -->
    <a-modal
      v-model:open="showSearchPopup[item]"
      :title="`Search by ${item}`"
      :footer="null"
      v-for="item in searchTypes"
      :key="item"
    >
      <a-input v-model:value="query[item]" :placeholder="`Enter ${item}`" />
      <a-button type="primary" @click="search(item)">Search</a-button>
      <a-button @click="clearSearch(item)">Clear</a-button>
    </a-modal>
  </a-card>
</template>

<script setup lang="ts">
const query = defineModel<Record<string, string>>('query', {
  required: true,
})
const selectedIndex = defineModel<number>('selectedIndex')
const searchResults = defineModel<
  { imageUrl: string; title: string; description: string }[]
>('searchResults', { required: true })
const { page, limit, ...restQuery } = query.value

const currentPage = computed({
  get: () => Number(query.value.page) || 0,
  set: (value: number) => {
    query.value.page = String(value)
  },
})
const pageSize = computed({
  get: () => Number(query.value.limit) || 20,
  set: (value: number) => {
    query.value.limit = String(value)
  },
})
const props = defineProps<{
  searchFunction: (query: Record<string, string>) => Promise<any>
  initSearch?: boolean
}>()

const searchWrapper = async () => {
  selectedIndex.value = 0
  //filter key with empty value

  const filteredQuery = Object.fromEntries(
    Object.entries(query.value).filter(
      ([_, value]) => ![undefined, ''].includes(value)
    )
  )
  useRouter().push({ query: filteredQuery })
  await props.searchFunction(filteredQuery)
}

const handlePageChange = searchWrapper
const searchTypes = Object.keys(restQuery)

const showSearchPopup = reactive(
  searchTypes.reduce((acc, type) => {
    acc[type] = false
    return acc
  }, {} as Record<string, boolean>)
)

const search = async (type: string) => {
  await searchWrapper()
  showSearchPopup[type] = false
}

const clearSearch = async (type: string) => {
  query.value[type] = ''
  showSearchPopup[type] = false
  await searchWrapper()
}

onMounted(() => {
  if (props.initSearch) {
    return searchWrapper()
  }
})
</script>

<style scoped lang="scss">
.selected {
  border-color: $blue;
  background-color: $primary;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
    0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
}
</style>
