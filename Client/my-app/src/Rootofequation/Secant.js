import React, { Component } from 'react';
import Leftmenu from '../Leftmenu';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import {compile} from 'mathjs';
import {Link} from 'react-router';
import {InputGroup,FormControl} from 'react-bootstrap';
import { Button ,Layout,Col,InputNumber, Table,Typography} from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios'
const { Header, Content} = Layout;
const { Text } = Typography;
var dataInTable = [];
var dataInGraph = [];
  const columns = [
	{
	  title: 'Iteration',
	  dataIndex: 'iteration',
	  key: 'iteration',
    },
    {
		title: 'Xi',
		dataIndex: 'xi',
		key: 'xi',
	},
	{
		title: 'X',
		dataIndex: 'x',
		key: 'x',
    },
	{
		title: 'Error',
		dataIndex: 'error',
		key: 'error',
	},
  ];
class Secant extends Component{
  data() {
		axios.get('http://localhost:4000/secant')
		  .then(res => {
			//console.log(res.data[0].fx);
			this.setState({
				fx:res.data[0].fx,
				x0:res.data[0].x0,
				x1:res.data[0].x1,
			})
		  })
		  this.forceUpdate();
		  this.se(Number(this.state.x0),Number(this.state.x1));
		  
	  }
	constructor() {
        super();
        this.state = {
            fx: "",
            x0: "",
            x1: "",
            showTable: false,
            showGraph: false
            //moveLeft: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.se = this.se.bind(this);
    }
	  func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
	 se(x0,x1){
		var data  = []
		data['x'] = []
    data['error'] = []
		data['x'][0] = x0;
    data['error'][0] = "-"
    data['x'][1] = x1;
    data['error'][1] = "-"
		 var i=2;
		 do{
            data['x'][i] = data['x'][i-1]-((this.func(data['x'][i-1])*(data['x'][i-1]-data['x'][i-2]))/((this.func(data['x'][i-1])-(this.func(data['x'][i-2])))))
            data['error'][i] = Math.abs((data['x'][i]-data['x'][i-1])/2)
    		 i++;
         if(data['error'][i-1]==data['error'][i-2]){
          break;
        }
          }while(data['error'][i-1]>0.000001)
          this.createTable(data['x'],data['error'])
          this.createGraph(data['error']);
	 }
	 createTable(x,error) {
        dataInTable = []
        for (var i=0 ; i<x.length ; i++) {
				dataInTable.push({
                iteration: i,
                xi:"x"+(i),
				x: x[i],
				error: error[i],
				});
		}
		this.state.showTable = true;
  }
  createGraph(error){
		dataInGraph = []
		for (var i=0 ; i<error.length ; i++) {
			dataInGraph.push({
			name: "Iteration"+i,
			error: error[i],
			});
  }
  this.state.showGraph=true;
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
       <h1 style={{textAlign: 'center' }}><Text underline type="warning" >Secant</Text></h1>
           
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
    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="x*4-13" name="fx" value={this.state.fx} />
  </InputGroup>
  <InputGroup size="sm" className="mb-3">
	<InputGroup.Prepend>
      <InputGroup.Text id="inputGroup-sizing-sm">X0</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="2" type='Number'  name="x0" defaultValue={this.state.x0}  /> 
	<Col span={1} />



  <InputGroup.Prepend>
  <InputGroup.Text id="inputGroup-sizing-sm">X1</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="2" type='Number'  name="x1" defaultValue={this.state.x1}  /> 
	<Col span={1} />



   
  </InputGroup>
      <h1 style={{textAlign: 'center' }}><Button type="primary" size='large' onClick= { ()=>this.se(Number(this.state.x0),Number(this.state.x1))}>
	  <Link to="/Rootofequation/Secant">Submit</Link></Button></h1>

    <h1 style={{textAlign: 'center' }}><Button type="primary" size='large' onClick= { ()=>this.data()}>
	  testcase</Button></h1>

    
      </form>
	  <br /> 
	  {this.state.showTable && <Table columns={columns} dataSource={dataInTable}  bodyStyle={{fontWeight: "bold", fontSize: "18px"
	  , color: "black"}}></Table>}
	  <br /> 


    {this.state.showGraph && <LineChart width={600} height={300} data={dataInGraph} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
    <Line type="monotone" dataKey="error" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>}

          </Content>
      </div>
    );
}
}
export default Secant;