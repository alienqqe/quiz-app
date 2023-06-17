'use client'
import React, { useEffect, useState } from 'react'

const Questions = () => {
  const [data, setData]: any[] = useState([])

  const fetchQuestions = async () => {
    const res = await fetch('https://the-trivia-api.com/api/questions')
    const resJSON = await res.json()

    setData(resJSON)
    console.log(data)
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  return (
    <div className='text-light text-center'>
      <h3 className='mt-5'>{data[0]?.question}</h3>
    </div>
  )
}

export default Questions
