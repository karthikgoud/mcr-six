import { useState } from "react";
import { useData } from "../../context/DataContext";
import styles from "./Home.module.css";
import { MenuCard } from "../../components/MenuCard/MenuCard";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [cursineId, setCrusineId] = useState(null);
  const {
    data: { cuisineData, restaurantsData },
  } = useData();

  const restaurantByCursine = restaurantsData.filter(
    (res) => res.cuisine_id === cursineId
  );

  return (
    <div className={styles.homeContainer}>
      <h1>Food Ordering App</h1>
      <h3>Select Your Cursine:</h3>
      <div>
        {cuisineData.map((cursine) => (
          <button
            key={cursine.id}
            onClick={() => setCrusineId(cursine.id)}
            className={styles.homeBtn}
          >
            {cursine.name}
          </button>
        ))}
        <hr />
        {restaurantByCursine.map((res) => (
          <>
            <div className={styles.homeResMenu}>
              <h3>Dishes by {res.name}</h3>
              <div className={styles.cardCont}>
                {res.menu.map((item) => (
                  <NavLink to={`/restaurant/${res.id}`}>
                    <MenuCard item={item} res={res} />
                  </NavLink>
                ))}
              </div>
            </div>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
