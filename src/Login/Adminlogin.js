import React, {useState }from "react";
import '../App.css';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

function Adminlogin() {
  const navigate = useNavigate();
  const[formData, setFormData] =useState({
      email: "",
      password: ""
  }); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axios.post('https://taskexpress.onrender.com/register/adminlogin', {...formData });
            console.log(response);console.log(formData);
            if(response.data) {
                await localStorage.setItem("token", response.data);
                navigate('/adduser');
            }
            } catch(err) {
            console.log(err);
            }
    };
return (
<>
  <div class="card">
     <div class="row g-4">
       <div class="col-md-6">
         <img src="https://cap-cetcell.in/ay2022/images/admin%20banner.png" alt="" width="320" height="320"></img>
       </div>
    
    <div class="col-md-6">
    <h2>Admin Login</h2>
    <form onClick={handleSubmit}>
    <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping"><i class="fa fa-envelope" aria-hidden="true"></i></span>
        <input type="email" class="form-control" id="floatingInput" placeholder="Admin EmailID: user123@gmail.com" 
        value={formData.email} onChange={(e) => setFormData({...formData, email:e.target.value})}/>
        
    </div>

    <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping"><i class="fa fa-lock fa-1x" aria-hidden="true"></i></span>
        <input type="password" class="form-control" id="floatingPassword" placeholder="Admin Password: user123"
        value={formData.password} onChange={(e) => setFormData({...formData, password:e.target.value})}/>
    </div>
    <button type="button" style={{margin:"0px 35px"}} class="btn btn-primary button1"><b>Login</b></button>
    
    </form>
    </div>
    </div>
  </div>
</>
);
}

export default Adminlogin;