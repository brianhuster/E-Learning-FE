export const API_URL = useRuntimeConfig().public.apiBase

export interface EndPointConfigEntity {
  path: string
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
}

export const QUIZ_ENDPOINT: Record<string, EndPointConfigEntity> = {
  joinQuiz: {
    path: `${API_URL}/quiz`,
    method: 'POST',
  },
  joinQuizInput: {
    path: `${API_URL}/quiz/input`,
    method: 'POST',
  },
  joinQuizEndFigure: {
    path: `${API_URL}/quiz/end-figure`,
    method: 'POST',
  },
  submitQuiz: {
    path: `${API_URL}/quiz`,
    method: 'PATCH',
  },
  submitAnswer: {
    path: `${API_URL}/quiz`,
    method: 'PUT',
  },
  getQuizSession: {
    path: `${API_URL}/quiz/{sessionId}`,
    method: 'GET',
  },
  submitSurvey: {
    path: `${API_URL}/quiz/survey`,
    method: 'PATCH',
  },
  joinQuizLevel: {
    path: `${API_URL}/quiz/level`,
    method: 'POST',
  },
  joinQuizTestExam: {
    path: `${API_URL}/quiz/test-exam`,
    method: 'POST',
  },
}

export const NOTIFICATION_ENDPOINT: Record<string, EndPointConfigEntity> = {
  reportQuestion: {
    path: `${API_URL}/notifications/report`,
    method: 'POST',
  },
  getNotification: {
    path: `${API_URL}/notifications`,
    method: 'GET',
  },
  makeRead: {
    path: `${API_URL}/notifications/read/{id}`,
    method: 'PATCH',
  },
}

export const COURSE_ENDPOINT: Record<string, EndPointConfigEntity> = {
  getCourseById: {
    path: `${API_URL}/course/{courseId}`,
    method: 'GET',
  },
  submitTarget: {
    path: `${API_URL}/study-path`,
    method: 'POST',
  },
}

export const USER_ENDPOINT: Record<string, EndPointConfigEntity> = {
  login: {
    path: `${API_URL}/auth/login`,
    method: 'POST',
  },
  register: {
    path: `${API_URL}/auth/register`,
    method: 'POST',
  },
  profile: {
    path: `${API_URL}/auth/profile`,
    method: 'GET',
  },
  getMission: {
    path: `${API_URL}/mission`,
    method: 'GET',
  },
  getStudyPath: {
    path: `${API_URL}/study-path`,
    method: 'GET',
  },
  getUsers: {
    path: `${API_URL}/users`,
    method: 'GET',
  },
  editUser: {
    path: `${API_URL}/users/{userId}`,
    method: 'PATCH',
  },
  deleteUser: {
    path: `${API_URL}/users/{userId}`,
    method: 'DELETE',
  },
}

export const MANAGER_QUESTION_ENDPOINT: Record<string, EndPointConfigEntity> = {
  getQuestions: {
    path: `${API_URL}/questions`,
    method: 'GET',
  },
  createQuestion: {
    path: `${API_URL}/questions`,
    method: 'POST',
  },
  editQuestion: {
    path: `${API_URL}/questions/{questionId}`,
    method: 'PATCH',
  },
  deleteQuestion: {
    path: `${API_URL}/questions/{questionId}`,
    method: 'DELETE',
  },
}
