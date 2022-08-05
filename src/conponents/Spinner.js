import React from 'react';
import spinnerImg from '../assets/loading.gif';

export default function Spinner(){
    return (
        <div>
            <img src={spinnerImg} alt='' className='d-block m-auto' style={{width:'200px'}}/>
        </div>
    )
}