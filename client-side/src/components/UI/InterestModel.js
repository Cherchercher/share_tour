import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Input from './Input';
import MessageBox from './MessageBox';

import { useDispatch, useSelector } from 'react-redux';
import axios from '../../helpers/axios';

const InterestModel = (props) => {

    const { tourId, price } = props;
    const [date, setDate] = useState([new Date(), new Date()]);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [message, setMessage] = useState("Interest successfully submitted!");
    const [budgetPerPerson, setBudgetPerPerson] = useState(price);
    const [messageModalShow, setMessageModalShow] = useState(false);
    const [currency, setCurrency] = useState("USD");
    const [isLoading, setIsLoading] = useState(false);
    const auth = useSelector(state => state.auth);
    console.log("auth info is", auth.user)
    const submitInterest = async (e) => {
        if (!auth.authenticate) {
            return <Redirect to={'/signin'} />
        }
        else {
            e.preventDefault();
            setIsLoading(true);
            const interestInfo = {
                tourId,
                numberOfPeople,
                budgetPerPerson,
                currency,
                date,
                userInfo: auth.user
            }
            const res = await axios.post(`/create-interest`, interestInfo);
            setMessageModalShow(true);
            setIsLoading(false);
            if (res.status !== 201) {
                setMessage(res.data.error.toString());
                // res.data._venue, show some information like name, email or text
            } else {
                setMessage(res.data.msg);
            }
            // else {
                //   log the error msg: res.data.msg,
                // error: res.data.error
                // some error message
            //     setMessage(true);
            //     return <MessageBox
            //     show={messageModalShow}
            //     onHide={() => setMessageModalShow(false)}
            //     message={res.data.error}
            // />
        }
    }

    return (
        
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Submit Interest📝
                </Modal.Title>
                <Button onClick={props.onHide}>X</Button>
            </Modal.Header>
            <MessageBox
                    show={messageModalShow}
                    onHide={() => setMessageModalShow(false)}
                    message={message}
                />
            <Modal.Body>
                <Form onSubmit={submitInterest}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ display: 'block' }}>When are you free to go?
                                    {/* <Button variant="secondary">Add Another Date</Button> */}
                                </Form.Label>
                                <DateRangePicker style={{ marginRight: '10px' }} onChange={setDate} value={date} />
                                <Button onClick={props.onHide}> + </Button>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Input
                                label='How many people are in your group?'
                                type='number'
                                onChange={e => {
                                    setNumberOfPeople(e.target.value);
                                }}
                                value={numberOfPeople} 
                                isReadOnly={false}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Currency</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={currency}
                                    onChange={e => {
                                        setCurrency(e.target.value);
                                    }}
                                >
                                    <option value="USD">USD</option>
                                    <option value="CAD">CAD</option>
                                    <option value="MXN">MXN</option>
                                </Form.Control>
                            </Form.Group>

                        </Col>
                        <Col md={6}>
                            <Input
                                label='budget per person'
                                type='number'
                                value={budgetPerPerson}
                                onChange={e => {
                                    setBudgetPerPerson(e.target.value);
                                }}
                                isReadOnly={false}
                                message='With Service tax included in Bill'
                            />
                        </Col>
                        {/* add currency */}
                    </Row>

                    <div className="text-center">
                        <Button variant="success" type="submit">
                            {
                                isLoading ?
                                    <>
                                        <Spinner animation="border" as="span" size="sm" variant="light" />
                                        {" "} Processing...
                                    </>
                                    :
                                    <span>Submit</span>
                            }
                        </Button>

                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default InterestModel