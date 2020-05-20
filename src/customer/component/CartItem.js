import React,{useState,useEffect} from 'react';

export default function CartItem(props) {
    const [selectedProduct,setSelectedProduct] = useState({});
    const addToCart=(image, name, price, id,  quantity, checked)=> {
          setSelectedProduct({
              image: image,
              name: name,
              price: price,
              id: id,
              quantity: quantity,
              checked: checked
          }
          , function() {
            props.addToCart(selectedProduct);
          })
    };
    let image = props.image;
    let name = props.name;
    let price = props.price;
    let id = props.id;
    let quantity = props.productQuantity;
    return (
        <div className="container"> 
                <img 
                    className="itemImage" 
                    src={props.image} 
                    alt={props.name} 
                />
                {props.name}
                <div className="itemPrice">{props.price}</div>
                <button color="primary" onClick={()=>addToCart(image, name, price, id, quantity)}>장바구니에 담기</button>
        </div>
    );
}