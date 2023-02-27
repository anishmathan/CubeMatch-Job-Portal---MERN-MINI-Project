import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Tabs, Input, Button, Upload, message } from "antd";
import {
  UploadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from "../redux/actions/userActions";
import axios from "axios";
const { TextArea } = Input;
const { TabPane } = Tabs;


function Profile() {

  const [personalInfo, setPersonalInfo] = useState();
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch()
  // const id = JSON.parse(localStorage.getItem('user'))

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [resume, setResume] = useState('');
  const [doc, setDoc] = useState('');
  const [about, setAbout] = useState('');
  const [address, setAddress] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [experience, setExperience] = useState('');


  const resumeupload = async (e) => {
    e.preventDefault();
    const users = new FormData();
    users.append("firstName", firstName);
    users.append("lastName", lastName);
    users.append("email", email);
    users.append("mobileNumber", mobileNumber);
    users.append("portfolio", portfolio);
    users.append("resume", resume);
    users.append("about", about);
    users.append("address", address);
    users.append("education", education);
    users.append("skills", skills);
    users.append("projects", projects);
    users.append("experience", experience);




    try {
      const response = await axios.post(`http://localhost:4000/api/users/update/${user._id}`, users)
      if (response.status == '200') {
        setFirstName('');
        setLastName('');
        setEmail('');
        setMobileNumber('');
        setPortfolio('');
        setResume('');

        setAbout('');
        setAddress('');
        setEducation('');
        setSkills('');
        setProjects('');
        setExperience('');
        message.success("Updated success");

      }
    } catch (error) {
      if (error.response.data.status == '404')
        alert("not updated");
    }
  }


  function onPersonInfoSubmit(values) {
    setPersonalInfo(values);
    console.log(values);
    setActiveTab("2");
  }

  //********************************************************** */


  function onFinalFinish(values) {

    const finalObj = { ...personalInfo, ...values }

    console.log(finalObj)

    dispatch(updateUser(finalObj))


  }
  const user = JSON.parse(localStorage.getItem('user'));
  const resumeName = user.resume.split("/");
  const userid = JSON.parse(localStorage.getItem("user"))._id;

  // Pass the file name as a prop to the EditForm component

  return (

    <div>
      <DefaultLayout>
        <Tabs defaultActiveKey="1" activeKey={activeTab}>
          <TabPane tab="Personal Info" key="1">
            <Form layout="vertical" onFinish={onPersonInfoSubmit} initialValues={user}>
              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="First name"
                    required
                    rules={[{ required: true }]}
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)} value={firstName}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Last name"
                    required
                    rules={[{ required: true }]}
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)} value={lastName}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Email"
                    required
                    rules={[{ required: true }]}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)} value={email}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Mobile Number"
                    required
                    rules={[{ required: true }]}
                    name="mobileNumber"
                    onChange={(e) => setMobileNumber(e.target.value)} value={mobileNumber}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Portfolio"
                    required
                    rules={[{ required: true }]}
                    name="portfolio"
                    onChange={(e) => setPortfolio(e.target.value)} value={portfolio}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item

                    rules={[{ required: true }]}
                    name="resume"
                    label="Upload Resume Here"
                    type="file"
                    onChange={(e) => setResume(e.target.files[0])}
                  >
                    <Upload
                      fileName={resume}
                      beforeUpload={(file) => {
                        console.log(file);
                        return false;
                      }}
                    >

                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    <a href={user.resume} target="_blank" rel="noreferrer">
                      View File
                    </a>
                    <p name="resume">{resumeName[4]}</p>
                  </Form.Item>
                </Col>
                <Col lg={24} sm={24}>
                  <Form.Item
                    label="About"
                    required
                    rules={[{ required: true }]}
                    name="about"
                    onChange={(e) => setAbout(e.target.value)} value={about}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col lg={24} sm={24}>
                  <Form.Item
                    label="Address"
                    required
                    rules={[{ required: true }]}
                    name="address"
                    onChange={(e) => setAddress(e.target.value)} value={address}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
              </Row>
              <Button htmlType="submit">Next</Button>
            </Form>
          </TabPane>
          <TabPane tab="Skills and Education" key="2">
            <Form initialValues={user} layout="vertical" onFinish={onFinalFinish}>
              <Row>
                <Col lg={24} sm={24}>
                  <Form.List name="education">
                    {(education, { add, remove }) => (
                      <div>
                        {education.map((field, index) => (
                          <div className="flex">
                            <Form.Item
                              required
                              {...field}
                              label="Education"
                              style={{ width: "80%" }}
                              rules={[{ required: true }]}
                              onChange={(e) => setEducation(e.target.value)} value={education}
                            >
                              <TextArea rows={4} />
                            </Form.Item>
                            <Button onClick={() => { add() }}>Add more</Button>
                            {index !== 0 && (<Button onClick={() => { remove(index) }}>Delete</Button>)}
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.List>
                </Col>

                <Col lg={24} sm={24}>
                  <Form.List name="skills">
                    {(skills, { add, remove }) => (
                      <div>
                        {skills.map((field, index) => (
                          <div className="flex">
                            <Form.Item
                              required
                              {...field}
                              label="Skill"
                              style={{ width: "80%" }}
                              rules={[{ required: true }]}
                              onChange={(e) => setSkills(e.target.value)} value={skills}
                            >
                              <TextArea rows={4} />
                            </Form.Item>
                            <Button onClick={() => { add() }}>Add more</Button>
                            {index !== 0 && (<Button onClick={() => { remove(index) }}>Delete</Button>)}
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.List>
                </Col>

                <Col lg={24} sm={24}>
                  <Form.List name="projects">
                    {(projects, { add, remove }) => (
                      <div>
                        {projects.map((field, index) => (
                          <div className="flex">
                            <Form.Item
                              required
                              {...field}
                              label="Project"
                              style={{ width: "80%" }}
                              rules={[{ required: true }]}
                              onChange={(e) => setProjects(e.target.value)} value={projects}
                            >
                              <TextArea rows={4} />
                            </Form.Item>
                            <Button onClick={() => { add() }}>Add more</Button>
                            {index !== 0 && (<Button onClick={() => { remove(index) }}>Delete</Button>)}
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.List>
                </Col>
                <Col lg={24} sm={24}>
                  <Form.List name="experience">
                    {(experience, { add, remove }) => (
                      <div>
                        {experience.map((field, index) => (
                          <div className="flex">
                            <Form.Item
                              required
                              {...field}
                              label="Experience"
                              style={{ width: "80%" }}
                              rules={[{ required: true }]}
                              onChange={(e) => setExperience(e.target.value)} value={experience}
                            >
                              <TextArea rows={4} />
                            </Form.Item>
                            <Button onClick={() => { add() }}>Add more</Button>
                            {index !== 0 && (<Button onClick={() => { remove(index) }}>Delete</Button>)}
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.List>
                </Col>
              </Row>
              <Button onClick={() => { setActiveTab("1") }}>Previous</Button>
              <Button htmlType="submit" onClick={resumeupload}>Update</Button>
            </Form>
          </TabPane>
        </Tabs>
      </DefaultLayout>
    </div>
  );
}

export default Profile;


//******************************************************************88 */

  // function handleFormSubmittion(e) {
  //   e.preventDefault();

  //   let form = document.getElementById ('form');
  //   let users = new FormData (form);

  //   axios.post ('http://localhost:4000/api/users/update', users);

  //   // do something
  //   console.log("Form submitted")
  // }
  // function handleresume(e) {
  //   setUploadedFile(e.target.value);
  // }

  //********************************* */

  // const handleInputChange = (e) => {
  //   const value = e.target.value
  //   const firstName = e.target.firstName
  //   const lastName = e.target.lastName
  //   const email = e.target.email
  //   const mobileNumber = e.target.mobileNumber
  //   const portfolio = e.target.portfolio
  //   const resume = e.target.file
  //   const  about = e.target.about
  //   const address = e.target.address
  //   const education = e.target.education
  //   const skills = e.target.skills
  //   const projects = e.target.projects
  //   const  experience = e.target. experience
  //   setPersonalInfo({
  //     ...personalInfo,
  //     [firstName]: value,
  //     [lastName]: value,
  //     [email]: value,
  //     [mobileNumber]: value,
  //     [portfolio]: value,
  //     [resume]: value,
  //     [about]: value,
  //     [address]: value,
  //     [education]: value,
  //     [skills]: value,
  //     [projects]: value,
  //     [experience]: value,


  //   })
  // }   
