'use client'
import { setToken } from '@/redux/features/auth-slice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

interface ApiResponse {
  accessToken?: string
  refreshToken?: string
  message?: string
}

export async function apiFetch(
  url: string,
  options: RequestInit = {},
  accessToken: string,
  dispatch: AppDispatch
) {
  const headers: HeadersInit = {
    ...(options.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  }

  let res = await fetch(url, { ...options, headers, credentials: 'include' })

  if (res.status === 401) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
      {
        method: 'POST',
        credentials: 'include',
      }
    )

    const refreshJSON: ApiResponse = await refreshRes.json()
    if (refreshJSON.accessToken) {
      dispatch(setToken(refreshJSON.accessToken))
    }

    if (refreshRes.ok && refreshJSON.accessToken) {
      const retryHeaders: HeadersInit = {
        ...(options.headers || {}),
        Authorization: `Bearer ${refreshJSON.accessToken}`,
      }

      res = await fetch(url, {
        ...options,
        headers: retryHeaders,
        credentials: 'include',
      })
    } else {
      window.location.href = '/login'
    }
  }

  return res
}

const AuthForm = ({ mode }: { mode: string }) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    const url =
      mode === 'login'
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      })

      const data: ApiResponse = await res.json()

      if (!res.ok) {
        setError(data.message || 'Something went wrong')
      }
      console.log(data)

      if (mode === 'register') {
        setSuccessMessage(data.message || 'Registration successful')
        router.push('/login')
        return
      }

      if (data.accessToken) {
        dispatch(setToken(data.accessToken))

        router.push('/')
      }

      if (data.message) {
        setError(data.message)
        return
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div
      style={{ height: '100vh' }}
      className='d-flex align-items-center justify-content-center flex-column gap-4 mb-3 text-light'
    >
      <form
        onSubmit={handleSubmit}
        className='auth-form d-flex align-items-center justify-content-center flex-column gap-4 mb-3'
      >
        <h1>{mode === 'login' ? 'Login' : 'Register'}</h1>

        <input
          className='input'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {successMessage ? <p className='text-success'>{successMessage}</p> : ''}
        {error ? <p className='text-danger'>{error}</p> : ''}
        <button className='btn btn-lg btn-primary' type='submit'>
          {mode === 'login' ? 'Login' : 'Register'}
        </button>

        <p>
          {mode === 'login' ? (
            <>
              Dont have an account yet? <a href='/register'>Register</a>
            </>
          ) : (
            <>
              Already have an account? <a href='/login'>Login</a>
            </>
          )}
        </p>
      </form>
    </div>
  )
}

export default AuthForm
