import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon} from 'antd';
import {Link} from 'react-router';
const { SubMenu } = Menu;
const PandaSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path
      d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
      fill="#6B676E"
      p-id="1143"
    />
    <path
      d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
      fill="#FFCC00"
      p-id="1144"
    />
    <path
      d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
      fill="#E9D7C3"
      p-id="1145"
    />
    <path
      d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
      fill="#FFFFFF"
      p-id="1146"
    />
    <path
      d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
      fill="#6B676E"
      p-id="1147"
    />
    <path
      d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
      fill="#464655"
      p-id="1148"
    />
    <path
      d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
      fill="#464655"
      p-id="1149"
    />
    <path
      d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
      fill="#464655"
      p-id="1150"
    />
  </svg>
);

const PandaIcon = props => <Icon component={PandaSvg} {...props} />;
class Leftmenu extends React.Component {
  handleClick = e => {

  };
  /*state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };*/
  render() {
    return (
      <div >
      <Menu
        //onClick={this.handleClick}
        //defaultSelectedKeys={['1']}
        //defaultOpenKeys={['sub1']}
        //mode="inline"
        //theme="light"
        //style={{ background: '#B6EFEA'}}
       
      >
        
        <SubMenu 
          key="sub1"
          title={
            <span>
              <PandaIcon style={{ fontSize: '32px' }} />
              <span>Menu</span>
            </span>
          }
        >
          <Menu.Item key="0"><Link to="/">Home</Link></Menu.Item>
          <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="bulb" />
              <span>Root of equation</span>
            </span>
          }
        >
            <Menu.Item key="1"><Link to="/Rootofequation/Bisection">Bisection</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/Rootofequation/Falseposition">Falseposition</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/Rootofequation/Onepoint">Onepoint</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/Rootofequation/Newton">Newton</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/Rootofequation/Secant">Secant</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="bulb" />
              <span>Linear algebra</span>
            </span>
          }
        >
            <Menu.Item key="6"><Link to="/Linearalgebra/Cramer">Cramer's Rule</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/Linearalgebra/Gauss">Gauss Elimination</Link></Menu.Item>
            <Menu.Item key="8"><Link to="/Linearalgebra/Jordan">Gauss Jordan</Link></Menu.Item>
            <Menu.Item key="9"><Link to="/Linearalgebra/LU">LU DECOMPOSITION</Link></Menu.Item>
            <Menu.Item key="10"><Link to="/Linearalgebra/Choesky">Choesky</Link></Menu.Item>
            <Menu.Item key="11"><Link to="/Linearalgebra/Jacobi">Jacobi</Link></Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="bulb" />
              <span>Integration</span>
            </span>
          }
        >
          <Menu.Item key="12"><Link to="/Integration/Simpson">Simpson</Link></Menu.Item>
          <Menu.Item key="13"><Link to="/Integration/CompositeSimpson">Composite Simpson</Link></Menu.Item>
          <Menu.Item key="14"><Link to="/Integration/Trapezoidal">Trapezoidal</Link></Menu.Item>
          <Menu.Item key="15"><Link to="/Integration/CompositeTrapezoidal">Composite Trapezoidal</Link></Menu.Item>
          
        </SubMenu>
        <SubMenu
          key="sub5"
          title={
            <span>
              <Icon type="bulb" />
              <span>Differentiation</span>
            </span>
          }
        >
          <Menu.Item key="16"><Link to="/Differentiation/Forwardh">Forwardh</Link></Menu.Item>
          <Menu.Item key="17"><Link to="/Differentiation/Forwardh2">Forwardh^2</Link></Menu.Item>
          <Menu.Item key="18"><Link to="/Differentiation/Backwardh">Backwardh</Link></Menu.Item>
          <Menu.Item key="19"><Link to="/Differentiation/Backwardh2">Backwardh^2</Link></Menu.Item>
          <Menu.Item key="20"><Link to="/Differentiation/Centralh">Centralh</Link></Menu.Item>
          <Menu.Item key="21"><Link to="/Differentiation/Centralh2">Centralh^2</Link></Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub6"
          title={
            <span>
              <Icon type="bulb" />
              <span>Regression</span>
            </span>
          }
        >
          <Menu.Item key="22"><Link to="/Regression/LeastSquares">Least-Squares Regression</Link></Menu.Item>


        </SubMenu>

        <SubMenu
          key="sub7"
          title={
            <span>
              <Icon type="bulb" />
              <span>Interpolation</span>
            </span>
          }
        >
          <Menu.Item key="23"><Link to="/Interpolation/Lagrange">Lagrange</Link></Menu.Item>
          <Menu.Item key="24"><Link to="/Interpolation/New">Newton</Link></Menu.Item>
          <Menu.Item key="25"><Link to="/Interpolation/Spline">Spline</Link></Menu.Item>


        </SubMenu>




        </SubMenu>
      </Menu>
      
      </div>
    );
  }
}
export default Leftmenu;