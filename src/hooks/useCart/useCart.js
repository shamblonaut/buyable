import { useLocalStorage } from "@/hooks";
import { cartReducer } from "@/reducers";

const useCart = () => {
  const [cart, setCart] = useLocalStorage("cart", {});
  const dispatch = (action) => {
    setCart((cart) => cartReducer(cart, action));
  };

  return [cart, dispatch];
};

export default useCart;
