import { useSelector } from "react-redux";
import { selectCartTotal } from "../features/cart/cartSlice";

function CartSummary() {
  const total = useSelector(selectCartTotal);

  return <p>총액: ${total.toFixed(2)}</p>;
}

export default CartSummary;
