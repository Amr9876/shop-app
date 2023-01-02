import "./FeaturedProducts.scss";
import useFetch from "../../hooks/useFetch";
import Card from "../Card/Card";

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, saepe
          aut, cumque voluptatibus sed harum ad voluptas quos tempora unde,
          ipsam ut rerum! Dignissimos, deleniti! Quia quisquam eius corporis
          aspernatur. Ex culpa qui dicta ea blanditiis{" "}
        </p>
      </div>
      <div className="bottom">
        {error
          ? "something went wrong. please try again later"
          : loading
          ? "loading"
          : data?.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default FeaturedProducts;
