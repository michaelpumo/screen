import { useState } from 'react'

function Screen() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Screen: {count}</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        Increase Count
      </button>
    </>
  )
}

export default Screen
