'use client'
import { apiFetch } from '@/app/components/AuthForm'
import { AppDispatch, useAppSelector } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Score = () => {
  const count = useAppSelector((state) => state.quizReducer.value.count)
  const limit = useAppSelector((state) => state.quizReducer.value.limit)
  const accessToken = useAppSelector((state) => state.authReducer.value.token)
  const dispatch = useDispatch<AppDispatch>()
  const [isLoading, setLoading] = useState(true)

  const data = useAppSelector((state) => state.quizReducer.value.questions)
  const categories = useAppSelector(
    (state) => state.quizReducer.value.categories
  )
  const difficulties = useAppSelector(
    (state) => state.quizReducer.value.difficulties
  )

  const quiz = {
    id: crypto.randomUUID(),
    count: count,
    limit: limit,
    categories: categories,
    difficulties: difficulties,
  }

  useEffect(() => {
    const pushQuiz = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/history/pushQuiz`
        const data = await apiFetch(
          url,
          {
            method: 'POST',
            body: JSON.stringify({
              quiz: quiz,
            }),
            headers: { 'Content-Type': 'application/json' },
          },
          accessToken,
          dispatch
        )
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    pushQuiz()
  }, [])

  if (!data || !data[0]) {
    return <></>
  }

  return (
    <div className='position-absolute top-0 end-0 me-5 mt-5 text-light'>
      <h5>{`${count} / ${limit}`}</h5>
    </div>
  )
}

export default Score
