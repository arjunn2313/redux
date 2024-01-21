import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducer'

export default function LoginPage() {
   
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errors,setErrors] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
   
  const handlelogin = (e) => {
    e.preventDefault()
    const  error = {}
    if(email == '' && password ==''){
     error.wrong = 'enter email & password'
    }

    if(Object.keys(error).length > 0){
      setErrors(error)
    }else{
      let isLogin = {
        email : email,
        password : password
      }
      axios.post("http://localhost:4000/user/login",isLogin).then((res)=>{
        if(res.data.status){
          console.log(res.data)
          dispatch(setUser(res.data.token))
          navigate("/dashboard")
        }else{
          error.server = res.data.message
        }
      }).catch((err)=>{
        error.server = err.response.data.message
        setErrors(error)
      })
    }


  }


  return (
    <div className='login border'>
        <h2 className='text-center mt-4'>Login  </h2>
        {errors && <span className='text-center text-danger ms-3'>{errors.wrong}</span>  }
        <div className='logsec d-flex mx-auto'>
            <form onSubmit={handlelogin}>
                <div className='row'>
                    <div className='col-12 mb-3 mt-4'>
                        <input type='email' className='form-control' name='email' placeholder='Email'  onChange={(e)=>setEmail(e.target.value)}/>
                          </div>

                          <div className='col-12 mt-3 mb-3'>
                        <input type='password' className='form-control' name='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
                          </div>

                          <div className='d-grid mt-3'>
                                <button className='btn btn-success' type='submit'>Login</button>
                                {errors && errors.server }
                          </div>
                </div>
            </form>

        </div>

    </div>
  )
}
