import React, { Component } from 'react';
class Header extends Component{
	constructor(){
		super();
		this.state={
			name:"Unlike",
			count:0
		};
	}
    render(){
    	
    return(
      <div>
     	 <h1>Headerclass 5*5 = {5*5}</h1>
      	 <p>{this.props.title}</p>
      	 <p>{this.props.name}</p>
      	 <p>{this.props.price}</p>
      	 <h2>{this.state.name}</h2>
      	 <h2>{this.state.count}</h2>
     	 </div>
    );
  }
}
export default Header;