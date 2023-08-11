import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReviewItem from "./ReviewItem";
import ReviewStats from "./ReviewStats";
import ReviewForm from "./ReviewForm";

// const getReviews = () => axios.get('/reviews');
const MockReviews = [{
  id: 1,
  rating: 4,
  comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip\n' +
    'commodo consequat. Duis aute irure dolor in reprehenderit in cillum.',
  createdAt: '2021-07-25T00:00:00.000Z',
  user: {
    name: 'John Doe',
    profileUrl: 'https://via.placeholder.com/150'
  }
}, {
  id: 2,
  rating: 5,
  comment: 'This is a great product!',
  createdAt: '2021-07-25T00:00:00.000Z',
  user: {
    name: 'Jane Doe',
    profileUrl: 'https://via.placeholder.com/150'
  }
},
  {
    id: 3,
    rating: 4,
    comment: 'This is a great product!',
    createdAt: '2021-07-25T00:00:00.000Z',
    user: {
      name: 'Jane Doe',
      profileUrl: 'https://via.placeholder.com/150'
    }
  }, {
    id: 4,
    rating: 5,
    comment: 'This is a great product!',
    createdAt: '2021-07-25T00:00:00.000Z',
    user: {
      name: 'Jane Doe',
      profileUrl: 'https://via.placeholder.com/150'
    }
  }
]

const getReviews = () => Promise.resolve({ data: MockReviews });

const ProductReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then(({ data }) => {
      setReviews(data);
    });
  }, []);

  const onSubmit = (data) => {
    console.log(data)
    // post review to DB
    // postReview(data).then(({ data }) => {
    //   setReviews(data);
    // });
  }

  return (
    <div style={{minHeight: "600px"}}>
      <ReviewStats reviews={reviews}/>
      <div className="d-flex flex-column">
        <h5 className="mb-3">Recent Reviews</h5>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
      <ReviewForm onSubmit={onSubmit}/>
    </div>
  )
}

export default ProductReviews;
