import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Welcome(props: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
    return <h1>Hello, {props.name}</h1>;
}

function Goodbye(props : {name : string | number | boolean | React.ReactElement<any, any>})
{
    return <h1>Goodbyes, {props.name}</h1>
}

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Welcome name="MEEEE" />;

// @ts-ignore
const element2 = <Goodbye name="abc" />;

root.render(element);
root.render(element2);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
