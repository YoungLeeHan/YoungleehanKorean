import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewItem from './ReviewItem';
import ReviewStats from './ReviewStats';
import ReviewForm from './ReviewForm';

const getReviews = (id) => axios.get('/review/' + id);

const ProductReviews = ({ id }) => {
    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getReviews(id).then(({ data }) => {
            setReviews(data);
        });
    }, []);

    const onSubmit = (data) => {
        const formData = new FormData();
        for (const image of data.images) {
            formData.append('images', image);
        }
        formData.append('review', data.comment);
        formData.append('productId', id);
        formData.append('rating', data.rating);

        axios
            .post(`/review`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
            .then(() => {
                // reload 되는게 번거롭다면 (지금은 리뷰 등록되고 업데이트 된 최신 리뷰 리스트를 불러오기 위함)
                // 1. post 요청의 응답으로 새 review list를 서버에서 내려주고 setReviews 하면 됩니다.
                // 2. 혹은 서버에서 내려줄 수 없다면 then 에서 (여기에서) getReviews 를 한번 더 요청하고 setReviews 하면 됩니다.
                navigate(0);
            });
    };

    return (
        <div style={{ minHeight: '600px', maxWidth: '700px' }}>
            <ReviewStats reviews={reviews} />
            <div className='d-flex flex-column'>
                <h5 className='mb-3'>Recent Reviews</h5>
                {reviews.map((review) => (
                    <ReviewItem key={review._id} review={review} />
                ))}
            </div>
            <ReviewForm onSubmit={onSubmit} />
        </div>
    );
};

export default ProductReviews;
