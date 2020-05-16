import React from 'react';
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@material-ui/core';
import {Button} from '@material-ui/core';

function Slider(props)
{
    var items = [
        {
            name: "이미지1",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            img: "https://placeimg.com/960/540/3"

        },
        {
            name: "이미지2",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            img: "https://placeimg.com/960/540/2"
        }
    ]

    return (
        <Carousel width={1}>
            {
                items.map((item) => {
                    return <Item item={item} />;
                })
            }
        </Carousel>
    );
}
export default Slider;

function Item(props)
{
    return (
        <Paper width={1}>
            
            
            <img src={props.item.img} width="100%"></img>
            <p>{props.item.description}</p>
            {/* <Button className="CheckButton">
                이동
            </Button> */}
        </Paper>
    )
}