import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Table } from "antd";
import { Link } from "react-router-dom";

function AppliedCandidates(job) {
  const alljobs = useSelector((state) => state.jobsReducer).jobs;
  const allusers = useSelector((state) => state.usersReducer).users;
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const userPostedJobs = alljobs.filter((job) => job.postedBy == userid);





  var appliedUsers = [];

  for (var candidate of userPostedJobs) {
    for (var candidates of candidate.appliedCandidates) {
      var user = allusers.filter((user) => user._id == candidates.userid);

      var obj = {
        candidateID: user[0]._id,
        candidateName: user[0].firstName + " " + user[0].lastName,
        email: user[0].email,
        mobile: user[0].mobileNumber,
        appliedJob: candidate.title,
        companyName: candidate.company,


      };

      appliedUsers.push(obj);
    };

  };



  const columns = [
    {
      title: 'Candidate ID',
      dataIndex: 'candidateID',
    },
    {
      title: 'candidate Name',
      dataIndex: 'candidateName'
    }, {
      title: 'Email',
      dataIndex: 'email'
      
    },
    {
      title: 'Contact Number',
      dataIndex: 'mobile'
    },
    {
      title: 'Applied Job Name',
      dataIndex: 'appliedJob'
    },
    {
      title: 'company Name',
      dataIndex: 'companyName'
    }
  ]

  return (
    <>
      <div>
        <DefaultLayout>
          <h1>Job Responses</h1>
          {
            appliedUsers &&
            <Table columns={columns} dataSource={appliedUsers} />
          }
        </DefaultLayout>
      </div>
    </>

  )
}

export default AppliedCandidates;











// import React, { useState } from "react";
// import DefaultLayout from "../components/DefaultLayout";
// import { useSelector, useDispatch } from "react-redux";
// import { Table } from "antd";




// function AppliedCandidates() {
//   const { jobs } = useSelector(state => state.jobsReducer)
//   const allusers = useSelector((state) => state.usersReducer).users;

//   const user = JSON.parse(localStorage.getItem('user'))

//   const userAppliedJobs = []

//   for (var job of jobs) {

//     var appliedCandidates = job.appliedCandidates; 
//     var temp = appliedCandidates.find(candidate => candidate.userid)
//     var users = allusers.find((user) => user._id == user._id);


//     console.log("temp", appliedCandidates);


//     if (temp) {

//       var obj = {
//         candidateID: temp.userid,
//         candidateName: users.firstName + ' ' + users.lastName,
//         email: user.email,
//         appliedDate: temp.appliedDate
//       }

//       userAppliedJobs.push(obj)

//     }



//   }

//   const columns = [
//     {
//       title: 'Candidate ID',
//       dataIndex: 'candidateID'
//     },
//     {
//       title: 'Candidate Name',
//       dataIndex: 'candidateName'
//     }, {
//       title: 'Applied Date',
//       dataIndex: 'appliedDate'
//     },
//     {
//       title: 'Candidate Email',
//       dataIndex: 'email'
//     }
//   ]

//   return (
//     <div>
//       <DefaultLayout>
//         <h1>Job Responses</h1>
//         <Table columns={columns} dataSource={userAppliedJobs} />
//       </DefaultLayout>
//     </div>
//   )
// }

// export default AppliedCandidates;