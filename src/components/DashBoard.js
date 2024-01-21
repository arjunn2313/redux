import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiEdit2 } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../reducer';




export default function DashBoard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user);
  const [edit,setEdit] = useState(false)
  const [data,setData] = useState('')
  const [name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[phone,setPhone] = useState('')
  const [address,setAddress] = useState('')
  const[image,setImage] = useState()
  console.log(user)

      useEffect(()=>{
        axios.get('http://localhost:4000/user/getprofile',{
          headers : {
            Authorization : `Bearer ${user.data}`
          }
        }).then((res)=>{
        
        setData(res.data.data)
        console.log(data)
        }
        )
        
      },[])

  

    const handleSubmit = () =>{
       setEdit(!edit)
      console.log(image)
      let editedDetails = {
        name : name,
        email : email,
        phone : phone,
      }
      const formData = new FormData()
      formData.append('name',editedDetails.name)
      formData.append('email',editedDetails.email)
      formData.append('phone',editedDetails.phone) b
      if(address != ''){
        formData.append('address',address)
      }
      if(image!=undefined){
        formData.append('profile',image)
      }
      axios.post('http://localhost:4000/user/update',formData,
      {
      
        headers : {
          Authorization : `Bearer ${user.data}`
        }
      }
      ).then((res)=>{
        if(res.data.status){
          console.log(res.data)
          window.location.reload(false)
        }
        
      }
      
      )

      
    }

    
    const handleLogout = () =>{
      dispatch(logout(''))
      navigate('/login')
      }
     







  return (
   <div>


    <div class="card" style={{width: '50rem',height:'32rem'}}>
  <img src="assets\2205256774854474505_medium.jpg" className="card-img-top d-flex mx-auto mt-2" alt="..."
  />
  <FiEdit2  />
  <button className='editicon fixed-top'   onClick={()=>setEdit(!edit)}>Edit</button>
 
  <div class="card-body d-flex mx-auto">
    <div className='row text-center'>
        <div className='col-5 mb-3'>
        <h5 class="card-title">Name</h5>
        </div>

        <div className='col-2'>
        <h5 class="card-title">:</h5>
        
        </div>
          {edit ? <input type='text' value={name} onChange={(e)=>setName(e.target.value)} /> :   <div className='col-5'>
        <h5 class="card-title">{data && data.name}  </h5>
        </div>}
      

        <div className='col-5 mb-3'>
        <h5 class="card-title">Email</h5>
        </div>

        <div className='col-2'>
        <h5 class="card-title">:</h5>
        </div>

          <div className='col-5'>
        <h5 class="card-title">{data && data.email}  </h5>
        </div>

        <div className='col-5'>
        <h5 class="card-title">Phone</h5>
        </div>

        <div className='col-2'>
        <h5 class="card-title">:</h5>
        </div>

        {edit ? <input type='text' value={phone}  onChange={(e)=>setPhone(e.target.value)}/> :   <div className='col-5'>
        <h5 class="card-title">{data && data.phone}  </h5>
        </div>}

        <input type ='file' onChange={(e)=>setImage(e.target.files[0])}/>

        <button onClick={handleLogout}>logout</button>


      {edit ?
      <div className='d-grid gap-2 col-6 mt-4 mx-auto'>
        <button className='btn btn-success' onClick={handleSubmit}>Done</button>
        </div>
        : null}


    </div>
  </div>
</div>
   </div>
  )
}
