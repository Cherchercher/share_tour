import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from './MessageBox';
import axios from '../../helpers/axios';

const BookingModel = (props) => {

    const { _id, venueName, price, category, location, ownerId, address } = props;
    const [date, setDate] = useState([new Date(), new Date()]);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [messageModalShow, setMessageModalShow] = useState(false);
    const [message, setMessage] = useState("set message");
    const [budget, setBudget] = useState(price);
    const [currency, setCurrency] = useState("USD");
    const [isLoading, setIsLoading] = useState(false);

    const auth = useSelector(state => state.auth);
    
    const gotoCheckoutPage = async (e) => {
        if (!auth.authenticate) {
            return <Redirect to={'/signin'} />
        }
        else {
            e.preventDefault();
            setIsLoading(true);
            const dealInfo = {
                venueId: _id,
                venueName: venueName,
                venueOwnerId: ownerId,
                bill: price,
                eventDate: date.toString()
            }
            try {
                const res = await axios.post(`/checkout`, dealInfo);
                setMessageModalShow(true);
                setIsLoading(false);
                if (res.status !== 201) {
                    console.log(res.data.error);
                    setMessage(res.data.error.toString());
                    // res.data._venue, show some information like name, email or text
                } else {
                    setMessage("checkout success!");
                }
                localStorage.setItem('dealId', JSON.stringify(res.data.dealId));
                window.location.href = res.data.url;
            } catch (e) {
                setIsLoading(false);
                setMessageModalShow(true);
                setMessage(e.toString());
            }
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
                <Form onSubmit={gotoCheckoutPage}>
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
                                value={budget}
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

export default BookingModel