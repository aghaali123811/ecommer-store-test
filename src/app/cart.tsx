// @ts-nocheck
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Card, Button } from "antd";
import { removeFromCart } from "../store/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <Card key={item.id} title={item.title}>
            <img src={item.image} alt={item.title} className="h-40 mx-auto" />
            <p>${item.price}</p>
            <Button onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </Button>
          </Card>
        ))
      )}
    </div>
  );
}
