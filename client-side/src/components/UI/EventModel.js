import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from './Input';
import MessageBox from './MessageBox';

import { useDispatch, useSelector } from 'react-redux';
import axios from '../../helpers/axios';

const EventModel = (props) => {

    const { tourId, price,  newEventDate } = props;
    const [date, setDate] = useState([newEventDate, newEventDate]);
    const [startDatetime, setStartDatetime] = useState(newEventDate);
    const [endDatetime, setEndDatetime] = useState(newEventDate);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [meetingPoint, setMeetingPoint] = useState("");
    const [eventDetails, setEventDetails] = useState("");
    const [validated, setValidated] = useState("");
    const [pricingStrategy, setPricingStrategy] = useState("");
    const [budget, setBudget] = useState(price);

    const [message, setMessage] = useState("Interest successfully submitted!");
    const [messageModalShow, setMessageModalShow] = useState(false);
    const [currency, setCurrency] = useState("USD");
    const [isLoading, setIsLoading] = useState(false);
    const auth = useSelector(state => state.auth);

    // useEffect(()=>{
    //     setDate([newEventDate, newEventDate]);
    //    },[date]);

    const createEvent = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        setValidated(true);

        if (!auth.authenticate) {
            return <Redirect to={'/signin'} />
        }
        else {
            e.preventDefault();
            setIsLoading(true);

            const eventInfo = {
                date,
                tourId,
                numberOfPeople,
                meetingPoint,
                eventDetails,
                pricingStrategy,
                budget,
                currency
            }
            const res = await axios.post(`/create-event`, eventInfo);
            setMessageModalShow(true);
            setIsLoading(false);
            if (res.status !== 201) {
                setMessage(res.data.error.toString());
            } else {
                setMessage(res.data.msg);
            }
        }
    }

    console.log(startDatetime)
    return (
        
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Event📝
                </Modal.Title>
                <Button onClick={props.onHide}>X</Button>
            </Modal.Header>
            <MessageBox
                    show={messageModalShow}
                    onHide={() => setMessageModalShow(false)}
                    message={message}
                />
            <Modal.Body>
                <Form onSubmit={createEvent}>
                    <Row>
                         <Form.Label style={{ display: 'block' }}>Event Date
                                    {/* <Button variant="secondary">Add Another Date</Button> */}
                                </Form.Label>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <pre className="tab">
                                start<label className="codePink">:</label>
                                <DatePicker
                                    id="datePicker"
                                    selected={startDatetime}
                                    onChange={(datetime) => {
                                        setStartDatetime(datetime);
                                    }}
                                    style={{ width: "fit-content" }}
                                    showTimeSelect
                                    dateFormat="dd/MM/yyyy"
                                />
                                <label className="timeDisplay" htmlFor="datePicker">{`${
                                    startDatetime.getHours() <= 9 ? "0" + startDatetime.getHours() : startDatetime.getHours()
                                }:${
                                    startDatetime.getMinutes() <= 9 ? "0" + startDatetime.getMinutes() : startDatetime.getMinutes()
                                }`}</label>
                                </pre>
                            </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3">
                                <pre>
                                end<label>:</label>
                                <DatePicker
                                 style={{ width: "fit-content" }}
                                    id="datePicker"
                                    selected={endDatetime}
                                    onChange={(datetime) => {
                                        setEndDatetime(datetime);
                                    }}
                                    showTimeSelect
                                    dateFormat="dd/MM/yyyy"
                                />
                                <label htmlFor="datePicker">{`${
                                    endDatetime.getHours() <= 9 ? "0" + endDatetime.getHours() : endDatetime.getHours()
                                }:${
                                    endDatetime.getMinutes() <= 9 ? "0" + endDatetime.getMinutes() : endDatetime.getMinutes()
                                }`}</label>
                                </pre>
                            </Form.Group>
                        </Col>

            
            
                    </Row>

                    

                    <Row>
                        <Col>
                            <div className="mb-3">
                                <Form.Label>Choose Pricing Strategy</Form.Label>
                                <br />
                                <Form.Check
                                    required
                                    inline
                                    type='radio'
                                    name='pricingStrategy'
                                    label='Per Person'
                                    id='perPerson'
                                    value='perPerson'
                                    isInvalid={pricingStrategy===''}
                                    onChange={(e) => setPricingStrategy(e.target.value)}
                                />
                                <Form.Check
                                    inline
                                    type='radio'
                                    name='pricingStrategy'
                                    label='Per Group'
                                    id='perGroup'
                                    value='perGroup'
                                    isInvalid={pricingStrategy===''}
                                    onChange={(e) => setPricingStrategy(e.target.value)}
                                />
                                {/* Add estimated earnings, refactor tour creation to reflect costs */}
                            </div>
                        </Col>
                    </Row>


                   
                        { pricingStrategy === 'perPerson'?
                         <Row>
                        <Col md={6}>
                            <Input
                                label='cost per person'
                                type='number'
                                value={budget}
                                onChange={e => {
                                    setBudget(e.target.value);
                                }}
                                isInvalid={budget===0}
                                isReadOnly={false}
                                message='With Service tax included in Bill'
                            />
                        </Col> 
                        <Col md={6}>
                        <Input
                            label='Min number of people'
                            type='number'
                            isInvalid={numberOfPeople===0}
                            onChange={e => {
                                setNumberOfPeople(e.target.value);
                            }}
                            value={numberOfPeople} 
                            isReadOnly={false}
                        />
                    </Col>
                    </Row>
                     :          <Row>      
                        <Col md={6}>
                            <Input
                                label='cost per group'
                                type='number'
                                value={budget}
                                onChange={e => {
                                    setBudget(e.target.value);
                                }}
                                isInvalid={budget===0}
                                isReadOnly={false}
                                message='With Service tax included in Bill'
                            />
                        </Col>

                        <Col md={6}>
                        <Input
                            label='Max number of people per group'
                            type='number'
                            onChange={e => {
                                setNumberOfPeople(e.target.value);
                            }}
                            isInvalid={numberOfPeople===0}
                            value={numberOfPeople} 
                            isReadOnly={false}
                        />
                    </Col>
                        
                        </Row>} 
                        {/* <Col md={6}>
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
                        </Col> */}
                        {/* add currency */}
                    {/* </Row> */}
                    <Row>
                        <Col md={12}>
                            <Input
                                label='Event Details'
                                type='textarea'
                                placeholder='Event Details'
                                value={eventDetails}
                                isInvalid={eventDetails === ''}
                                onChange={(e) => setEventDetails(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Input
                                label='Meeting Point'
                                type='text'
                                placeholder='Meeting Point'
                                value={meetingPoint}
                                isInvalid={meetingPoint === ''}
                                onChange={(e) => setMeetingPoint(e.target.value)}
                            />
                        </Col>
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
                    {/* notify interested travelers? default yes */}
                    {/* {tour: interested, proposed, confirmed} */}
                    {/* create tour alert? default yes */}
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EventModel