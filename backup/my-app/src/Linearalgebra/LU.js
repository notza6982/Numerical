import React, { Component } from 'react';
import Leftmenu from '../Leftmenu';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import {round,lusolve} from 'mathjs';
import {Link} from 'react-router';
import {InputGroup} from 'react-bootstrap';
import { Button ,Layout,Col,InputNumber,Typography} from 'antd';
const { Header, Content} = Layout;
const { Text } = Typography;
var A = [], B = [], answer = [], matrixA = [], matrixB = [];
class LU extends Component{
	constructor() {
        super();
        this.state = {
            Row: "",
            Column: "",
            showInputForm: true,
            showMatrixForm: false,
            showAnswer: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.createMatrix = this.createMatrix.bind(this);
        this.lu = this.lu.bind(this);
    }
	 lu(){
         
		for(var i=0 ; i<this.state.Row ; i++) {
            A[i] = []
            for(var j=0 ; j<this.state.Column ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
        }
        var decompose = lusolve(A, B)
        for (i=0 ; i<this.state.Row ; i++) {
            answer.push("x"+(i+1)+" = "+round(decompose[i]));
            answer.push(<br/>)
        }

        this.setState({
            showAnswer: true,
        })
        
     }
     createMatrix(row, column) {
        for (var i=1 ; i<=row ; i++) {
            for (var j=1 ; j<=column ; j++) {
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
                id={"a"+i+""+j} key={"a"+i+""+j} placeholder={"a"+i+""+j} />)  
            }
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
            id={"b"+i} key={"b"+i} placeholder={"b"+i} />)
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
       <h1 style={{textAlign: 'center' }}><Text underline type="warning" >LU DECOMPOSITION</Text></h1>
           
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
      <InputGroup.Text id="inputGroup-sizing-sm">Row</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="2" type='Number'  name="Row" defaultValue={this.state.Row}  /> 
	<Col span={1} />

  <InputGroup.Prepend>
  <InputGroup.Text id="inputGroup-sizing-sm">Column</InputGroup.Text>
    </InputGroup.Prepend>
    <InputNumber placeholder="2" type='Number'  name="Column" defaultValue={this.state.Column}  /> 
	<Col span={1} />
  </InputGroup>
  <Button type="primary" size='large' onClick= { ()=>this.createMatrix(Number(this.state.Row),Number(this.state.Column))}>
	  <Link to="/Linearalgebra/LU">OK</Link></Button> </div>}
  
      
      {this.state.showMatrixForm && <div><h2>Matrix [A]</h2><br/>{matrixA}<h2>Vector [B]<br/></h2>{matrixB}
      <br />
      <h1 style={{textAlign: 'center' }}><Button type="primary" size='large' onClick= { ()=>this.lu()}>
	  <Link to="/Linearalgebra/LU">Submit</Link></Button></h1>
      </div>
      }
      </form>
      {this.state.showAnswer && <div>
      
      <br/><h2>Answer</h2><br/>{answer}</div>}

          </Content>
      </div>
    );
}
}
export default LU;