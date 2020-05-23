import React,{useState,useEffect} from 'react';
import CheckForm from '../component/CheckForm';

export default function OrderForm(props) {
    return (
        <>
        <CheckForm su_id={props.location.state.su_id} mn_id={props.location.state.mn_id} name={props.location.state.name} price={props.location.state.price} amount={props.location.state.amount} />
        </>
    );
}