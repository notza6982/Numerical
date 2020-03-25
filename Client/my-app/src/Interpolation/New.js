import React, { Component } from 'react';
import Leftmenu from '../Leftmenu';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import {det} from 'mathjs';
import {Link} from 'react-router';
import {InputGroup} from 'react-bootstrap';
import { Button ,Layout,Col,InputNumber,Typography} from 'antd';
const { Header, Content} = Layout;
const { Text } = Typography;
var A = [], B = [], answer = [], matrixA = [], matrixB = [];
class New extends Component{
	constructor() {
        super();
        this.state = {
            n: "",
            x: "",
            showInputForm: true,
            showMatrixForm: false,
            showAnswer: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.createMatrix = this.createMatrix.bind(this);
        this.newt = this.newt.bind(this);
    }
	 newt(n,x){ 
         var X = [];
         var Fx = [];
         var sum = 0;
        for(var i=0 ; i<n ; i++) {
            X.push(parseFloat(document.getElementById("x"+i).value));
            Fx.push(parseFloat(document.getElementById("fx"+i).value));
        }
        if(n==2){
            var c0,c1
            c0 = Fx[0];
            c1 = (Fx[1]-Fx[0])/(X[1]-X[0]);
            console.log(c0,c1);
            sum = c0+(c1*(x-X[0]));
        }
        if(n==3){
            var c0,c1,c2
            c0 = Fx[0]
            c1 = (Fx[1]-Fx[0])/(X[1]-X[0]);
            c2 = (((Fx[2]-Fx[1])/(X[2]-X[1]))-((Fx[1]-Fx[0])/(X[1]-X[0])))/(X[2]-X[0]);
            sum = c0+(c1*(x-X[0]))+(c2*(x-X[0])*(x-X[1]));
        }
        if(n>3){
            alert("Number of Point must 2 or 3");
            alert("Plese input again");
        }
        answer.push(sum)
        this.setState({
            showAnswer: true,
        })
	 }
     createMatrix(n) {
        for (var i=0 ; i<n ; i++) {
            matrixA.push(<InputNumber style={{
                width: "18%",
                height: "50%", 
                backgroundColor:"#8F7B2A", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"x"+i} key={"x"+i} placeholder={"x"+i}/>)  
            matrixA.push(<br/>)
            matrixB.push(<InputNumber style={{
                width: "18%",
                height: "50%", 
                backgroundColor:"black", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"fx"+i} key={"fx"+i} placeholder={"fx"+i} />)
            matrixB.push(<br/>)
        }

        this.setState({
            showInputForm: false,
            showMatrixForm: true,
        })
        

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
       <h1 style={{textAlign: 'center' }}><Text underline type="warning" >Newton</Text></h1>
           
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
         {this.state.showInputForm && <div><InputGroup size="sm" className="mb-3">
	<InputGroup.Prepend>
      <InputGroup.Text id="inputGroup-sizing-sm">Number of point</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="2" type='Number'  name="n" defaultValue={this.state.n}  /> 
	<Col span={1} />
    <InputGroup.Prepend>
      <InputGroup.Text id="inputGroup-sizing-sm">x</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="2" type='Number'  name="x" defaultValue={this.state.x}  /> 
	<Col span={1} />
  </InputGroup>
  

  
  

  <Button type="primary" size='large' onClick= { ()=>this.createMatrix(Number(this.state.n))}>
	  <Link to="/Interpolation/New">OK</Link></Button> </div>}
  
      
      {this.state.showMatrixForm && <div><h2>Matrix [X]</h2><br/>{matrixA}<h2>Matrix [Fx]<br/></h2>{matrixB}
      <br />
      <h1 style={{textAlign: 'center' }}><Button type="primary" size='large' onClick= { ()=>this.newt(Number(this.state.n),Number(this.state.x))}>
	  <Link to="/Interpolation/New">Submit</Link></Button></h1>
      </div>
      }
      </form>
      {this.state.showAnswer && <div><br/><h2>Answer</h2><br/>{answer}</div>}

          </Content>
      </div>
    );
}
}
export default New;