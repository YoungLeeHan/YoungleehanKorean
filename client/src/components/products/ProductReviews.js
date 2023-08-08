const ProductReviews = ({ id }) => {
  // states

  // useEffect -> get reviews from DB

  const onSubmit = (e) => {
    e.preventDefault();
    // post review to DB
  }

  return (
    <div style={{minHeight: "600px"}}>
      reviews of {id}
    </div>
  )
}

export default ProductReviews;
