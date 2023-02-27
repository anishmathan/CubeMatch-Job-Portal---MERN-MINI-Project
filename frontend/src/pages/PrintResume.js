import React,{useRef} from 'react';
import { useReactToPrint } from "react-to-print";
import DefaultLayout from '../components/DefaultLayout';

const PrintResume = () => {  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const user = JSON.parse(localStorage.getItem('user'));
  return (<>
  <div class="print__section">
    <DefaultLayout>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          
          <div ref={componentRef} className="card">
            <div class="float__start">
            <h3 class="card-title mb-7 mt-4 mr-4 text-center">  <b>MY RESUME</b></h3>
            </div>
            <hr />
            <div class="float__infoss">
              <ul>
                 <span><h1><b>{user.firstName + " " + user.lastName}</b></h1>  </span> 
                <b>Email :</b>  <span> {user.email} </span> <br></br>
                <b>Phone No:</b> <span> </span> {user.mobileNumber}
                <b><hr></hr></b>
               
                <li> <b>About : </b><span> {user.about} </span> </li>
                <hr></hr>
                <li> <b>Profile Summary : </b><span> {user.portfolio} </span> </li>
                <hr></hr>
                <li> <b>Experience : </b><span> {user.experience} </span> </li>
                <hr></hr>
                <li> <b>Skills : </b><span> {user.skills} </span> </li> <br></br>
                <li> <b>Education : </b><span> {user.education} </span> </li>
                <hr></hr>
                <li> <b>Projects : </b><span> {user.projects} </span> </li>
                <hr></hr>
                <div class="text-center">
                <b>Declaration</b>  
                <p>“I hereby declare that the details
                     and information given above are complete and true to the best of my knowledge.“ </p>
                </div>
                
              </ul>
            
            </div>
          </div>
          <div  class="text-center"> <button onClick={handlePrint} className="print__button">  Print </button> </div>
         
        </div>
      </div>
    </div>
    </DefaultLayout>
  </div>
    </>     
  )
}
export default PrintResume;