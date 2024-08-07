import React from 'react';
import Button from 'react-bootstrap/Button';
import './ReusableButton.css';

function ReusableButton(props) {
  return (
    <Button className={`button ${props.color}`} size={props.size}
     onClick={props.onClick}>
      {props.text}
    </Button>
  );
}
export default ReusableButton;