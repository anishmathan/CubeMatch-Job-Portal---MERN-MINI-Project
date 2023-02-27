import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Table, Modal, } from "antd";
import {
  EditOutlined,
  OrderedListOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EyeOutlined
} from "@ant-design/icons";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { message } from "antd";



function PostedJobs({ }) {
  const alljobs = useSelector((state) => state.jobsReducer).jobs;
  const allusers = useSelector((state) => state.usersReducer).users;
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const userPostedJobs = alljobs.filter((job) => job.postedBy == userid);
  const history = useHistory();
  const [isModalopen, setIsModalopen] = useState(false);
  const [selectedJob, setSelectedJob] = useState();
  const [candidatesDatasource, setCandidatesDatasource] = useState();
  const [candidatesColumns,setCandidatesColumns] = useState()


  function deleteJob(text) {
    console.log('Data: ', text);
    Modal.confirm({
      title: "Are you sure, you want to delete this Job ?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        console.log('Del Job: ', text);
        console.log('Del Job: ', text.company);
        console.log('Del Job: ', text.completeJobData._id);
        axios.delete(`http://localhost:4000/api/jobs/deletejob/${text.completeJobData._id}`)
          .then(res => {
            console.log(res.data);
            message.success("Job Deleted Succesfully");
            setTimeout(() => {
              window.location.href = "/posted";
            }, 1000);
          })

          .catch(err => {
            console.log(err);
          });
      },
    });

  }


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
      render: (data) => {
        return (
          <div className="flex">
            <EditOutlined
              className='mr-2'
              style={{ fontSize: 20 }}
              onClick={() => {
                history.push(`/editjob/${data.completeJobData._id}`);
              }}
            />
            <OrderedListOutlined
              className='mr-2'
              style={{ fontSize: 20 }}
              onClick={() => {

                showModal(data);
              }}
            />
            <DeleteOutlined
              className='mr-2'
              style={{ fontSize: 20 }}

              onClick={e => deleteJob(data)}


            />
            <  EyeOutlined
              className='mr-2'
              style={{ fontSize: 20 }}
              onClick={() => {
                history.push('');
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
    CandidatesList(job)
  };

  const handleOk = () => {
    setIsModalopen(false);
  };

  const handleCancel = () => {
    setIsModalopen(false);
  };


  function CandidatesList(job) {
    console.log("Details: ", job.completeJobData);
    const appliedDetails = job.completeJobData.appliedCandidates || selectedJob.completeJobData.appliedCandidates;
    var candidatesColumns = [
      {
        title: "Candidate Id",
        dataIndex: "candidateId",
        render: (text, data) => {
          return <Link to={`/users/${data.candidateId}`}>{data.candidateId}</Link>
        }
      },
      {
        title: "Full Name",
        dataIndex: "fullName",
      },
      { title: "Applied Date", dataIndex: "appliedDate" },
    ];

    var candidatesDatasource = [];

    for (var candidate of appliedDetails) {
      var user = allusers.find((user) => user._id == candidate.userid);

      var obj = {
        candidateId: user._id,
        fullName: user.firstName + " " + user.lastName,
        appliedDate: candidate.appliedDate,
      };
      candidatesDatasource.push(obj);
    }
    setCandidatesDatasource(candidatesDatasource)
    setCandidatesColumns(candidatesColumns)

    // return <Table
    //   columns={candidatesColumns}
    //   dataSource={candidatesDatasource}
    // />
  }

  function CandidateTable() {
    console.log('candidatesDatasource: ', candidatesDatasource);
    return (
      <>
        {
          candidatesDatasource && candidatesColumns ?
            (
              <div>
                <Table
                  columns={candidatesColumns}
                  dataSource={candidatesDatasource}
                />
              </div>
            ) : null
        }
      </>
    )
  }


  console.log(userPostedJobs);
  return (
    <div>
      <DefaultLayout>
        <h1>Notification and Details</h1>

        <Table columns={columns} dataSource={dataSource} />

        <Modal
          title="Applied Candidates List"
          open={isModalopen}
          closable={true}
          onOk={handleOk}
          onCancel={handleCancel}
          width={700}
        >
          <CandidateTable />
        </Modal>
      </DefaultLayout>
    </div>
  );
}

export default PostedJobs;
