import { Layout, Menu , Modal } from 'antd';
import React from 'react';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusSquareOutlined,
  HomeOutlined,
  UserOutlined,
  PlusOutlined,
  LogoutOutlined,
  BellFilled,
  TeamOutlined,
  FacebookOutlined,
  InstagramOutlined,
  EyeOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import { Link, } from 'react-router-dom';

import Filter from './Filter';

const { Header, Sider, Content, Footer } = Layout;


class DefaultLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      count: '',
      appliedCount: ''
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
    Modal.confirm({
      
      title: "Are you sure, you want to LOGOUT?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        localStorage.removeItem('user')
        window.location.href = "/login";
      },
    });

  }



  handleButtonClick = () => {
    console.log('Notify');
    const userData = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:4000/api/jobs/notifications/${userData._id}`)
      .then(async res => {
        const fetchData = await res.json()
        console.log('fetchData: ', fetchData.AppliedCount);
        this.setState({ appliedCount: fetchData.AppliedCount })
      })
      .catch(err => console.log('Err: ', err.message))
  };

  render() {
    const { count } = this.props;
  }
  handleClick = () => {
    const { history } = this.props;
    history.push("/posted");
  };

  componentDidMount = () => {
    this.handleButtonClick()
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'))
    const { data } = this.state;
    console.log('AppliedCount: ', this.state.appliedCount);

    return (
      <Layout>
        <Sider className='sider' trigger={null} collapsible collapsed={this.state.collapsed}
          style={{ position: 'sticky', overflow: 'auto', height: '100%', top: 0 }}
        >
          <div className="logo">
            {this.state.collapsed ? (<h1>CC</h1>) : (<h1>Cubematch- Claritaz</h1>)}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]}>
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to='/'>Home</Link>
              <br></br>
            </Menu.Item>
            <Menu.Item key="/profile" icon={<UserOutlined />}>
              <Link to='/profile'>Profile</Link>
            </Menu.Item><br></br>
            <Menu.Item key="/appliedjobs" icon={<PlusSquareOutlined />}>
              <Link to='/appliedjobs'>Applied Jobs</Link>
            </Menu.Item>
            <br></br>
            <Menu.Item key="/postjob" icon={<PlusOutlined />}>
              <Link to='/postjob'>Post Job</Link>
            </Menu.Item>
            <br></br>
             {/* <Menu.Item key="/posted" icon={<PlusOutlined />}>
              <Link to='/posted'>Posted Jobs</Link>
            </Menu.Item>  */}
            <br></br>
            <Menu.Item key="/Candidates" icon={<TeamOutlined />}>
              <Link to='/Candidates'> Applied Candidates</Link>
            </Menu.Item>
            <Menu.Item key="/ViewProfile" icon={<EyeOutlined />}>
              <Link to='/ViewProfile'> View Profile</Link>
            </Menu.Item>
            <Menu.Item key="/PrintResume" icon={<PrinterOutlined />}>
              <Link to='/PrintResume'> Print Resume</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined />}>
              <Link onClick={this.logout}>Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, position: 'sticky', overflow: 'auto', top: 0, zIndex: 9999 }}>

            <div className="flex justify-content-between">

              <div>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle, 
                })}
              </div>
              <div>
              <FacebookOutlined /> <InstagramOutlined />
              </div>
              
              <div>
                <Filter />
              </div>
              <div className='bell'>
              <BellFilled />
              <Link to={'/Posted'}> <button type="button" class="btn btn-primary" >
                Notifications
                {
                  this.state.appliedCount ?
                    (
                      <span className="badge badge-light mx-2"> {this.state.appliedCount} </span>
                    ) : 'No'
                }
              </button></Link>
             
              </div>
              
              <div style={{ display: this.state.collapsed ? 'none' : 'inline' }}>
                <h5 className="mr-2"> {<UserOutlined />}  <b>{user.username} </b></h5>
              </div>

            </div>



          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
          <Footer
            className='footer'
            style={{
              textAlign: 'center',
            }}
          >
            Cubematch-Claritaz © 2023. All rights reserved.
          </Footer>
        </Layout>
      </Layout>
    );
  };
}

export default DefaultLayout;