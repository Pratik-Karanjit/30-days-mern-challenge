import React from 'react'
import ButtonProp from './ButtonProp'
import Counter from './Counter'

const MyApp = () => {
    const handleClick = () => {
        alert('Button clicked.')
    }
  return (
    <div><h1>
        Hello from MyApp
        </h1>
    <ButtonProp text = "Click here" onClick={handleClick}></ButtonProp>
    <Counter></Counter>
    </div>
  )
}

export default MyApp