import React from 'react'
import NavigationBar from '../components/NavigationBar'
import QuizHistory from './components/QuizHistory'

const page = () => {
  return (
    <div>
      <NavigationBar buttonLabel='Home' />
      <div>
        <QuizHistory />
      </div>
    </div>
  )
}

export default page
