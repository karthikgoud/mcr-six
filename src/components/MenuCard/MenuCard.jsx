import styles from "./MenuCard.module.css";

export const MenuCard = ({ item, res }) => {
  return (
    <div className={styles.itemCardCont}>
      <img src={item.imgSrc} alt={item.name} />
      <div className={styles.itemInfo}>
        <h4>{item.name}</h4>
        <small>
          Rs. {item.price} for {item.qty}
        </small>
        <small>{res.name}</small>
      </div>
    </div>
  );
};
