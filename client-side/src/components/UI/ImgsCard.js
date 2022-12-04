import React from 'react';
import { Carousel } from 'react-bootstrap';

import { getPublicURL } from '../../urlConfig';

const ImgsCard = (props) => {
    const { images, alt, style } = props;
    console.log(images);
    return (
        <Carousel>
        {images.map((image, i) => 
            <Carousel.Item key={i}>
            <img
                className="d-block w-100"
                src={getPublicURL(image.img)}
                alt={alt}
                style={style}
            />
        </Carousel.Item>)}
        </Carousel>
    );
    return;
}

export { ImgsCard }