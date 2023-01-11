import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { candilog } from "../redux/actions/userActions";
import UserHome from "../userPages/UserHome";

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function CandiLog() {
  const dispatch = useDispatch()
  function log(values) {

    dispatch(candilog(values))

  }

  return (
    <div className="login">
      <Row justify="center" className="flex align-items-center">
        <Col lg={5}><h1 className="heading1" data-aos='slide-left'>Cubematch</h1></Col>
        <Col lg={12} sm={24} className="bs p-5 login-form">
          <h3> Candidate Login</h3>
          <hr />
          <Form layout="vertical" onFinish={candilog}>
            <Form.Item
              label="username"
              name="username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Button htmlType="submit" className='mb-3' href="/UserHome">Login</Button>
          </Form>
        </Col>
        <Col lg={5}><h1 className='heading2' data-aos='slide-right'>claritaz</h1></Col>
      </Row>
    </div>
  );
}

export default CandiLog;
