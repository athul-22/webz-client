import React from 'react'
import { Link } from 'react-router-dom'
import '../css/welcome.css'

const Welcome = () => {
  return (
    <main>
    
  <div className="gradient-wrapper">
    <div className="gradient purple" />
    <div className="gradient orange" />
    <div className="gradient yellow" />
  </div>
  <div className="headline">
   <h1 id='welcome' className="linear-wipe">WELCOME!</h1>
    </div>
    <div className='button-main'>
      <Link to='/login'>
      <button className='button button-primary'>Create Account</button>
      </Link>

      <Link to='/register'>
      <button className='button button-secondary'>Login</button><br/>
      </Link>
    </div>
    <div className='button-main'>
    <Link to='https://www.github.com/athul-22'>
    <button className='github'>GITHUB</button>
    </Link>
    </div>
</main>
  )
}

export default Welcome
