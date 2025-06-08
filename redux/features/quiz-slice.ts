import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface QuestionsType {
  category: string
  correctAnswer: string
  incorrectAnswers: string[]
  question: string
  difficulty: string
  type: string
}

type InitialState = {
  value: QuizState
}

type QuizState = {
  count: number
  questions: QuestionsType[]
  limit: number
  difficulties: String[]
  categories: String[]
}

const initialState = {
  value: {
    count: 0,
    questions: [],
    limit: 1,
    difficulties: [],
    categories: [],
  } as QuizState,
} as InitialState

export const quiz = createSlice({
  name: 'quiz',
  initialState: initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.value.count = action.payload
    },
    setQuestions: (state, action: PayloadAction<QuestionsType[]>) => {
      state.value.questions = action.payload
    },
    setLimitGlobally: (state, action: PayloadAction<number>) => {
      state.value.limit = action.payload
    },
    setCategoriesGlobally: (state, action: PayloadAction<String[]>) => {
      state.value.categories = action.payload
    },
    setDifficultiesGlobally: (state, action: PayloadAction<String[]>) => {
      state.value.difficulties = action.payload
    },
    removeFirstQuestion: (state) => {
      state.value.questions = state.value.questions.slice(1)
    },
  },
})

export const {
  setCount,
  setQuestions,
  setLimitGlobally,
  setCategoriesGlobally,
  setDifficultiesGlobally,
  removeFirstQuestion,
} = quiz.actions
export default quiz.reducer
