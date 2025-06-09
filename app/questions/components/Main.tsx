'use client'
import { removeFirstQuestion, setCount } from '@/redux/features/quiz-slice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState, useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'

interface QuestionsType {
  category: string
  correctAnswer: string
  incorrectAnswers: string[]
  question: string
  difficulty: string
  type: string
}

const shuffleArray = (array: string[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const Main = () => {
  const [isAnswered, setAnswered] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const count: number = useAppSelector((state) => state.quizReducer.value.count)
  const data: QuestionsType[] = useAppSelector(
    (state) => state.quizReducer.value.questions
  )

  useEffect(() => {
    if (!data || data.length === 0) {
      router.push('/results')
    }
  }, [data, router])

  const allAnswers = useMemo(() => {
    if (!data || !data[0]) return []
    return shuffleArray([...data[0].incorrectAnswers, data[0].correctAnswer])
  }, [data])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const value = (e.target as HTMLButtonElement).value
    if (data[0].correctAnswer === value) {
      dispatch(setCount(count + 1))
    }

    setAnswered(true)

    setTimeout(() => {
      dispatch(removeFirstQuestion())
      setAnswered(false)
    }, 2000)
  }

  const half = Math.ceil(allAnswers.length / 2)
  const left = allAnswers.slice(0, half)
  const right = allAnswers.slice(half)

  if (!data || !data[0]) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <Oval
          visible={true}
          height='80'
          width='80'
          color='#4fa94d'
          ariaLabel='oval-loading'
          wrapperStyle={{}}
          wrapperClass=''
        />
      </div>
    )
  }
  return (
    <div
      style={{ width: '100vw', height: '100vh' }}
      className='text-light d-flex align-items-center justify-content-center flex-column '
    >
      <h1 className='mb-5 text-break text-center'>{data[0].question}</h1>

      <div className='d-flex flex-column flex-md-row'>
        <div className='d-flex flex-column '>
          {left.map((answer, i) => (
            <button
              style={{
                minWidth: '12rem',
                minHeight: '4rem',
                whiteSpace: 'nowrap',
              }}
              key={i}
              className={`btn btn-lg ${
                answer === data[0].correctAnswer && isAnswered
                  ? 'btn-success'
                  : 'btn-primary'
              } m-1 px-1 py-1 my-2 mx-2`}
              onClick={(e) => handleClick(e)}
              value={answer}
            >
              {answer}
            </button>
          ))}
        </div>
        <div className='d-flex flex-column '>
          {right.map((answer, i) => (
            <button
              key={i}
              style={{
                minWidth: '12rem',
                minHeight: '4rem',
                whiteSpace: 'nowrap',
              }}
              value={answer}
              className={`btn btn-lg ${
                answer === data[0].correctAnswer && isAnswered
                  ? 'btn-success'
                  : 'btn-primary'
              } m-1 px-1 py-1 my-2 mx-2`}
              onClick={(e) => handleClick(e)}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Main
