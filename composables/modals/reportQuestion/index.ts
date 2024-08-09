import { useQuizStore } from '#imports'
import { Input } from 'ant-design-vue'

export const openModalReportQuestion = () => {
  let reason = ''
  const quizStore = useQuizStore()
  return Modal.confirm({
    title: 'Báo cáo câu hỏi',
    content: h(Input, {
      placeholder: 'Nhập lý do báo cáo',
      autofocus: true,
      onChange: (value) => (reason = value.target.value ?? ''),
    }),
    okText: 'Báo cáo',
    cancelText: 'Hủy',
    onOk: async () => {
      try {
        await quizStore.reportQuestion(reason)
        message.success('Báo cáo thành công')
      } catch (error) {
        console.error(error)
        message.error('Báo cáo thất bại')
      }
    },
  })
}
