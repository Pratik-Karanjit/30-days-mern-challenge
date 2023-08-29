import React from 'react'

const ButtonProp = ( {text, onClick} ) => {
  return (
<button onClick={onClick}>
    {text}
</button>  )
}

export default ButtonProp