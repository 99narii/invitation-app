import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/style.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Target container is not a DOM element");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

root.render(
  <ChakraProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>
);

reportWebVitals();
