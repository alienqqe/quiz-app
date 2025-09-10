'use client'
import { apiFetch } from '@/app/components/AuthForm'
import { AppDispatch, useAppSelector } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface QuizItem {
  id: string
  count: number
  limit: number
  categories?: string[]
  difficulties?: string[]
}

interface ErrorResponse {
  message: string
}

const QuizHistory = () => {
  const [historyData, setHistory] = useState<QuizItem[]>([])
  const accessToken = useAppSelector((state) => state.authReducer.value.token)
  const dispatch = useDispatch<AppDispatch>()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/history/getHistory`,
          {},
          accessToken,
          dispatch
        )

        const jsonData = await data.json()

        if (!data.ok) {
          const err = jsonData as ErrorResponse
          setError(err.message || 'Something went wrong')
          return
        }

        setHistory(jsonData as QuizItem[])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return

    try {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/history/${id}`,
        { method: 'DELETE' },
        accessToken,
        dispatch
      )

      const json = await res.json()

      if (!res.ok) {
        const err = json as ErrorResponse
        alert(err.message || 'Failed to delete record')
        return
      }

      setHistory((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error(err)
      alert('Error deleting record')
    }
  }

  useEffect(() => {
    console.log(historyData)
  }, [historyData])

  return (
    <div
      className='text-white d-flex flex-column align-items-center'
      style={{ paddingTop: '80px', height: '100vh' }}
    >
      <h1 className='mb-4'>Your Past Quizzes</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className='text-danger'>{error}</p>}

      <div
        className='w-100'
        style={{
          maxWidth: '600px',
          overflowY: 'auto',
          flex: 1,
          paddingRight: '8px',
        }}
      >
        {historyData.length === 0 && !isLoading && (
          <p className='text-center'>No past quizzes yet.</p>
        )}

        {historyData.map((quiz, index) => (
          <div key={index} className='shadow-lg bg-secondary rounded mb-3 p-3'>
            <p>
              <strong>Score:</strong> {quiz.count} / {quiz.limit}
            </p>
            {quiz.categories && quiz.categories.length > 0 && (
              <p>
                <strong>Categories:</strong> {quiz.categories.join(', ')}
              </p>
            )}
            {quiz.difficulties && quiz.difficulties.length > 0 && (
              <p>
                <strong>Difficulties:</strong> {quiz.difficulties.join(', ')}
              </p>
            )}
            <button
              className='btn btn-danger btn-sm mt-2'
              onClick={() => handleDelete(quiz.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizHistory
