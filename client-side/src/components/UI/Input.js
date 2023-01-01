import React from 'react';
import { Form } from 'react-bootstrap';

const Input = (props) => {
    return (
        <Form.Group className="mb-3" noValidate validated={props.validated}>
            <Form.Label>{props.label}</Form.Label>
            {props.isReadOnly ?
                <Form.Control
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    required
                    readOnly
                />
                
                :
                <Form.Control
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    isInvalid={props.isInvalid}
                    onChange={props.onChange}
                    required
                />
            }
            <Form.Control.Feedback type="invalid">
            {props.invalidMessage ? props.invalidMessage : "please enter a valid input"}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default Input
