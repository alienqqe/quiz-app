'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { setCount, setQuestions } from '@/redux/features/quiz-slice'
import { useRouter } from 'next/navigation'

const StartButton = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const categories: String[] = useAppSelector(
    (state) => state.quizReducer.value.categories
  )
  const difficulties: String[] = useAppSelector(
    (state) => state.quizReducer.value.difficulties
  )
  const limit: number = useAppSelector((state) => state.quizReducer.value.limit)

  const fetchQuestions = async () => {
    const categoryList = Array.from(categories).join(',')
    const difficultyList = Array.from(difficulties).join(',')
    console.log(limit)
    const url = `https://the-trivia-api.com/api/questions?limit=${limit}&categories=${categoryList}&difficulties=${difficultyList}`

    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    dispatch(setQuestions(data))
    dispatch(setCount(0))

    router.push('/questions')
  }

  useEffect(() => {
    console.log(categories)
    console.log(difficulties)
    console.log(limit)
  }, [limit, categories, difficulties])

  // if (isLoading) {
  //   return (
  //     <div
  //       className='d-flex justify-content-center align-items-center'
  //       style={{ height: '100vh' }}
  //     >
  //       <Oval
  //         visible={true}
  //         height='80'
  //         width='80'
  //         color='#4fa94d'
  //         ariaLabel='oval-loading'
  //         wrapperStyle={{}}
  //         wrapperClass=''
  //       />
  //     </div>
  //   )
  // }

  return (
    <div>
      <button
        className='btn btn-lg btn-primary mt-5 text-light'
        onClick={fetchQuestions}
        disabled={
          categories.length > 0 && limit > 0 && difficulties.length > 0
            ? false
            : true
        }
      >
        Click to Start
      </button>
    </div>
  )
}

export default StartButton
