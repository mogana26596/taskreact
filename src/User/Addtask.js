import React, { useEffect, useState }from "react";
import '../App.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Addtask() {
      const navigate = useNavigate();
      const params = useParams();
      const adminID = params.adminID;
      const [taskDetails, settaskDetails] = useState({
          taskname: '',
          status:'',
          deadline: ''          
      });
  
      const handleInput = (value) => {
          return settaskDetails(task => {
              return {...task, ...value}
          });
      };
  
      const handleSubmit = async (e) => {
          e.preventDefault();
          try{
              const response = await axios.post('https://taskexpress.onrender.com/task/create', taskDetails);
              if(response){
                  settaskDetails({
                    taskname: '',
                    status:'',
                    deadline: '' 
                  });
              }
          }catch(error){
              console.log('Error: ', error)
          }
      }
     
      const [tasks, settask] = useState([]);
      useEffect(() => {
          gettask();
      }, []);
    
      const gettask = async () => {
          try{
              const response = await axios.get('https://taskexpress.onrender.com/task/get');
              settask(response.data);
          }catch(error){
              console.log('Error: ', error);
          }
      }
      useEffect(() => {
        axios.get(`https://taskexpress.onrender.com/task/get/${adminID}`).then((response) => {
            settaskDetails(response.data);
        }).catch(error => {
            console.log('Error: ', error);
        })
    }, [adminID]);

    const handleSubmit1 = async (e) => {
        e.preventDefault();
          try{
            const response = await axios.put(`https://taskexpress.onrender.com/task/update/${adminID}`, taskDetails);
            if(response){
                settaskDetails({
                taskname: '',
                status:'',
                deadline: '' 
                });
            }
        }catch(error){
            console.log('Error: ', error)
        }
    }


    const handleDelete = async (adminID) => {
      try{
          const response = await axios.delete(`https://taskexpress.onrender.com/task/delete/${adminID}`);
          if(response){
            gettask();
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
            <th scope="col-5">Task</th>
            <th scope="col-4">Status</th>
            <th scope="col-4">Deadline</th>
            <th scope="col-4">Action</th>
          </tr>
        </thead>
        <tbody>
        {tasks.length && tasks.map((task, index) => (
                        <tr key={index}>
                            <td>{task.taskname}</td>
                            <td>{task.status}</td>
                            <td>{task.deadline}</td>
                            <td>
                            <button style={{width:"100px", height: "40px"}} type="button" className=" btn-primary" onClick={handleSubmit1}>Edit</button>
                            <button style={{width:"100px", height: "40px"}} type="button" className=" btn-primary" onClick={() => handleDelete(task._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
      </table></div>
    <div class="col-4 add">
       <form >
          <h3>Add Task Details</h3>
          <div class="row">
          <label for="inputtext" class="col-3 col-form-label"><b>Task</b></label>
          <div class="col-7">
          <input type="text" class="form-control" placeholder=" Enter Task" value={taskDetails.taskname} onChange={e => handleInput({taskname: e.target.value})}/>
          </div>
          </div><br/>
      
          <div class="row">    
          <label for="inputtext" class="col-3 col-form-label"><b>Status</b></label>
          <div class="col-7">
          <input type="text" class="form-control" placeholder=" Enter Status" value={taskDetails.status} onChange={e => handleInput({status: e.target.value})}/>
          </div>
          </div><br/>

          <div class="row">    
          <label for="inputtext" class="col-3 col-form-label"><b>Deadline</b></label>
          <div class="col-7">
          <input type="datetime-local" class="form-control" placeholder=" Enter Deadline" value={taskDetails.deadline} onChange={e => handleInput({deadline: e.target.value})}/>
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

export default Addtask;