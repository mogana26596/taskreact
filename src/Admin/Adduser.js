import React, { useEffect, useState }from "react";
import '../App.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Adduser() {
      const navigate = useNavigate();
      const params = useParams();
      const adminID = params.adminID;
      const [userDetails, setuserDetails] = useState({
        name: '',
        email: '',
        contact: '',
        taskname:'',
        approval:''        
      });
  
      const handleInput = (value) => {
          return setuserDetails(user => {
              return {...user, ...value}
          });
      };
  
      const handleSubmit = async (e) => {
          e.preventDefault();
          try{
              const response = await axios.post('https://taskexpress.onrender.com/user/create', userDetails);
              if(response){
                  setuserDetails({
                    name: '',
                     email: '',
                     contact: '',
                     taskname:'',
                     approval:''
                  });
              }
          }catch(error){
              console.log('Error: ', error)
          }
      }
     
      const [users, setuser] = useState([]);
      useEffect(() => {
          getuser();
      }, []);
    
      const getuser = async () => {
          try{
              const response = await axios.get('https://taskexpress.onrender.com/user/get');
              setuser(response.data);
          }catch(error){
              console.log('Error: ', error);
          }
      }

      useEffect(() => {
          axios.get(`https://taskexpress.onrender.com/user/get/${adminID}`).then((response) => {
            setuserDetails(response.data);
          }).catch(error => {
              console.log('Error: ', error);
          })
      }, [adminID]);
  
      const handleSubmit1 = async (e) => {
          e.preventDefault();
            try{
              const response = await axios.put(`https://taskexpress.onrender.com/user/update/${adminID}`, userDetails);
              if(response){
                setuserDetails({
                    name: '',
                     email: '',
                     contact: '',
                     taskname:'',
                     approval:''
                  });
              }
          }catch(error){
              console.log('Error: ', error)
          }
      }


      const handleDelete = async (adminID) => {
        try{
            const response = await axios.delete(`https://taskexpress.onrender.com/user/delete/${adminID}`);
            if(response){
              getuser();
            }
        }catch(error){
            console.log(error);
        }
    }
return (
<>  
<div class="create"> 
   <nav className="navbar bg-light" > 
        <div className="logo">User Task Details</div>
        <div className="fluid">
           <button style={{width:"100px", height: "40px"}} type="button" className="btn btn-primary button1" onClick={()=>navigate("/")}>Logout</button>
         </div>
      </nav>

   <div class="row">
   <div class="col-6 list">
        <h3>List of Tasks</h3>
       <table class="table table-bordered" style={{border: "2px solid black"}}>
        <thead style={{textAlign: "center"}}>
        <tr> 
            <th scope="col-5">Name</th>
            <th scope="col-4">Email</th>
            <th scope="col-4">Contact</th>
            <th scope="col-4">Task name</th>
            <th scope="col-4">Approval status</th>
            <th scope="col-4">Action</th>
          </tr>
        </thead>
        <tbody>
        {users.length && users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.contact}</td>
                            <td>{user.taskname}</td>
                            <td>{user.approval}</td>
                            <td>
                            <button style={{width:"100px", height: "40px"}} type="button" className=" btn-primary" onClick={handleSubmit1}>Edit</button>
                            <button style={{width:"100px", height: "40px"}} type="button" className=" btn-primary" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                         </tr>
                    ))}
                </tbody>
      </table></div>
    <div class="col-4 add">
       <form >
          <h3>Add user Details</h3>
          <div class="row">
          <label for="inputtext" class="col-3 col-form-label"><b>Name</b></label>
          <div class="col-7">
          <input type="text" class="form-control" placeholder=" Enter Task" value={userDetails.name} onChange={e => handleInput({name: e.target.value})}/>
          </div>
          </div><br/>
      
          <div class="row">    
          <label for="inputtext" class="col-3 col-form-label"><b>Email</b></label>
          <div class="col-7">
          <input type="email" class="form-control" placeholder=" Enter Email address" value={userDetails.email} onChange={e => handleInput({email: e.target.value})}/>
          </div>
          </div><br/>

          <div class="row">    
          <label for="inputtext" class="col-3 col-form-label"><b>Contact No.</b></label>
          <div class="col-7">
          <input type="number" class="form-control" placeholder=" Enter Contact No." value={userDetails.contact} onChange={e => handleInput({contact: e.target.value})}/>
          </div>
          </div><br/>

          <div class="row">    
          <label for="inputtext" class="col-3 col-form-label"><b>Task name</b></label>
          <div class="col-7">
          <input type="text" class="form-control" placeholder=" Enter task name" value={userDetails.taskname} onChange={e => handleInput({taskname: e.target.value})}/>
          </div>
          </div><br/>

          <div class="row">    
          <label for="inputtext" class="col-3 col-form-label"><b>Approval Status</b></label>
          <div class="col-7">
          <input type="text" class="form-control" placeholder=" Enter Approval Status" value={userDetails.approval} onChange={e => handleInput({approval: e.target.value})}/>
          </div>
          </div><br/>

          <div class="row">
          <div class="col-12">
          <button style={{margin:"15px  90px"}} type="button" class="btn btn-primary button1" onClick={handleSubmit}><b>Add Task</b></button>
          </div>
          </div><br/>
      </form> 
      </div>
   </div>
</div> 
</>
);
}

export default Adduser;