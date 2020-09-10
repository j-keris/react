// import React, { memo } from 'react'

// const Button = memo((props:Record<any, any>) => {

//   return (
//     <button onClick={props.onClick}>
//       { props.children }
//     </button>
//   )
// })

// export default Button
import React from 'react'

class Button extends React.Component<{},{ count: number, value:string}> {
  constructor(props:any) {
    super(props)
    this.state = {
      count: 0,
      value: ''
    }
  }

  componentDidMount() {
    // this.setState({
    //   count: this.state.count + 1
    // })
  }

  click=()=>{
    this.setState({ count: this.state.count + 1 })
    console.log(this.state.count)
  }

  change=(e:any)=>{
    const value = e.target.value as string
    this.setState({ value })
    console.log(this.state.value)
  }


  render() {

    return (
      <>
      <button onClick={this.click}>1111</button>
      <input onChange={this.change}></input>
      </>
    )
  }
}

export default Button