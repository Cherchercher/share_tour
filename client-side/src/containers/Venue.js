import React, { useState, useEffect } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import Layout from '../components/Layout/index.layout';
import { ImgsCard } from '../components/UI/ImgsCard';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { getOneVenue } from '../actions/venue.actions';
import { userInfo } from '../actions/userInfo.actions';
import BookingModel from '../components/UI/BookingModel';
import InterestModel from '../components/UI/InterestModel';
import { Redirect } from 'react-router';
// import RevoCalendar from'revo-calendar';

import checkmark from '../assets/images/checkmark.png';
import interest from '../assets/images/hands-up-icon.svg';
import lightbulb from '../assets/images/lightbulb.png';

import './Venue.css';

const eventList =
    [
        {
            "name": "Homer Simpson",
            "date": 1669676400968,
            "allDay": false,
            "extra": {
                "icon": "M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z",
                "text": "party of 5"
            }
        },
        {
            "name": "Han Solo",
            "date": 1669680900968,
            "allDay": false,
            "extra": {
                "icon": "M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z",
                "text": "party of 2"
            }
        },
        {
            "name": "Gandalf, the Grey",
            "date": 1669685400968,
            "allDay": false,
            "extra": {
                "icon": "M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z",
                "text": "party of 9"
            }
        },
        {
            "name": "Britta Perry",
            "date": 1669689900968,
            "allDay": false,
            "extra": {
                "icon": "M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z",
                "text": "party of 7"
            }
        },
        {
            "name": "Lunch with Michael",
            "date": 1669748400968,
            "allDay": false
        },
        {
            "name": "Meeting with Vito",
            "date": 1669761000968,
            "allDay": false
        },
        {
            "name": "Dinner with Fredo",
            "date": 1669773600968,
            "allDay": false
        },
        {
            "name": "Day after Tomorrow",
            "date": 1669836511968,
            "allDay": true,
            "extra": {
                "icon": "M12 9.312l-1.762.491 1.562.881-.491.871-1.562-.881.491 1.762-.963.268-.76-2.724-2.015-1.126v1.939l2 2-.707.707-1.293-1.293v1.793h-1v-1.793l-1.293 1.293-.707-.707 2-2v-1.939l-2.015 1.126-.761 2.724-.963-.268.491-1.762-1.562.882-.491-.871 1.562-.881-1.761-.492.269-.962 2.725.76 1.982-1.11-1.983-1.109-2.724.759-.269-.962 1.762-.491-1.563-.882.491-.871 1.562.881-.49-1.762.963-.269.76 2.725 2.015 1.128v-1.94l-2-2 .707-.707 1.293 1.293v-1.793h1v1.793l1.293-1.293.707.707-2 2v1.94l2.016-1.127.76-2.725.963.269-.492 1.761 1.562-.881.491.871-1.562.881 1.762.492-.269.962-2.725-.76-1.982 1.11 1.982 1.109 2.725-.76.269.963zm4-5.812v7.525c0 1.57-.514 2.288-1.41 3.049-1.011.859-1.59 2.107-1.59 3.426 0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5c0-1.319-.579-2.567-1.589-3.426-.897-.762-1.411-1.48-1.411-3.049v-7.525c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5zm5 0v7.525c0 .587.258 1.145.705 1.525 1.403 1.192 2.295 2.966 2.295 4.95 0 3.59-2.909 6.5-6.5 6.5s-6.5-2.91-6.5-6.5c0-1.984.892-3.758 2.295-4.949.447-.381.705-.94.705-1.526v-7.525c0-1.934 1.567-3.5 3.5-3.5s3.5 1.566 3.5 3.5zm0 14c0 1.934-1.567 3.5-3.5 3.5s-3.5-1.566-3.5-3.5c0-1.141.599-2.084 1.393-2.781 1.01-.889 1.607-1.737 1.607-3.221v-.498h1v.498c0 1.486.595 2.33 1.607 3.221.794.697 1.393 1.64 1.393 2.781z",
                "text": "-30º C"
            }
        }
    ]

const VenuePage = (props) => {
    document.title = "ShareTour | Venue Details";
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state => state.auth)
    const [bookingModalShow, setBookingModalShow] = useState(false);
    const [interestModalShow, setInterestModalShow] = useState(false);
    const [events, setEvents] = useState(eventList);
    const oneVenueInfo = useSelector(state => state.oneVenueInfo);
    const { _id, venueName, description, address, location, category, price, venuePictures, ownerInfo, ownerId } = oneVenueInfo.venue;

    if (oneVenueInfo.loading) {
        return (
            <Layout>
                <div className='text-center' style={{ marginTop: '60px' }}>
                    <h1>Getting venue info 🎉</h1>
                    <Spinner animation="border" variant="success" />
                </div>
            </Layout>
        );
    }
    if (oneVenueInfo.venue._id === '') {
        return <Redirect to={`/`} />
    }

    const showInterest = () => {
        if (!auth.authenticate) {
            history.push("/signin");
        } else {
            setInterestModalShow(true);
        }
    }

    const bookActivity = () => {
        if (!auth.authenticate) {
            history.push("/signin");
        } else {
            setBookingModalShow(true);
        }
    }

    function deleteEvent(i) {
        var temp = eventList
        temp.splice(i, 1)
        setEvents(temp)
    }
    
    function addEvent(newEventName, newEventDate, newEventAllDay, newEventIcon, newEventText) {
        var newEvent = {
            name: newEventName,
            date: newEventDate,
            allDay: newEventAllDay,
            extra: {
                icon: newEventIcon,
                text: newEventText
            }
        };
        var temp = eventList;
        temp.push(newEvent);
        setEvents([...temp]);
    }

    return (
        <Layout>
            <Container>
                <section className="mb-5">
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <ImgsCard
                                images={venuePictures}
                                alt='venue picture'
                            />
                        </div>

                        <div className="col-md-6">
                            <p style={{ fontSize: "22px" }}><strong>{venueName}</strong></p>
                            <p className="mb-2 text-muted text-uppercase small">{category}</p>


                            {
                                auth.user.role === "client" ?
                                    <>
                                        <div className="labeled-icon">
                                            <img className="icon-with-text" src={checkmark} /> confirmed trip
                                        </div>
                                        <Button variant="danger" onClick={()=> bookActivity()}>Book Now</Button>
                                        <p>5 people interests</p>
                                        <Button variant="primary" onClick={() => showInterest()}>I'm Interested!</Button>
                                        <Button variant="info" onClick={() => setBookingModalShow(true)}>View Interests Calendar</Button>
                                    </>
                                    :
                                    <>
                                        <div class="action-icons">
                                            <div className="labeled-icon">
                                                5 <img className="icon-with-text" src={interest} /> people interest
                                            </div>
                                            <div className="labeled-icon">
                                                2 <img className="icon-with-text" src={lightbulb} /> potential trips
                                            </div>
                                            <div className="labeled-icon">
                                                1 <img className="icon-with-text" src={checkmark} /> confirmed trip
                                            </div>
                                        </div>
                                        <Button variant="primary" onClick={() => showInterest()}>I'm Interested!</Button>
                                        <Button variant="info" onClick={() => setBookingModalShow(true)}>View Interests Calendar</Button>
                                    </>
                            }

                            {/* <RevoCalendar
                                events={eventList}
                                style={
                                    {borderRadius:"5px",
                                    border:"5px solid #4F6995"
                                }}
                                highlightToday={true}
                                lang="en"
                                primaryColor="#4F6995"
                                secondaryColor="#D7E6EE"
                                todayColor="#3B3966"
                                textColor="#333333"
                                indicatorColor="orange"
                                animationSpeed={300}
                                sidebarWidth={180}
                                detailWidth={280}
                                showDetailToggler={true}
                                showSidebarToggler={true}
                                allowDeleteEvent={true}
                                allowAddEvent={true}
                                openDetailsOnDateSelection={true}
                                timeFormat24={true}
                                onePanelAtATime={false}
                                showAllDayLabel={false}
                                detailDateFormat="DD/MM/YYYY"
                                deleteEvent={deleteEvent}
                                addEvent={addEvent}
                            /> */}

                            <p style={{ fontSize: "22px" }}><span className="mr-1" style={{ fontSize: "22px" }}><strong>$ {price}</strong></span></p>
                            <hr></hr>
                            <p className="pt-1">
                                <h5>Some words from Dealer -</h5>
                                {description}
                            </p>

                            <hr></hr>

                            <div className="table-responsive">
                                <table className="table table-sm table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>Location</strong></th>
                                            <td>{location}</td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>Address</strong></th>
                                            <td>{address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr></hr>
                                <table className="table table-sm table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>Dealer Name</strong></th>
                                            {
                                                auth.token === null ?
                                                    <td rowSpan="2" className="text-muted" style={{}}>
                                                        Login to see the Dealer Details
                                                    </td>
                                                    :
                                                    <td style={{ textTransform: 'capitalize' }}>{ownerInfo.ownerName}</td>
                                            }
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>Contact no</strong></th>
                                            {
                                                auth.token === null ?
                                                    null :
                                                    <td>{ownerInfo.contactNumber}</td>
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            {
                                auth.user.role === "client" ?
                                    <>
                                        <hr></hr>
                                        <Button variant="danger" onClick={() => setBookingModalShow(true)}>Book</Button>
                                    </>
                                    :
                                    null
                            }
                            <BookingModel
                                _id={_id}
                                venueName={venueName}
                                price={price}
                                category={category}
                                address={address}
                                location={location}
                                ownerId={ownerId}
                                show={bookingModalShow}
                                onHide={() => setBookingModalShow(false)}
                            />
                             <InterestModel
                                tourId={_id}
                                price={price}
                                show={interestModalShow}
                                onHide={() => setInterestModalShow(false)}
                            />
                        </div>
                    </div>
                </section>
            </Container>
        </Layout >
    )
}

export default VenuePage