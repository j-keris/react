import React, { useRef, memo } from 'react'

const Button = memo((props:Record<any, any>) => {
  console.log(props)
  const ref = useRef(0)

  return (
    <button onClick={props.onClick}>
      { props.children }
      {ref.current ++}
    </button>
  )
})

export default Button