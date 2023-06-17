import Link from 'next/link'

export default function Home() {
  return (
    <div className='text-light d-flex align-items-center justify-content-center text-center'>
      <div className='d-block'>
        <h1>Quiz</h1>
        <img
          className=' rounded mx-auto d-block mt-3'
          src='https://swgfl.org.uk/assets/articles/thinking-large.jpg'
          alt=''
        />
        <div>
          <Link href='/questions/1'>
            <button className='btn btn-lg btn-primary mt-3 text-light'>
              Click to Start
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
