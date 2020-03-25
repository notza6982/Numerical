import React from 'react';
import Leftmenu from './Leftmenu';
import 'antd/dist/antd.css';
import {Layout,Typography} from 'antd';

const { Header, Content} = Layout;
const { Text } = Typography;





class home extends React.Component {
  render () {
    var mystyle={
			fontSize:15,
		}
    return(
      <div style={{ background: '#B6EFEA'}}>
      <Leftmenu/> 
          <Header style={{ background: '#B6EFEA', padding: 0}}> 
          </Header>
          <Content
            style={{
              margin: '0px 0px',
              padding: 24,
              background: '#B6EFEA',
			  minHeight: 543,
            }}
          > 
          <br /> <br /> <br />
          <h1 style={{textAlign: 'center' , fontSize:150 }}  ><Text type="warning" >Numerical</Text></h1>
          </Content>
      </div>
    );
  }
}

export default home;