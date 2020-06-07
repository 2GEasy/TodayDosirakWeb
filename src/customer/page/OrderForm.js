import React,{useState,useEffect} from 'react';
import CheckForm from '../component/CheckForm';

export default function OrderForm(props) {
    return (
        <>
        <CheckForm su_id={props.location.state.su_id} />
        </>
    );
}