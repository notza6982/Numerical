import React, { Component } from 'react';
import Leftmenu from '../Leftmenu';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import {round} from 'mathjs';
import {Link} from 'react-router';
import {InputGroup} from 'react-bootstrap';
import { Button ,Layout,Col,InputNumber,Typography} from 'antd';
const { Header, Content} = Layout;
const { Text } = Typography;
var A = [], B = [], answer = [], matrixA = [], matrixB = [];
class Jordan extends Component{
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
        this.jor = this.jor.bind(this);
    }
	 jor(){
         
		for(var i=0 ; i<this.state.Row ; i++) {
            A[i] = []
            for(var j=0 ; j<this.state.Column ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
        }

        var n = this.state.Row;
        var k=1;
        while (k < this.state.Row) { 
            for (var i=k ; i<this.state.Row ; i++) {
                var z= A[i][k-1]/A[k-1][k-1];
                for (var j=k-1 ; j<this.state.Column ; j++) {
                    A[i][j]=A[i][j]-(z*A[k-1][j]);
                }
                B[i]=B[i]-(z*B[k-1]);
                
            } 
            //answer.push(<h2>X{count} : {(det(transformMatrix)/det(A))}</h2>);
            //answer.push(<br/>)
            k++;
        }
        
        

        for (k=n-1 ; k>=0 ; k--) {
            for(i=k ; i>=0 ; i--) {
                
                if (i === k) {//Identity matrix
                    z = 1 / A[i][k];
            
                    for (j=0 ; j<n ; j++) {
                        A[i][j] = A[i][j] * z;
                    }
                    B[i] = B[i] * z;
                
                
                }
                else {
                    z = A[i][k] / A[k][k];
                    for (j=0 ; j<n ; j++) {
                        A[i][j] = A[i][j] - z*A[k][j];
                    }
                    B[i] = B[i] - z*B[k];
                }
            } 
        }
        alert(A);
        console.log(A);
        console.log(B);
        for (i=0 ; i<n ; i++) {
            answer.push("x"+(i+1)+" = "+round(B[i]));
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
       <h1 style={{textAlign: 'center' }}><Text underline type="warning" >Gauss Jordan</Text></h1>
           
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
	  <Link to="/Linearalgebra/Jordan">OK</Link></Button> </div>}
  
      
      {this.state.showMatrixForm && <div><h2>Matrix [A]</h2><br/>{matrixA}<h2>Vector [B]<br/></h2>{matrixB}
      <br />
      <h1 style={{textAlign: 'center' }}><Button type="primary" size='large' onClick= { ()=>this.jor()}>
	  <Link to="/Linearalgebra/Jordan">Submit</Link></Button></h1>
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
export default Jordan;