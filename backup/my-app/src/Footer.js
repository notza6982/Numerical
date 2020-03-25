import React, { Component } from 'react';
class Footer extends Component{
	handleSubmit = (e) => {
		e.preventDefault();
		const name = this.getName.value;
		const message = this.getMessage.value;
		const data = {
			id: new Date(),
			name,
			message
		}
		this.props.dispatch({
			type:'ADD_COMMENT',
			data
		});
		this.getName.value="";
		this.getMessage.value="";
	}
    render(){
    return(
      <div>
      <h1>Comment form</h1>
      <form onSubmit={this.handleSubmit}>
      <input required type="text" placeholder="ป้อนชื่อ" ref={(input)=>this.getName = input} /><br/>
      <textarea required rows="5" cols="28" placeholder="ข้อความ" ref={(input)=>this.getMessage = input} /> <br />
      <button>Comment</button>
      
      </form>
      </div>
    );
  }
}
export default Footer;