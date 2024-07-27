import '../App.css';
import {useNavigate} from 'react-router-dom';

function Mainlogin() {
  const navigate = useNavigate();
return (
<>
<div class="card">
   <div class="row">
    <div class="col-md-6">
      <img src="https://media.istockphoto.com/id/2148946240/photo/network-security-and-data-safety-concept-closed-lock-glass-3d-icon-on-abstract-geometric.webp?b=1&s=170667a&w=0&k=20&c=4YGvUoErnRycxXXNd5jmOziHehML9OgWBzbKICbGVWM=" class="img" alt="" width="360" height="320"/>
    </div>
    <div class="col-md-6">
      <div class="card-body">
         <button type="button" class="btn btn-primary button1" onClick={()=>navigate("/admin")}><b>Admin Login</b></button>
         <button type="button" class="btn btn-primary button1" onClick={()=>navigate("/user")}><b>User Login</b></button>
      </div>
    </div>
  </div>
</div>
</>
);
}

export default Mainlogin;
 