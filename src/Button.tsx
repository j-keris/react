import React, { memo } from 'react'

const Button = memo((props:Record<any, any>) => {

  return (
    <button onClick={props.onClick}>
      { props.children }
    </button>
  )
})

export default Button
// import React from 'react'

// type Props = {
//   onClick: (e:any)=>void,
//   children: any
// }

// type State = {
//   count: number
// }

// class Button extends React.Component<Props,State> {
//   constructor(props:Props) {
//     super(props)
//     this.state = {
//       count: 0
//     }
//   }

//   componentDidMount() {
//     // this.setState({
//     //   count: this.state.count + 1
//     // })
//   }

//   onClick=()=>{
//     this.setState(({ count })=>({
//       count: count + 1
//     }))
//     this.setState(({ count })=>({
//       count: count + 2
//     }))
//     this.setState(({ count })=>({
//       count: count + 3
//     }))
//   }

//   render() {
//     const { props: { onClick, children } } = this

//     return  <button onClick={onClick}>{children}</button>
//   }
// }

// export default Button