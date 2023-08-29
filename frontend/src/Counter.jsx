import React, { useState } from 'react'

const Counter = () => {
    let [count, setCount] = useState(0)
    const IncreaseCounter = () => {
        setCount(count + 1)
    }
    const DecreaseCounter = () => {
        setCount(count - 1)
    }
  return (
    <div>
        <h2>Count: {count}</h2>
        <button onClick={IncreaseCounter}>Increase</button>
        <button onClick={DecreaseCounter}>Decrease</button>
    </div>
  )
}

export default Counter