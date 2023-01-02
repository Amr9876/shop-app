import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);

  const dispatch = useDispatch();

  return (
    <div className="product">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="images">
              <img
                src={
                  process.env.REACT_APP_UPLOAD_URL +
                  data?.attributes?.img?.data?.attributes?.url
                }
                alt="product_photo"
                onClick={(e) => setSelectedImg("img")}
              />
              <img
                src={
                  process.env.REACT_APP_UPLOAD_URL +
                  data?.attributes?.img2?.data?.attributes?.url
                }
                alt="product_photo"
                onClick={(e) => setSelectedImg("img2")}
              />
            </div>
            <div className="mainImg">
              <img
                src={
                  process.env.REACT_APP_UPLOAD_URL +
                  data?.attributes[selectedImg]?.data?.attributes?.url
                }
                alt="product_photo"
              />
            </div>
          </div>
          <div className="right">
            <h1>{data?.attributes?.title}</h1>
            <span className="price">${data?.attributes?.price}</span>
            <p>{data?.attributes?.description}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prevState) =>
                    prevState > 1 ? prevState - 1 : 1
                  )
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prevState) => prevState + 1)}>
                +
              </button>
            </div>
            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: data.id,
                    title: data.attributes?.title,
                    description: data.attributes?.description,
                    price: data.attributes?.price,
                    img: data.attributes?.img?.data?.attributes?.url,
                    quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>
            <div className="info">
              <span>Vendor: Polo</span>
              <span>Product Type: {data?.attributes?.type}</span>
              <span>
                Tag:{" "}
                {data?.attributes["sub_categories"]?.data?.map((item) =>
                  data?.attributes["sub_categories"]?.data?.indexOf(item) ===
                  data?.attributes["sub_categories"]?.data?.length
                    ? `${item?.attributes?.title}, `
                    : item?.attributes?.title
                )}
              </span>
            </div>
            <hr />
            {/* <div className="details">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
