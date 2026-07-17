import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  selectCartItems,
  updateQuantity,
} from "../features/cart/cartSlice";

function Cart() {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return <p>장바구니가 비어 있습니다</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item) => {
        const subtotal = item.price * item.quantity;

        return (
          <li
            key={item.id}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>{item.name}</span>
            <span>${item.price}</span>
            <button
              type="button"
              onClick={() =>
                dispatch(
                  updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                )
              }
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              type="button"
              onClick={() =>
                dispatch(
                  updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                )
              }
            >
              +
            </button>
            <span>소계: ${subtotal.toFixed(2)}</span>
            <button
              type="button"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              삭제
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Cart;
