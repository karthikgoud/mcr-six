import { NavLink, useParams } from "react-router-dom";
import styles from "./RestaurantDetail.module.css";
import { useData } from "../../context/DataContext";
import { useRef, useState } from "react";

const RestaurantDetail = () => {
  const { resId } = useParams();
  const ref = useRef();
  const [newReview, setNewReview] = useState({
    rating: "",
    comment: "",
    revName: "Rahul",
    pp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tbKdv1HDbAjPc526SK0yDZuoOmaaOyGNoj_e1q3ngruK2bTqzub3&s=0",
  });
  const {
    data: { cuisineData, restaurantsData },
    dispatch,
  } = useData();

  const restaurantSelected = restaurantsData?.find(
    (res) => res?.id === Number(resId)
  );

  const {
    id,
    name,
    address,
    phone,
    menu,
    ratings,
    averageRating,
    description,
  } = restaurantSelected;

  function handleDialogOpen() {
    console.log(ref.current);
    ref.current.showModal();
  }

  function handleAddReview(newReview, id) {
    dispatch({ type: "ADD_REVIEW", payload: { review: newReview, id: id } });
    setNewReview((prev) => ({
      ...prev,
      rating: "",
      comment: "",
    }));
  }

  return (
    <div className={styles.detailPageCont}>
      <div className={styles.container}>
        <NavLink to="/">Back</NavLink>
        <div className={styles.resCont}>
          <div className={styles.resName}>
            <div>
              <h1>{name}</h1>
              <p>
                {menu.map((item) => (
                  <span>{item.name}, </span>
                ))}
              </p>
              <p>{address}</p>
              <p>Average Rating: {averageRating}</p>
            </div>
            <div>
              <button
                onClick={handleDialogOpen}
                className={styles.addReviewBtn}
              >
                Add Review
              </button>
            </div>
          </div>
          <hr />
          <div>
            <h3>Reviews</h3>
            <div>
              {ratings.map((rating) => (
                <div className={styles.reviewCard}>
                  <div className={styles.reviewCardInfo}>
                    <div className={styles.avatarCont}>
                      <img
                        className={styles.avatar}
                        src={rating.pp}
                        alt={rating.revName}
                      />
                      <h4>{rating.revName}</h4>
                    </div>
                    <p>{rating.comment}</p>
                  </div>
                  <div className={styles.starDiv}>{rating.rating}⭐</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <dialog className={styles.modal} ref={ref}>
        <h1>Add your review</h1>
        <form className={styles.form} method="dialog">
          <div className={styles.label}>
            <label>Rating:</label>
            <select
              name=""
              id=""
              onChange={(e) =>
                setNewReview((prev) => ({
                  ...prev,
                  rating: e.target.value,
                }))
              }
              value={newReview.rating}
            >
              <option value="">Select rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label>Comment: </label>
            <textarea
              onChange={(e) =>
                setNewReview((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }
              value={newReview.comment}
              name=""
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div className={styles.modalBtn}>
            <button
              onClick={() => handleAddReview(newReview, id)}
              type="submit"
            >
              Submit
            </button>
            <button>Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default RestaurantDetail;
