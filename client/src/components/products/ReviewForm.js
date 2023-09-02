import {useState} from "react";

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [images, setImages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ rating, comment, images })
  }
  return (
    <div className="card">
      <h5 className="card-header card-title">Write a Review</h5>
      <div className='card-body'>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            className="form-control"
            id="comment"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImages(Array.from(e.target.files))}
            multiple
            id="image"
          />
        </div>

        <button className='btn btn-outline-primary mt-3' type='button' onClick={handleSubmit}>Submit Review</button>
      </div>
    </div>
  )
}

export default ReviewForm
