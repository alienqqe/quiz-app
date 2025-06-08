import Settings from './components/Settings'
import StartButton from './components/StartButton'

export default function Home() {
  return (
    <div
      className='text-light d-flex align-items-center  justify-content-center text-center'
      style={{ height: '100vh' }}
    >
      <div className='d-block'>
        <h1 className='mb-5'>Quiz</h1>
        <Settings />
        <StartButton />
      </div>
    </div>
  )
}
