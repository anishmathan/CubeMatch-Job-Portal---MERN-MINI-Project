import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form,  Button, Upload } from "antd";
import {
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";


function resume (){
   
    return (
        <div>
            
          <DefaultLayout>
            
                <Form layout="vertical" >
                  <Row gutter={16}>
                   
    
                    <Col lg={8} sm={24}>
                      <Form.Item
    
                        rules={[{ required: true }]}
                        name="resume"
                        label="Upload Resume Here"
                        type="file"
                        value={resume}
                       
                      >
                        <Upload 
                          beforeUpload={(file) => {
                            console.log(file);
                            return false;
                          }}
    
                        >
                          <Button icon={<UploadOutlined />}>Click to Select file</Button>
                        </Upload>
                      </Form.Item>
                    </Col>
                   </Row> 
                   <Button htmlType="submit">Upload</Button>
                </Form>
          </DefaultLayout>
        </div>
    );
    
    
    
    
}

export default resume;

// const  [data, setData]= useEffect([])
// useEffect(()=>{
//     axios.get('http://localhost:4000/update')
//     .then((res)=>setData(res.data))
//     .catch((err)=>console.log(err, "Something Wrong "));
// });

// {
//     data.map((singleData)=>{
//         const base64String =btoa()
//         String.fromCharCode(...new Uint8Array(singleData.img.data.data)
//         );
//         <img> src={`data:image`}
//         </img>
//     })
// }