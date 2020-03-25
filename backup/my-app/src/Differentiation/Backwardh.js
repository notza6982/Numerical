import React, { Component } from 'react';
import Leftmenu from '../Leftmenu';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import {compile} from 'mathjs';
import {Link} from 'react-router';
import {InputGroup,FormControl} from 'react-bootstrap';
import { Button ,Layout,Col,InputNumber, Table,Typography} from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
var Algebrite = require('algebrite')
var answer = [];
var y;
const { Header, Content} = Layout;
const { Text } = Typography;
class Backwardh extends Component{
	constructor() {
        super();
        this.state = {
            fx: "",
            x: "",
            h: "",
            order:"",
            showans:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.backward = this.backward.bind(this);
    }
	  func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    backward(order,x,h){
        if(order==1){
            y = (this.func(x) - this.func(x-(1*h))) / h;
        }
        else if(order==2){
            y = (this.func(x) - 2*this.func(x-(1*h)) + this.func(x-(2*h))) / Math.pow(h, 2);
        }
        else if(order==3){
            y = (this.func(x) - 3*this.func(x-(1*h)) + 3*this.func(x-(2*h)) - this.func(x-(3*h))) / Math.pow(h, 3);
        }
        else if(order==4){
            y = (this.func(x) - 4*this.func(x-(1*h)) + 6*this.func(x-(2*h)) - 4*this.func(x-(3*h)) + this.func(x-(4*h))) / Math.pow(h, 4);
        }
        else{
            y="Input order again";
        }
        this.showans=true;
	 }
	 
	onFormSubmit = event => {
        event.preventDefault();
	}
	handleChange(event) {
        this.setState({
			[event.target.name]: event.target.value
        });

    }
	render(){
		var mystyle={
			fontSize:15,
		}
    return(
      <div style={{ background: '#B6EFEA'}}>
	  
      <Leftmenu/>
          <Header style={{ background: '#B6EFEA', padding: 0}}>
       <h1 style={{textAlign: 'center' }}><Text underline type="warning" >Backwardh</Text></h1>
           
          </Header>
          <Content
            style={{
              margin: '0px 0px',
              padding: 24,
              background: '#B6EFEA',
			  minHeight: 543,
            }}
          >
     <form onSubmit={this.onFormSubmit} onChange={this.handleChange}>
		 
	 <InputGroup size="sm" className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="inputGroup-sizing-sm">F(x)</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="4x^5-3x^4+x^3-6x+2" name="fx" value={this.state.fx} />
  </InputGroup>
  
	<InputGroup size="sm" className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="inputGroup-sizing-sm">Order</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="2" type='Number' name="order" defaultValue={this.state.order}  /> 

    <Col span={1} />
	<InputGroup.Prepend>
      <InputGroup.Text id="inputGroup-sizing-sm">x</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="8" type='Number'  name="x" defaultValue={this.state.x}  /> 

    <Col span={1} />
	<InputGroup.Prepend>
      <InputGroup.Text id="inputGroup-sizing-sm">h</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="8" type='Number'  name="h" defaultValue={this.state.h}  /> 
	
  </InputGroup>
      <h1 style={{textAlign: 'center' }}><Button type="primary" size='large' onClick= { ()=>this.backward(Number(this.state.order),Number(this.state.x),Number(this.state.h))}>
	  <Link to="/Differentiation/Backwardh">Submit</Link></Button></h1>
      </form>
	  <br /> 

    {this.showans&&<div><h1>Answer</h1><br />{y}</div>}


          </Content>
      </div>
    );
}
}

export default Backwardh;