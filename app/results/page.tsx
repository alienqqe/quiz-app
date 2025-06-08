'use client'
import {
  setCategoriesGlobally,
  setCount,
  setDifficultiesGlobally,
  setLimitGlobally,
} from '@/redux/features/quiz-slice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

const page = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const count = useAppSelector((state) => state.quizReducer.value.count)
  const limit = useAppSelector((state) => state.quizReducer.value.limit)

  const handleClick = () => {
    router.push('/')
    dispatch(setCategoriesGlobally([]))
    dispatch(setDifficultiesGlobally([]))
    dispatch(setLimitGlobally(1))
  }
  return (
    <div
      className='text-light d-flex align-items-center justify-content-center flex-column'
      style={{ height: '100vh' }}
    >
      <h1>
        Your score is {count} / {limit}
      </h1>

      <button className='btn btn-primary mt-4' onClick={handleClick}>
        Back to home
      </button>
    </div>
  )
}

export default page
