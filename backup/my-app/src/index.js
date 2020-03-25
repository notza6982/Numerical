import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router,Route,Link,browserHistory} from 'react-router'
import Header from './Header';
import home from './home';
import { createStore } from 'redux';
import ComentReducer from './ComentReducer';
import { Provider } from 'react-redux'
import Bisection from './Rootofequation/Bisection';
import Newton from './Rootofequation/Newton';
import Falseposition from './Rootofequation/Falseposition';
import Onepoint from './Rootofequation/Onepoint';
import Secant from './Rootofequation/Secant';
import Cramer from './Linearalgebra/Cramer';
import Gauss from './Linearalgebra/Gauss';
import Jordan from './Linearalgebra/Jordan';
import LU from './Linearalgebra/LU';
import Choesky from './Linearalgebra/Choesky';
import Jacobi from './Linearalgebra/Jacobi';
import Simpson from './Integration/Simpson';
import CompositeSimpson from './Integration/CompositeSimpson';
import Trapezoidal from './Integration/Trapezoidal';
import CompositeTrapezoidal from './Integration/CompositeTrapezoidal';
import Forwardh from './Differentiation/Forwardh';
import Forwardh2 from './Differentiation/Forwardh2';
import Backwardh from './Differentiation/Backwardh';
import Backwardh2 from './Differentiation/Backwardh2';
import Centralh from './Differentiation/Centralh';
import Centralh2 from './Differentiation/Centralh2';
import LeastSquares from './Regression/LeastSquares';
import Lagrange from './Interpolation/Lagrange';
import Spline from './Interpolation/Spline';
import New from './Interpolation/New';
//const store = createStore(ComentReducer);

ReactDOM.render(
	//<Provider store={store}>
	<Router history={browserHistory}>
	<Route path="/" component={home}/>
	<Route path="/Header" component={Header}/>
	<Route path="/Rootofequation/Bisection" component={Bisection}/>
	<Route path="/Rootofequation/Falseposition" component={Falseposition}/>
	<Route path="/Rootofequation/Onepoint" component={Onepoint}/>
	<Route path="/Rootofequation/Newton" component={Newton}/>
	<Route path="/Rootofequation/Secant" component={Secant}/>
	<Route path="/Linearalgebra/Cramer" component={Cramer}/>
	<Route path="/Linearalgebra/Gauss" component={Gauss}/>
	<Route path="/Linearalgebra/Jordan" component={Jordan}/>
	<Route path="/Linearalgebra/LU" component={LU}/>
	<Route path="/Linearalgebra/Choesky" component={Choesky}/>
	<Route path="/Linearalgebra/Jacobi" component={Jacobi}/>
	<Route path="/Integration/Simpson" component={Simpson}/>
	<Route path="/Integration/CompositeSimpson" component={CompositeSimpson}/>
	<Route path="/Integration/Trapezoidal" component={Trapezoidal}/>
	<Route path="/Integration/CompositeTrapezoidal" component={CompositeTrapezoidal}/>
	<Route path="/Differentiation/Forwardh" component={Forwardh}/>
	<Route path="/Differentiation/Forwardh2" component={Forwardh2}/>
	<Route path="/Differentiation/Backwardh" component={Backwardh}/>
	<Route path="/Differentiation/Backwardh2" component={Backwardh2}/>
	<Route path="/Differentiation/Centralh" component={Centralh}/>
	<Route path="/Differentiation/Centralh2" component={Centralh2}/>
	<Route path="/Regression/LeastSquares" component={LeastSquares}/>
	<Route path="/Interpolation/Lagrange" component={Lagrange}/>
	<Route path="/Interpolation/New" component={New}/>
	<Route path="/Interpolation/Spline" component={Spline}/>
	</Router>,document.getElementById('root')
);
