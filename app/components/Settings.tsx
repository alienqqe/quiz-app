'use client'
import {
  setCategoriesGlobally,
  setCount,
  setDifficultiesGlobally,
  setLimitGlobally,
} from '@/redux/features/quiz-slice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const categoriesList = [
  'music',
  'sport_and_leisure',
  'film_and_tv',
  'arts_and_literature',
  'history',
  'society_and_culture',
  'science',
  'geography',
  'food_and_drink',
  'general_knowledge',
]

const Settings = () => {
  const [difficulties, setDifficulties] = useState<Set<String>>(new Set())
  const [categories, setCategories] = useState<Set<String>>(new Set())

  const dispatch = useDispatch<AppDispatch>()
  const limit: number = useAppSelector((state) => state.quizReducer.value.limit)
  const reduxCategories: String[] = useAppSelector(
    (state) => state.quizReducer.value.categories
  )
  const reduxDifficulties: String[] = useAppSelector(
    (state) => state.quizReducer.value.difficulties
  )

  useEffect(() => {
    dispatch(setCount(0))
  }, [dispatch])

  const changeSettings = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const value = (e.target as HTMLInputElement).value
    const newSet = new Set(difficulties)
    if (difficulties.has(value)) {
      newSet.delete(value)
    } else {
      newSet.add(value)
    }

    setDifficulties(newSet)
    dispatch(setDifficultiesGlobally(Array.from(newSet)))
  }

  const changeCategories = (e: React.MouseEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    const newSet = new Set(categories)
    if (categories.has(value)) {
      newSet.delete(value)
    } else {
      newSet.add(value)
    }
    setCategories(newSet)
    dispatch(setCategoriesGlobally(Array.from(newSet)))
  }

  useEffect(() => {
    console.log(difficulties)
    console.log('Categories:', categories)
  }, [difficulties])

  const half = Math.ceil(categoriesList.length / 2)
  const leftCategories = categoriesList.slice(0, half)
  const rightCategories = categoriesList.slice(half)

  return (
    <div
      className='d-flex align-items-center justify-content-around '
      style={{ width: '100vw' }}
    >
      <div>
        <label htmlFor='limitInput' className='px-3'>
          Number of questions:{' '}
        </label>
        <input
          className='limitInput'
          type='number'
          value={limit}
          style={{ maxWidth: '6.6rem' }}
          onChange={(e) => {
            const value = parseInt(e.target.value)
            if (!e.target.value || (value >= 1 && value <= 50)) {
              dispatch(setLimitGlobally(value))
            } else if (value < 1) {
              dispatch(setLimitGlobally(1))
            } else if (value > 50) {
              dispatch(setLimitGlobally(50))
            }
          }}
          min='1'
          max='50'
        />
      </div>

      <div className='d-flex align-items-center justify-content-center flex-column mt-4 text-center'>
        <h4 className='mb-3'>Choose categories</h4>

        <div
          className='d-flex align-items-center justify-content-center'
          style={{ display: 'flex', gap: '2rem' }}
        >
          <div>
            {leftCategories.map((cat) => (
              <div key={cat}>
                <label className='p-2' htmlFor={cat}>
                  {cat
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </label>
                <input
                  type='checkbox'
                  name='category'
                  value={cat}
                  checked={categories.has(cat) || reduxCategories.includes(cat)}
                  onClick={changeCategories}
                />
              </div>
            ))}
          </div>
          <div>
            {rightCategories.map((cat) => (
              <div key={cat}>
                <label className='p-2' htmlFor={cat}>
                  {cat
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </label>
                <input
                  type='checkbox'
                  name='category'
                  value={cat}
                  checked={categories.has(cat) || reduxCategories.includes(cat)}
                  onClick={changeCategories}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='d-flex align-items-center justify-content-center flex-column'>
        <h4 className='px-3'>Choose difficulties</h4>
        {['easy', 'medium', 'hard'].map((level) => (
          <div key={level}>
            <label className='p-2' htmlFor={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </label>
            <input
              type='checkbox'
              name='difficulty'
              value={level}
              checked={
                difficulties.has(level) || reduxDifficulties.includes(level)
              }
              onClick={changeSettings}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Settings
