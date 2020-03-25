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
const { Header, Content} = Layout;
const { Text } = Typography;
class CompositeSimpson extends Component{
	constructor() {
        super();
        this.state = {
            fx: "",
            a: "",
            b: "",
            n: "",
            showans:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.simson = this.simson.bind(this);
    }
	  func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
	 simson(a,b,n){
      var h = (b-a)/n;
      var I = (h / 3) * (this.func(a) + this.func(b) + 4*this.summationFunction(1, n, 2*h) + 2*this.summationFunction(2, n, 2*h));
      var exact = this.exactIntegrate(a, b);
      var error = Math.abs((exact-I) / exact) * 100;
      answer.push(<h2>I = {I}</h2>);
      answer.push(<h2>Error = {error}%</h2>);
      answer.push(<br />);
      this.showans=true;
	 }
	 exactIntegrate(a, b) {
    var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
    return expr.eval({x:b}) - expr.eval({x:a})
  }
  summationFunction(start, n, h) {
    var sum = 0
    var counter = h
    for (var i=start ; i<n ; i+=2) {
        sum += this.func(counter)
        counter += 2*h
    }
    return sum
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
       <h1 style={{textAlign: 'center' }}><Text underline type="warning" >Composite Simpson</Text></h1>
           
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
      <InputGroup.Text id="inputGroup-sizing-sm">a</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="2" type='Number' name="a" defaultValue={this.state.a}  /> 

    <Col span={1} />
	<InputGroup.Prepend>
      <InputGroup.Text id="inputGroup-sizing-sm">b</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="8" type='Number'  name="b" defaultValue={this.state.b}  /> 


    <Col span={1} />
	<InputGroup.Prepend>
      <InputGroup.Text id="inputGroup-sizing-sm">n</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="8" type='Number'  name="n" defaultValue={this.state.n}  /> 
	
  </InputGroup>
      <h1 style={{textAlign: 'center' }}><Button type="primary" size='large' onClick= { ()=>this.simson(Number(this.state.a),Number(this.state.b),Number(this.state.n))}>
	  <Link to="/Integration/CompositeSimpson">Submit</Link></Button></h1>
      </form>
	  <br /> 

    {this.showans&&<div><h1>Answer</h1><br />{answer}</div>}


          </Content>
      </div>
    );
}
}

export default CompositeSimpson;