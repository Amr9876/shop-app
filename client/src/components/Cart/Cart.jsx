import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { loadStripe } from "@stripe/stripe-js";
import makeRequest from "../../makeRequest";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const calcTotalPrice = () => {
    let total = 0;

    products.forEach((item) => (total += item.quantity * item.price));

    return total.toFixed(2);
  };

  const stripePromise = loadStripe(
    "pk_test_51MLkwnHAZYuJigCmjG8rMXwIvfC6bLtSMyaAeInihJPAMB23BODTJyqoVmaRA6aSp0yQCGXXQ9hvDK22x9c5oJ1R00g4PC3aYZ"
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post("/orders", {
        products,
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });

      dispatch(resetCart());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {/* LOAD PRODUCTS */}
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img
            src={process.env.REACT_APP_UPLOAD_URL + item.img}
            alt="product_image"
          />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.description?.substring(0, 100)}</p>
            <div className="price">
              {item.quantity} x ${item.price}
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      {/* END */}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${calcTotalPrice()}</span>
      </div>
      <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
