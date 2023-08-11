import {useState} from "react";

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ rating, name, comment })
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
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="name"
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

        <button className='btn btn-outline-primary mt-3' type='button' onClick={handleSubmit}>Submit Review</button>
      </div>
    </div>
  )
}

export default ReviewForm
