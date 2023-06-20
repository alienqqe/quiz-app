'use client'
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'

const Questions = () => {
  const [data, setData]: any[] = useState([])
  const [isSelected, setSelected] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(
    sessionStorage.getItem('count')
  )
  const [randomQuestionNumber, setRandomQuestionNumber] = useState<number>()

  useLayoutEffect(() => {
    const randomNumber = Math.floor(Math.random() * 2)
    setRandomQuestionNumber(randomNumber)
  }, [])

  // Inline styles
  const rightIsSelectedAnswerStyle0 = isSelected
    ? randomQuestionNumber === 0
      ? { backgroundColor: '#32e358' }
      : { backgroundColor: '#e33e32 ' }
    : { backgroundColor: '#6c757d ' }

  const rightIsSelectedAnswerStyle1 = isSelected
    ? randomQuestionNumber === 1
      ? { backgroundColor: '#32e358' }
      : { backgroundColor: '#e33e32 ' }
    : { backgroundColor: '#6c757d' }

  // Inline styles

  useEffect(() => {
    sessionStorage.setItem('count', correctAnswersCount)
  }, [correctAnswersCount])

  const handleAnswerClick = (e: any) => {
    e.preventDefault()
    setSelected(!isSelected)

    if (e.target.value === data[0]?.correctAnswer) {
      setCorrectAnswersCount(parseInt(sessionStorage.getItem('count')) + 1)
      console.log(correctAnswersCount)
    }
  }

  const fetchQuestions = async () => {
    const res = await fetch('https://the-trivia-api.com/api/questions')
    const resJSON = await res.json()

    setData(resJSON)
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  return (
    <div className='d-block text-light text-center'>
      <div className='text-end me-2 mt-2'>
        <h3>5/9</h3>
      </div>
      <h3 className='mt-5'>{data[0]?.question}</h3>
      <div className='container w-50'>
        <div className=' d-flex align-items-center justify-content-center'>
          <form action=''>
            <div className='answers'>
              <button
                onClick={handleAnswerClick}
                className='col-6 my-3 mt-4 mx-1 w-75  btn btn-secondary'
                value={data[0]?.incorrectAnswers[1]}
                name='answer'
                disabled={isSelected ? true : false}
                style={
                  isSelected
                    ? { backgroundColor: '#e33e32' }
                    : { backgroundColor: '#6c757d ' }
                }
              >
                {data[0]?.incorrectAnswers[1]}
              </button>{' '}
              <button
                onClick={handleAnswerClick}
                className='col-6 my-3 mt-4 mx-1 w-75 btn btn-secondary'
                value={
                  randomQuestionNumber === 1
                    ? data[0]?.correctAnswer
                    : data[0]?.incorrectAnswers[2]
                }
                name='answer'
                disabled={isSelected ? true : false}
                style={{ ...rightIsSelectedAnswerStyle1 }}
              >
                {' '}
                {randomQuestionNumber === 1
                  ? data[0]?.correctAnswer
                  : data[0]?.incorrectAnswers[2]}
              </button>{' '}
              <button
                onClick={handleAnswerClick}
                className='col-6 my-3 mt-4 mx-1 w-75 btn btn-secondary'
                name='answer'
                disabled={isSelected ? true : false}
                value={data[0]?.incorrectAnswers[0]}
                style={
                  isSelected
                    ? { backgroundColor: '#e33e32' }
                    : { backgroundColor: '#6c757d ' }
                }
              >
                {data[0]?.incorrectAnswers[0]}
              </button>{' '}
            </div>
            <div className='answers-2'>
              <button
                onClick={handleAnswerClick}
                className=' col-6 my-3 mt-4 mx-1  w-75 btn btn-secondary'
                value={
                  randomQuestionNumber === 0
                    ? data[0]?.correctAnswer
                    : data[0]?.incorrectAnswers[2]
                }
                name='answer'
                disabled={isSelected ? true : false}
                style={{ ...rightIsSelectedAnswerStyle0 }}
              >
                {randomQuestionNumber === 0
                  ? data[0]?.correctAnswer
                  : data[0]?.incorrectAnswers[2]}
              </button>{' '}
            </div>
          </form>
        </div>
      </div>
      <div>
        {isSelected ? (
          <button className='btn btn-success mt-5'>
            <Link href='/questions/6'>Next Question</Link>
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Questions
