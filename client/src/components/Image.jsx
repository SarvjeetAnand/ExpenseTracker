import React from 'react';
import image from '../asset/BW.png';

export default function Image() {
    return (
        <div className="h-25 d-inline-block" >
            <img src={image} alt="logo" style={{height: "200px"}}/>
        </div>
    );
}