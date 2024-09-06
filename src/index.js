
// correct one
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// var factory = require('./hello_react.js');

// factory().then((instance) => {
//   instance._hello_react(); // direct calling
//   instance.ccall("hello_react", null, null, null);
// });

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Dynamically import the Emscripten-generated module
import('./hello_react.js').then((factory) => {
  // The default export from the Emscripten-generated module is a function
  factory.default().then((instance) => {
    instance._hello_react(); // Direct call to the WebAssembly function
    instance.ccall("hello_react", null, null, null); // Calling via ccall
  }).catch((error) => {
    console.error('Failed to instantiate WebAssembly module', error);
  });
}).catch((error) => {
  console.error('Failed to load WebAssembly module', error);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
