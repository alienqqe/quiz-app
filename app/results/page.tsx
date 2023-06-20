'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const page = () => {
  const [correctAnswersCount, setCorrectAnswersCount] = useState<string>(
    sessionStorage.getItem('count')
  )

  useEffect(() => {
    sessionStorage.setItem('count', correctAnswersCount)
    setCorrectAnswersCount(sessionStorage.getItem('count'))
    console.log(sessionStorage.getItem('count'))
  }, [correctAnswersCount])

  return (
    <div className='text-light text-center mt-5 pt-5'>
      <h1 className='p-3'>Your result:</h1>
      <h3 className='p-3'>{correctAnswersCount}/9</h3>
      <p className='p-3'>
        {correctAnswersCount > 5 ? 'Awesome!' : 'You will be lucky next time'}
      </p>

      <button className='btn btn-success'>
        {correctAnswersCount > 5 ? (
          <Link href='/questions/1'>Play Again</Link>
        ) : (
          <Link href='/questions/1'>Try Again</Link>
        )}
      </button>
      <button className='btn btn-secondary px-4 ms-2'>
        <Link href='/'>Home</Link>
      </button>
    </div>
  )
}

export default page
