import React, { Component } from 'react';
import Leftmenu from '../Leftmenu';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import {compile} from 'mathjs';
import {Link} from 'react-router';
import {InputGroup,FormControl} from 'react-bootstrap';
import { Button ,Layout,Col,InputNumber, Table,Typography} from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
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
	  title: 'Xl',
	  dataIndex: 'xl',
	  key: 'xl',
	},
	{
	  title: 'XR',
	  dataIndex: 'xr',
	  key: 'xr',
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
class LeastSquares extends Component{
	constructor() {
        super();
        this.state = {
            fx: "",
            x: "",
			npoint: "",
            showTable: false,
            showGraph: false
            //moveLeft: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.lea = this.lea.bind(this);
    }
	  func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
	 lea(L,R){
		  var m1,m2;
		  var data  = []
        data['xl'] = []
        data['xr'] = []
		data['x'] = []
		data['error'] = []
		 m1 = (L+R)/2;
		data['xl'][0] = L
		data['xr'][0] = R
		data['x'][0] = m1
		data['error'][0] = "-"
		 if(this.func(m1)*this.func(R)>0){
  			R=m1;
		 }
		 else{
  		 	L=m1;
		 }
		 var i=1;
		 var count = Number(this.state.iteration);
		 do{
		 	 
			m2 = (L+R)/2;
			data['xl'][i] = L
			data['xr'][i] = R
			data['x'][i] = m2
			data['error'][i] = Math.abs((m2-m1)/(m2))
  			 if(this.func(m2)*this.func(R)>0){
    			 R=m2;
  			 }
  			 else{
   			  	 L=m2;
			   }
    		 m1=m2;
    		 i++;
			 
			 if(data['error'][i-1]==data['error'][i-2]){
				 break;
			 }
		  }while(data['error'][i-1]>0.000001)
		  this.createTable(data['xl'], data['xr'], data['x'],data['error']);
		  this.createGraph(data['error']);
	 }
	 createTable(xl, xr,m2,error) {
		
        dataInTable = []
        for (var i=0 ; i<xl.length ; i++) {
				dataInTable.push({
				iteration: i,
				xl: xl[i],
				xr: xr[i],
				x: m2[i],
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
       <h1 style={{textAlign: 'center' }}><Text underline type="warning" >Least-Squares Regression</Text></h1>
           
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
      <InputGroup.Text id="inputGroup-sizing-sm">x</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="1.5" type='Number' name="x" defaultValue={this.state.x}  /> 

    <Col span={1} />
	<InputGroup.Prepend>
      <InputGroup.Text id="inputGroup-sizing-sm">nPoint</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="2" type='Number'  name="npoint" defaultValue={this.state.npoint}  /> 
	
  </InputGroup>
      <h1 style={{textAlign: 'center' }}><Button type="primary" size='large' onClick= { ()=>this.lea(Number(this.state.xl),Number(this.state.xr))}>
	  <Link to="/Regression/LeastSquares">Submit</Link></Button></h1>
      </form>
	  <br /> 


	  {this.state.showTable && <Table columns={columns} dataSource={dataInTable}  bodyStyle={{fontWeight: "bold", fontSize: "18px"
	  , color: "black"}}></Table>}
	  <br /> <br /> <br /> 


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

export default LeastSquares;