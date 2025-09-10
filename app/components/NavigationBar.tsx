'use client'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button, Navbar, NavbarBrand, NavbarText } from 'reactstrap'
import { apiFetch } from './AuthForm'
import { useDispatch } from 'react-redux'

interface UserType {
  username?: string
}

const NavigationBar = ({ buttonLabel }: { buttonLabel: string }) => {
  const [user, setUser] = useState<UserType>({})
  const [isLoading, setLoading] = useState(true)
  const accessToken = useAppSelector((state) => state.authReducer.value.token)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const resUser = await apiFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
          {},
          accessToken,
          dispatch
        )
        const userData = await resUser.json()
        setUser(userData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [accessToken])

  const handleLogOut = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (confirm('Do you want to log out?')) {
      try {
        await apiFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
          {},
          accessToken,
          dispatch
        )
        router.push('/login')
      } catch (err) {
        console.error('Logout failed', err)
      }
    }
  }

  const handleRedirectButtonClick = () => {
    if (buttonLabel === 'History') {
      router.push('/history')
    } else {
      router.push('/')
    }
  }

  useEffect(() => {
    if (!isLoading && !user.username) {
      router.push('/login')
    }
  }, [isLoading, user, router])

  return (
    <Navbar className='position-fixed top-0 w-100' color='secondary' dark>
      <NavbarBrand href='/'>QuizApp &#129300;</NavbarBrand>
      {isLoading ? (
        <NavbarText>Loading...</NavbarText>
      ) : (
        <div className='flex-column'>
          <NavbarText className='text-light'>{user.username} </NavbarText>
          <NavbarText>
            <Button className='m-2' color='primary' onClick={handleLogOut}>
              Logout
            </Button>
            <Button
              className='m-2'
              color='secondary'
              onClick={handleRedirectButtonClick}
            >
              {buttonLabel}
            </Button>
          </NavbarText>
        </div>
      )}
    </Navbar>
  )
}

export default NavigationBar
