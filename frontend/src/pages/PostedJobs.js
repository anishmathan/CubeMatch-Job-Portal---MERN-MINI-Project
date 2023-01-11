import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Table, Modal , open} from "antd";
import {
  EditOutlined,
  OrderedListOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import moment from "moment";
import { Link, useHistory } from "react-router-dom";
function PostedJobs() {
  const alljobs = useSelector((state) => state.jobsReducer).jobs;
  const allusers = useSelector((state) => state.usersReducer).users;
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const userPostedJobs = alljobs.filter((job) => job.postedBy == userid);
  const history = useHistory();
  const [isModalopen, setIsModalopen] = useState(false);
  const [selectedJob, setSelectedJob] = useState();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
    },
    {
      title: "Applied Candidates",
      dataIndex: "appliedCandidates",
    },
    {
      title: "Actions",
      render: (text, data) => {
        return (
          <div className="flex">
            <EditOutlined
            className='mr-2'
              style={{fontSize:20}}
              onClick={() => {
                history.push(`/editjob/${data.completeJobData._id}`);
              }}
            />
            <OrderedListOutlined
               style={{fontSize:20}}
              onClick={() => {
                
                showModal(job);
              }}
            />
          </div>
        );
      },
    },
  ];

  const dataSource = [];

  for (var job of userPostedJobs) {
    var obj = {
      title: job.title,
      company: job.company,
      postedOn: moment(job.createdAt).format("MMM DD yyyy"),
      appliedCandidates: job.appliedCandidates.length,
      completeJobData: job,
    };
    dataSource.push(obj);
  }

  const showModal = (job) => {
    setIsModalopen(true);
    setSelectedJob(job);
  };

  const handleOk = () => {
    setIsModalopen(false);
  };

  const handleCancel = () => {
    setIsModalopen(false);
  };

 function CandidatesList(){
  const candidatesColumns = [
    {
      title: "Candidate Id",
      dataIndex: "candidateId",
      render : (text ,data)=>{
       return <Link to={`/users/${data.candidateId}`}>{data.candidateId}</Link>
      }
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    { title: "Applied Date", dataIndex: "appliedDate" },
    {
      title: "Download Resume",
      render: (text, data) => {
        return (
          <div className="flex">
            <DownloadOutlined
            className='mr-5'
              style={{fontSize:20}}
              onClick={() => {
              return<Link to ={`http://localhost:4000/public/resume.pdf`}></Link>
              }}
            />
          </div>
        );
      },
    },, 
    
  ];

  var candidatesDatasource = [];
  
  for (var candidate of selectedJob.appliedCandidates) {
    var user = allusers.find((user) => user._id == candidate.userid);
    const id = JSON.parse(localStorage.getItem('user'))
    var obj = {
      candidateId: id._id,
      fullName: id.firstName + " " + id.lastName,
      appliedDate: candidate.appliedDate,
    };

    candidatesDatasource.push(obj);
  }
  
  return <Table
  columns={candidatesColumns}
  dataSource={candidatesDatasource}
/>
 }

  console.log(userPostedJobs);
  return (
    <div>
      <DefaultLayout>
        <h1>Posted Jobs</h1>

        <Table columns={columns} dataSource={dataSource} />

        <Modal
          title="Applied Candidates List"
          open={isModalopen}
          closable={false}
          onOk={handleOk}
          onCancel={handleCancel}
          width={700}
        >
          <CandidatesList/>
        </Modal>
      </DefaultLayout>
    </div>
  );
}

export default PostedJobs;
