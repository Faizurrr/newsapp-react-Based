 import React, { Component } from 'react';
 import loading from './loading.gif';  // Make sure loading.gif exists at this path
 export default class Spinner extends Component {
render() {
     return (
    <div>
      <img src={loading} alt="loading"/>
       </div>
     );
  }
 }
