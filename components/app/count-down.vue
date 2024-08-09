<template>
  <a-card title="Thời gian còn lại" class="count-down">
    <a-typography-text class="time">{{ time }}</a-typography-text>
  </a-card>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    // Thời gian bắt đầu (timestamp)
    endTime: {
      type: Number,
      required: true,
    },
  },
  name: 'CountDown',
  data() {
    return {
      // Thời gian hiện tại
      currentTime: 0,
      // Khoảng cách thời gian
      interval: null as NodeJS.Timeout | null | number,
      // Biến cờ để kiểm tra trạng thái đếm
      isCounting: false,
    }
  },
  computed: {
    diffTime() {
      if (!this.isCounting) return 0
      return this.endTime - this.currentTime
    },
    // Tính toán thời gian còn lại
    time() {
      return this.formatTime(this.diffTime)
    },
  },
  methods: {
    // Bắt đầu đếm ngược
    startCountDown() {
      this.isCounting = true
      this.currentTime = Date.now()
      this.interval = setInterval(() => {
        this.currentTime = Date.now()
        if (this.diffTime <= 0) {
          this.endCountDown()
        }
      }, 1000)
      // Emit sự kiện startCountDown
      this.$emit('start')
    },
    // Định dạng thời gian
    formatTime(diff: number) {
      const seconds = Math.floor(diff / 1000) % 60
      const minutes = Math.floor(diff / (1000 * 60)) % 60
      const hours = Math.floor(diff / (1000 * 60 * 60))
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    // Kết thúc đếm
    endCountDown() {
      clearInterval(this.interval!)
      this.isCounting = false
      // Emit sự kiện endCountDown
      console.log('finish')
      this.$emit('finish')
    },
  },
  // Khởi tạo và hủy bỏ interval
  mounted() {
    this.startCountDown()
  },
  onBeforeUnmount() {
    this.endCountDown()
  },
})
</script>

<style scoped lang="scss">
.count-down {
  text-align: center;

  .time {
    font-size: 24px;
    text-align: center;
    color: $red;
    font-weight: bold;
  }
}
</style>
