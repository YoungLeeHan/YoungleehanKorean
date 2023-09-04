import styles from "./ReviewItem.module.scss";
import { AiFillStar } from "react-icons/ai";
import { colorYellow } from "../../constants/constant";

const numberToStringFloat = (number) => {
  return number.toString().includes(".")
    ? number.toString()
    : number.toString() + ".0";
};

const ReviewItem = ({ review }) => {
  return (
    <div className="mb-3">
      <div className="d-flex">
        <div className="d-flex flex-column flex-grow-1 ms-3">
          <div className="d-flex flex-row justify-content-between">
            <div className={styles.userName}>
              {review.user.firstName}
              <br />
              <span>{new Date(review.createdAt).toLocaleString()}</span>
              <br />
              <div>
                {review.imagePath.map((url) => (
                  <img src={url} key={url} alt={"review image"} />
                ))}
              </div>
            </div>
            <h5 className="mb-2 text-muted">
              <AiFillStar style={{ fill: "#ffbf35" }} />
              {numberToStringFloat(review.rating)}
            </h5>
          </div>
          <p className={styles.content}>{review.review}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
