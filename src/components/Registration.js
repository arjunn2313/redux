import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
 

export default function Registration() {
    const inpRef = useRef(null)
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[phone,setPhone] = useState('')
    const[password,setPassword] = useState('')
    const[conPass,setConPass] = useState('')
    const[errors,setErrors] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        inpRef.current.focus()
    },[])

    const nameHandler =(e)=> {
        // const newValue = e.target.value.replace(/[0-9]/g, '')
        setName(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const error = {}

        if(name ==="" ){
            error.name = "please fill in this field*"
        }
        if(email===""){
            error.email = 'email is required'
        }

        if(phone===""){
            error.phone = 'phone cannot be blank'
        }

        if(password===""){
            error.password= 'password required'
        }

        if(conPass===""){
            error.conPass = 'password mismatch'
        }

        if(Object.keys(error).length > 0){
            setErrors(error)
        }else{
            let details = {
                name : name,
                email : email,
                phone : phone,
                password:password
            }
            axios.post("http://localhost:4000/user/register",details).then((res)=>{
                if(res.data.status){
                    navigate('/login')
                }else{
                    error.server = res.data.message
                    setErrors(error)
                }
            })

        }
    }




  return (
    <>
     <div className='RegCon border '>
        
        <h3 className='text-center mt-3'>Sign Up</h3> 
        <div className='sen d-flex mx-auto'>
         
        <form onSubmit={handleSubmit}>
            <div className='row '>
                    <div className='col-12 '>
                        <input type='text' className='form-control' placeholder='Full Name' name='fullname'
                        value={name} onChange={(e)=>nameHandler(e)}    ref={inpRef} 
                        />
                          </div>
                          <div className='col-12 mt-1 ms-3'>
                          {errors ? <p style={{color:'red'}}>{errors.name}</p> : <p className='instruction'>**required and alphabets only</p>} 
                          </div>

                          



                    <div className='col-12 '>
                        <input type='email' className='form-control' placeholder='Email' name='email'
                        value={email} onChange={(e)=>setEmail(e.target.value)} 
                        />
                    </div>

                    <div className='col-12 mt-1 ms-3'>
                    {errors ? <p style={{color:'red'}}>{errors.email}</p> : <p className='instruction'>**example @yahoo.com</p>}
                          </div>

                    <div className='col-12 '>
                        <input type='tel' className='form-control' placeholder='Phone' name='phone'
                        value={phone} onChange={(e)=>setPhone(e.target.value)}
                        />
                    </div>

                    <div className='col-12 mt-1 ms-3'>
                    {errors ? <p style={{color:'red'}}>{errors.phone}</p> : <p className='instruction'>**Phone is required</p>}
                          </div>

                    

                    <div className='col-12 '>
                        <input type='password' className='form-control' placeholder='password' name='password'
                        value={password} onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <div className='col-12 mt-1 ms-3'>
                    {errors ? <p style={{color:'red'}}>{errors.password}</p> : <p className='instruction'>**must contain alphabets&numbers</p>}
                          </div>

                    <div className='col-12 '>
                        <input type='password' className='form-control' placeholder='confirm password' name='confirmpassword'
                        value={conPass} onChange={(e)=>setConPass(e.target.value)}
                        />
                    </div>

                    <div className='col-12 mt-1 ms-3'>
                    {errors ? <p style={{color:'red'}}>{errors.conPass}</p> : <p className='instruction'>**re-enter password</p>}
                          </div>
                    {errors ? <p>{errors.server}</p> : ""}
                    <div className='d-grid col-10 mx-auto'>
                        <button type='submit' className='btn btn-success'>Sign up</button>
                    </div>

                    <div className='col-12 mb-4'>
                        <Link to='/login' style={{textDecoration:"none"}}>
                        <p className='text-center mt-1'>alredy have account ? login</p></Link>
                    </div>

                  
            </div>
        </form>
        </div>
     </div>
    </>
  )
}
