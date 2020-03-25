import React, { Component } from 'react';
import Leftmenu from '../Leftmenu';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import {compile} from 'mathjs';
import {Link} from 'react-router';
import {InputGroup,FormControl} from 'react-bootstrap';
import { Button ,Layout,InputNumber, Table,Typography} from 'antd';
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
class Onepoint extends Component{
  data() {
		axios.get('http://localhost:4000/onepoint')
		  .then(res => {
			//console.log(res.data[0].fx);
			this.setState({
				fx:res.data[0].fx,
				x0:res.data[0].x0,
			})
		  })
		  this.forceUpdate();
		  this.onep(Number(this.state.x0));
		  
	  }
	constructor() {
        super();
        this.state = {
            fx: "",
            x0: "",
            showTable: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onep = this.onep.bind(this);
    }
	  func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
	 onep(x0){
		var data  = []
		data['x'] = []
        data['error'] = []
        
		data['x'][0] = this.func(x0);
        data['error'][0] = "-"
        
		 var i=1;
		 do{
            data['x'][i] = this.func(data['x'][i-1]);
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
                xi:"x"+(i+1),
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
       <h1 style={{textAlign: 'center' }}><Text underline type="warning" >Onepoint</Text></h1>
           
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
	
  </InputGroup>
      <h1 style={{textAlign: 'center' }}><Button type="primary" size='large' onClick= { ()=>this.onep(Number(this.state.x0))}>
	  <Link to="/Rootofequation/Onepoint">Submit</Link></Button></h1>

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
export default Onepoint;