import styles from "./ReviewItem.module.scss";
import {AiFillStar} from "react-icons/ai";

const numberToStringFloat = (number) => {
  return number.toString().includes(".") ? number.toString() : number.toString() + ".0";
}


const ReviewItem = ({ review }) => {
  return (
    <div className="mb-3">
      <div className="d-flex">
        <img src={review.user.profileUrl} alt={review.user.firstName} style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: 'lightgray' }} />
        <div className="d-flex flex-column flex-grow-1 ms-3">
          <div className="d-flex flex-row justify-content-between">
            <div className={styles.userName}>
              {review.user.firstName}
              <br />
              <span >{(new Date(review.createdAt)).toLocaleString()}</span>
            </div>
          <h5 className="mb-2 text-muted">
            <AiFillStar style={{ fill: "#ffbf35" }} />
            {numberToStringFloat(review.rating)}</h5>
          </div>
          <p className={styles.content}>{review.review}</p>
        </div>
      </div>
    </div>
  )
}

export default ReviewItem;
