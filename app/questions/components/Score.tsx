'use client'
import { useAppSelector } from '@/redux/store'
import React from 'react'

const Score = () => {
  const count = useAppSelector((state) => state.quizReducer.value.count)
  const limit = useAppSelector((state) => state.quizReducer.value.limit)

  const data = useAppSelector((state) => state.quizReducer.value.questions)

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
