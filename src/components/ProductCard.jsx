import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
      })
    );
  };

  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {imageError ? (
        <div
          style={{
            width: "100%",
            height: "160px",
            background: "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
            fontSize: "14px",
          }}
        >
          이미지 없음
        </div>
      ) : (
        <img
          src={product.image}
          alt={product.name}
          onError={() => setImageError(true)}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "contain",
          }}
        />
      )}
      <h3 style={{ margin: 0, fontSize: "16px" }}>{product.name}</h3>
      <p style={{ margin: 0 }}>${product.price}</p>
      <button type="button" onClick={handleAddToCart}>
        장바구니 담기
      </button>
    </article>
  );
}

export default ProductCard;
