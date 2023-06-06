import { useEffect, useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import authService from '@/utils/authService'

function Login() {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })

  const handleInputChange = ({ target: { name, value } }) => {
    setLoginForm({ ...loginForm, [name]: value })
  }

  const [buttonActive, setButtonActive] = useState(false)

  // if user is logged in already, redirect to pantry page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (authService.loggedIn() && !authService.tokenExpired()) {
        window.location.assign('/pantry')
      }
    }
  }, [])

  useEffect(() => {
    if (loginForm.username !== '' && loginForm.password !== '') {
      setButtonActive(true)
    } else {
      setButtonActive(false)
    }
  }, [loginForm])

  const handleFormSubmit = (event) => {
    event.preventDefault()

    userLogin()
  }

  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const userLogin = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      });

      if (response.ok) {
        const data = await response.json();
        authService.login(data.token);
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
        alert(errorData.message);
      }
    } catch (err) {
      console.log(err);
      alert('An error occurred during login.');
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleFormSubmit}>
          <div>
            <label className='block text-sm font-medium leading-6 text-gray-900'>
              Username
            </label>
            <div className='mt-2'>
              <input
                name='username'
                type='text'
                required
                className='block w-full rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
                value={loginForm.username}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium leading-6 text-gray-900'>
              Password
            </label>
            <div className='mt-2 relative'>
              <input
                name='password'
                type={showPassword ? 'text' : 'password'}
                required
                className='block w-full rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
                value={loginForm.password}
                onChange={handleInputChange}
              />
              <div className='absolute top-2 right-2'>
                <AiFillEyeInvisible
                  fontSize='20px'
                  className={!showPassword ? 'block cursor-pointer' : 'hidden'}
                  onClick={() => setShowPassword(true)}
                />
                <AiFillEye
                  fontSize='20px'
                  className={showPassword ? 'block cursor-pointer' : 'hidden'}
                  onClick={() => setShowPassword(false)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm 
                ${buttonActive
                  ? 'bg-orange-600 text-white hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
                  : 'bg-gray-300 text-gray-500  '
                }`}

            >
              {loading
                ? <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                : 'Log In'
              }
            </button>
          </div>
        </form>

        <p className='mt-10 text-center text-sm text-gray-500'>
          Don't have an account?
          <a
            href='/signup'
            className='font-semibold leading-6 text-orange-600 hover:text-orange-500'
          >
            {' '}
            Click to sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
