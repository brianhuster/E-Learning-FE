import { Modal } from 'ant-design-vue'

export const openConfirmSubmitSheet = () => {
  const quizStore = useQuizStore()
  Modal.confirm({
    title: 'Bạn muốn nộp bài?',
    content: 'Bạn sẽ không thể sửa bài sau khi nộp bài.',
    okText: 'Submit',
    cancelText: 'Cancel',
    onOk: async () => {
      try {
        await quizStore.submitQuizSheet()
        openResultSubmitSheet()
      } catch (error) {}
    },
  })
}
