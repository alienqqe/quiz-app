'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Questions = () => {
  const [data, setData]: any[] = useState([])
  const [isSelected, setSelected] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(
    sessionStorage.getItem('count')
  )

  useEffect(() => {
    sessionStorage.setItem('count', correctAnswersCount)
    setCorrectAnswersCount(sessionStorage.getItem('count'))
    console.log(sessionStorage.getItem('count'))
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
        <h3>2/9</h3>
      </div>
      <h3 className='mt-5'>{data[0]?.question}</h3>
      <div className='container w-50'>
        <div className=' d-flex align-items-center justify-content-center'>
          <form action=''>
            <div className='answers'>
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
              <button
                onClick={handleAnswerClick}
                className=' col-6 my-3 mt-4 mx-1  w-75 btn btn-secondary'
                value={data[0]?.incorrectAnswers[2]}
                name='answer'
                disabled={isSelected ? true : false}
                style={
                  isSelected
                    ? { backgroundColor: '#e33e32' }
                    : { backgroundColor: '#6c757d ' }
                }
              >
                {data[0]?.incorrectAnswers[2]}
              </button>{' '}
            </div>
            <div className='answers-2'>
              {' '}
              <button
                onClick={handleAnswerClick}
                className='col-6 my-3 mt-4 mx-1 w-75 btn btn-secondary'
                value={data[0]?.correctAnswer}
                name='answer'
                disabled={isSelected ? true : false}
                style={
                  isSelected
                    ? { backgroundColor: 'green' }
                    : { backgroundColor: '#6c757d ' }
                }
              >
                {' '}
                {data[0]?.correctAnswer}{' '}
              </button>{' '}
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
            </div>
          </form>
        </div>
      </div>
      <div>
        {isSelected ? (
          <button className='btn btn-success mt-5'>
            <Link href='/questions/3'>Next Question</Link>
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Questions
