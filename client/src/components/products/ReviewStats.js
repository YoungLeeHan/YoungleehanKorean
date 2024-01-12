import styles from './ReviewStats.module.scss';

const ratingPercent = (count, total) => `${(count / total) * 100}%`;
const ReviewStats = ({ reviews }) => {
    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = (totalRating / totalReviews).toFixed(1);
    let rates = [0, 0, 0, 0, 0, 0];
    reviews.forEach(({ rating }) => {
        rates[rating] += 1;
    });

    return (
        <div className='d-flex align-items-center mt-5 mb-4'>
            <div
                className={`d-flex flex-column justify-content-center align-items-center ${styles.averageContainer}`}
            >
                <h3>{averageRating}</h3>
                <meter
                    className={styles.averageRating}
                    min='0'
                    max='5'
                    value={averageRating}
                    title={`${averageRating} out of 5 stars`}
                ></meter>
                <span>{`(${totalReviews} Review)`}</span>
            </div>
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex flex-column align-items-center'>
                    <div className='progress' style={{ width: '100px' }}>
                        <div
                            className='progress-bar bg-success'
                            role='progressbar'
                            style={{
                                width: ratingPercent(rates[5], totalReviews),
                            }}
                            aria-valuenow='25'
                            aria-valuemin='0'
                            aria-valuemax='100'
                        ></div>
                    </div>
                    <div className='progress' style={{ width: '100px' }}>
                        <div
                            className='progress-bar bg-success'
                            role='progressbar'
                            style={{
                                width: ratingPercent(rates[4], totalReviews),
                            }}
                            aria-valuenow='25'
                            aria-valuemin='0'
                            aria-valuemax='100'
                        ></div>
                    </div>
                    <div className='progress' style={{ width: '100px' }}>
                        <div
                            className='progress-bar bg-success'
                            role='progressbar'
                            style={{
                                width: ratingPercent(rates[3], totalReviews),
                            }}
                            aria-valuenow='25'
                            aria-valuemin='0'
                            aria-valuemax='100'
                        ></div>
                    </div>
                    <div className='progress' style={{ width: '100px' }}>
                        <div
                            className='progress-bar bg-success'
                            role='progressbar'
                            style={{
                                width: ratingPercent(rates[2], totalReviews),
                            }}
                            aria-valuenow='25'
                            aria-valuemin='0'
                            aria-valuemax='100'
                        ></div>
                    </div>
                    <div className='progress' style={{ width: '100px' }}>
                        <div
                            className='progress-bar bg-success'
                            role='progressbar'
                            style={{
                                width: ratingPercent(rates[1], totalReviews),
                            }}
                            aria-valuenow='25'
                            aria-valuemin='0'
                            aria-valuemax='100'
                        ></div>
                    </div>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <h6>5 Stars</h6>
                    <h6>4 Stars</h6>
                    <h6>3 Stars</h6>
                    <h6>2 Stars</h6>
                    <h6>1 Stars</h6>
                </div>
            </div>
        </div>
    );
};

export default ReviewStats;
