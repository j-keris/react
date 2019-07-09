import React, { useRef, useState, useEffect, useCallback } from 'react'
import './App.css'
import Button from './Button'

const App: React.FC = () => {
  const [name, setName] = useState('')
  const ref = useRef(0)
  const [count, setCount] = useState(0)

  useEffect(()=> {
    ref.current = count
    console.log('1*******' + count)
  })

  const onClick = useCallback(() => {
    setCount(count=> count + 1)
  }, [])

  const prevCount = ref.current
  console.log(prevCount)

  return (
    <div className="App">
      {prevCount}***********{count}
      <div>
        <input value={name} onChange={e => setName(e.target.value)} />
        <Button onClick={onClick}>222222</Button>
      </div>
    </div>
  )
}

export default App
