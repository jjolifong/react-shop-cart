import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { fetchProducts } from "./services/productApi";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CartSummary from "./components/CartSummary";
import AuthStatus from "./components/AuthStatus";

function App() {
  const [user, setUser] = useState("checking");
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setStatus("loading");
      setIsMock(false);
      try {
        const { products: nextProducts, isMock: nextIsMock } =
          await fetchProducts();
        if (cancelled) return;
        setProducts(nextProducts);
        setIsMock(nextIsMock);
        setStatus(nextProducts.length === 0 ? "empty" : "success");
      } catch {
        if (cancelled) return;
        setStatus("error");
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const authChecking = user === "checking";

  return (
    <div style={{ padding: "16px" }}>
      <section style={{ marginBottom: "24px" }}>
        <AuthStatus user={authChecking ? null : user} authChecking={authChecking} />
      </section>

      <section style={{ marginBottom: "24px" }}>
        <h2>장바구니</h2>
        <Cart />
        <CartSummary />
      </section>

      <section>
        <h2>상품 목록</h2>
        {status === "loading" && <p>불러오는 중...</p>}
        {status === "error" && <p>상품을 불러오지 못했습니다.</p>}
        {status === "empty" && <p>상품이 없습니다.</p>}
        {status === "success" && (
          <>
            {isMock && (
              <p>상품 서버에 연결할 수 없어 샘플 데이터를 표시합니다</p>
            )}
            <ProductList products={products} />
          </>
        )}
      </section>
    </div>
  );
}

export default App;
