// import React, { ChangeEvent, Suspense } from 'react'
import React, { ChangeEvent, useState, useRef, useEffect, useCallback } from 'react'
import './App.css'
import Button from './Button'

const App: React.FC = () => {
  const [name, setName] = useState('')
  const ref = useRef(0)
  const [count, setCount] = useState(0)
  const prevCount = ref.current
  // setName('lili')
  useEffect(() => {
    ref.current = count
    console.log('1*******' + count)
  })

  const onClick = useCallback(() => {
    setCount(count => count + 1)
  }, [])

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }



  console.log(React.Children.map('<div>111</div>', c => [c, c]))

  return (
    <div className="App">
      {prevCount}***********{count}
      <div>
        <input value={name} onChange={change} />
        <Button onClick={onClick} count={count} >222222</Button>
      </div>
    </div>
  )
}

// const OtherComponent = React.lazy(() => import('./Lazy'))
// const Other1Component = React.lazy(() => import('./Lazy'))
// type State = {
//   name: string,
//   count: number
// }
// class App extends React.Component<{}, State> {
//   constructor(props: any) {
//     super(props)
//     this.state = {
//       name: 'hello',
//       count: 1
//     }
//   }

//   componentDidMount() {
//     this.setState({
//       count: this.state.count + 1
//     })
//     this.setState({
//       count: this.state.count + 1
//     })
//     this.setState({
//       count: this.state.count + 1
//     })
//   }

//   onChange = (e: ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       name: e.target.value
//     })
//   }

//   onClick = (e: any) => {
//     console.log(e.nativeEvent.currentTarget)
//     this.setState({
//       count: 2
//     })
//     this.setState(({ count }) => ({
//       count: count + 2
//     }))
//     this.setState(({ count }) => ({
//       count: count + 3
//     }))
//   }

//   render() {
//     // const { state, onChange,onClick } = this
//     // const { name, count } = state

//     return (
//       <div className="App">
//         {/* <div>
//           <input value={name} onChange={onChange} />
//           <Button onClick={onClick} >{count}</Button>
//         </div> */}
//         <Suspense fallback={<div>111</div>}>
//           <OtherComponent />
//           <Other1Component />
//         </Suspense>
//       </div>
//     )
//   }
// }

export default App
