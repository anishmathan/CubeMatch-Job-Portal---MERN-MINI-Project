import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
function UserInfo({ match }) {
  const { users } = useSelector((state) => state.usersReducer);

  const user = users.find((user) => user._id == match.params.id);
  const id = JSON.parse(localStorage.getItem('user'))
// console.log("user:", id)
  return (
    <div>
      <DefaultLayout>
        <div>
        <h3>
              <b>Personal inforamtion</b>
            </h3>
            <p>
              <b>First name : </b>
              {id.firstName}
            </p>
            <p>
            <b>Last name : </b>
              {id.lastName}
            </p>
            <p>
              <b>Email : </b>
              {id.email}
            </p>
            <p>
              <b>Mobile Number : </b>
              {id.mobileNumber}
            </p>
            <p>
              <b>Address : </b>
              {id.address}
            </p>

            <hr />
            <h3>
              <b>Skills</b>
            </h3>
            {id.skills.map((skills) => {
              return <li>{skills}</li>;
            })}
            
            <hr />
            <h3>
              <b>Education</b>
            </h3>
            {id.education.map((education) => {
              return <li>{education}</li>;
            })}
            <hr />

            <h3>
              <b>Projects</b>
            </h3>
            {id.projects.map((project) => {
              return <li>{project}</li>;
            })}

            <hr />
            <h3>
              <b>Experience</b>
            </h3>
            {id.experience.map((experience) => {
              return <li>{experience}</li>;
            })}
            <h3>
              <b>Resume</b>
            </h3>
            <a href="http://localhost:4000/public/resume.pdf">
                <button>Download</button>
  </a> 
            {/* {id.resume.map((resume) => {
              return <li>{resume}</li>;
            })} */}
        </div>

        
        
      </DefaultLayout>
    </div>
  );
}

export default UserInfo;
