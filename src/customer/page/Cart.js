import React,{useState,useEffect} from 'react';
import CartItem from '../component/CartItem';

export default function Cart(props) {
    const [products,setProducts] = useState();
    const [cart,setCart] = useState([]);
    const [quantity,setQuantity] = useState(1);
    const [totalAmount,setTotalAmount] = useState(0);

    useEffect(()=>{
        let cart = localStorage.cart;
        if(cart) {
        setCart(prevCart => JSON.parse(cart)
        , function() {
            sumTotalAmount();
        })
        }
    },[])

    useEffect(()=>{
        localStorage.cart = JSON.stringify(cart);
    },[cart])

    //장바구니에 선택한 물품을 추가하는 method
    const handleAddToCart=(selectedProducts)=> {
        let cartItem = cart;
        let productID = selectedProducts.id;
        if (checkProduct(productID)) {
          let index = cartItem.findIndex(item => {
            return item.id === productID;
          });
          cartItem[index].quantity += 1;
          setCart(cartItem);
        } else {
            cartItem.push(selectedProducts);
            setCart(cartItem);
            setQuantity(1);
        }
    }
    //제품을 map함수를 이용해 렌더링한다.
    const renderFoodDetail=()=> {
        return products.map(product => {
          return (
            <Route
              exact
              path={`/item/${product.id}`}
              render={props => {
                return (
                  <CartItem
                    addToCart={handleAddToCart}
                    productQuantity={quantity}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    id={product.id}
                    key={product.id}
                  />
                );
              }}
            />
          );
        });
    }
    //장바구니에 이미 제품이 있는지 확인하는 method
    const checkProduct=(id)=> {
        let cart = cart;
        return cart.some(item => {
          return item.id === id;
        });
    };

    // 장바구니에 담긴 물품들의 가격 총합을 구하는 method
    const sumTotalAmount=()=> {
        let cart = cart;
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].checked === true) {
            total += cart[i].price * Number(cart[i].quantity);
          }
        }
        setTotalAmount(total);
        
    }
    return (
        <div>
        <Nav />
        <Switch>
          <Route
            exact
            path="/"
            render={props => {
              return (
                <Main
                  products={this.state.products}
                />
              );
            }}
          />
          <Route
            exact
            path="/cart"
            render={props => {
              return (
                <Cart
                  cart={this.state.cart}
                  totalAmount={this.state.totalAmount}
                />
              );
            }}
          />
          {this.renderFoodDetail()}
        </Switch>
      </div>
    );
}