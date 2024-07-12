"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartProduct } from "../components/ProductDetails/types";
import toast from "react-hot-toast";
interface CartContextProps {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProduct[] | null;
  error: boolean;
  handleOffError: () => void;
  handleSetError: () => void;
  handleAddProduct: (product: CartProduct) => void;
  handleRemoveProduct: (id: string) => void;
  handleQtyIncrease: (product: CartProduct) => void;
  handleQtyDecrease: (product: CartProduct) => void;
  handleClearCard: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string|null) => void;
}
interface Props {
  [propsName: string]: any;
}
export const cartContext = createContext<CartContextProps | null>(null);
export const CartContextProvider = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cartTotalQty, setCartTotalQty] = useState(10);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
  useEffect(() => {
    const localCartProducts: any = localStorage.getItem("cartProducts");
    const parseLocalCartProducts: CartProduct[] | null =
      JSON.parse(localCartProducts);
    const orgPaymentIntent: any = localStorage.getItem("orgPaymentIntent");
    const paymentIntent: string | null = JSON.parse(orgPaymentIntent);
    setCartProducts(parseLocalCartProducts);
    setPaymentIntent(paymentIntent);
  }, []);
  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { totalAmount, total } = cartProducts?.reduce(
          (acc, item) => {
            const totalItem = item.quantity * item.price;
            acc.total += totalItem;
            acc.totalAmount += item.quantity;
            return acc;
          },
          { total: 0, totalAmount: 0 }
        );
        setCartTotalAmount(totalAmount);
        setCartTotalQty(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  const handleSetError = useCallback(() => {
    setLoading(true);
  }, []);
  const handleOffError = useCallback(() => {
    setLoading(false);
  }, []);

  const handleAddProduct = useCallback(
    (product: CartProduct) => {
      setCartProducts((prev) => {
        let updatedProducts;
        if (prev) {
          updatedProducts = [...prev, product];
        } else {
          updatedProducts = [product];
        }

        localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
        return updatedProducts;
      });
      toast.success("Added product successfully");
    },
    []
  );
  const handleRemoveProduct = useCallback(
    (id: string) => {
      const filteredCart = cartProducts?.filter((item) => item.id !== id);
      filteredCart && setCartProducts(filteredCart);
      toast.success("Product removed successfully");
      localStorage.setItem("cartProducts", JSON.stringify(filteredCart));
    },
    [cartProducts]
  );
  const handleQtyIncrease = useCallback(
    (product: CartProduct) => {
      let updatedCart;
      if (product.quantity >= 9)
        return toast.error(`Oops,Maximum quantity ${product.quantity}`);

      if (cartProducts) {
        updatedCart = [...cartProducts];
        const exsitIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (exsitIndex > -1) {
          ++updatedCart[exsitIndex].quantity;
          setCartProducts(updatedCart);

          localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
        }
      }
    },
    [cartProducts]
  );
  const handleQtyDecrease = useCallback(
    (product: CartProduct) => {
      let updatedCart;
      if (product.quantity <= 1)
        return toast.error(`Oops,Minimum quantity ${product.quantity}`);

      if (cartProducts) {
        updatedCart = [...cartProducts];
        const exsitIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (exsitIndex > -1) {
          --updatedCart[exsitIndex].quantity;
          setCartProducts(updatedCart);

          localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
        }
      }
    },
    [cartProducts]
  );
  const handleClearCard = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    setCartTotalAmount(0);
    localStorage.setItem("cartProducts", JSON.stringify(null));
  }, []);
  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val);
      localStorage.setItem("orgPaymentIntent", JSON.stringify(val));
    },
    []
  );

  const value = {
    loading,
    error,
    cartTotalQty,
    cartProducts,
    cartTotalAmount,
    paymentIntent,
    handleAddProduct,
    handleRemoveProduct,
    handleQtyIncrease,
    handleQtyDecrease,
    handleClearCard,
    handleSetPaymentIntent,
    handleSetError,
    handleOffError,
  };
  return <cartContext.Provider value={value} {...props} />;
};
export const useCart = () => {
  const context = useContext(cartContext);
  if (context === null)
    throw new Error("useCart must be used within a CartContextProvider");
  return context;
};
