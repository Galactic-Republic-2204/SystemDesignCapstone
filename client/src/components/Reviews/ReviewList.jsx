import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewListEntry from './ReviewListEntry.jsx';
import StarRatings from 'react-star-ratings';
// list will map and pass to list entry to have the individual data
// ratings bar will be own seperate component

export default function ReviewList({id}) {
  const [reviews, setReviews] = useState([]);
  const [formView, setFormView] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    function getReviews() {axios.get(`/reviews/${id}`)
    .then((response) => {
      console.log(response.data.results);
      setReviews(response.data.results)
    })
    .catch(err => console.log(err));
    }
    getReviews();
    }, [])

  const newReview = (review) => {
    axios.post(`/reviews/${id}`, review)
    .then(() => {
      getReviews();
    })
    .catch(err => console.log(err));
  }

  const handleFormView = () => {
    setFormView(!formView);
  }

  //console.log(reviews.helpfulness);

  // will be mapping:
  // review body
  // review title
  // reviews.body, reviews.summary, reviews.review_id
  // get the length of the reviews array\// helpful report buttons

  return(

  formView ? (
  <div className = "reviewList" id ='reviewList'>
  <div>
    <div className = "reviewTitle">{reviews.length} reviews, sorted by <u>relevance ∨</u></div>
    {reviews.map((info)=> (
      <ReviewListEntry
        body = {info.body}
        title = {info.summary}
        rating = {info.rating}
        helpfulness = {info.helpfulness}
        name = {info.reviewer_name}
        id = {info.review_id}
      />
    ))}
  </div>
  <div>
  <form>
    <label className = "addReview" onChange={handleAddTitle}>Add a title:</label>
    <br></br>
    <input type="text"></input>
    <br></br>
    <label className = "addReview">Add a written review:</label>
    <br></br>
    <input type="text"></input>
    <br></br>
    <input type="submit" value="Submit" onSubmit={handleSubmit}></input>
  </form>
  <button className = "reviewButton">MORE REVIEWS</button>
  <button onClick={handleFormView} className = "reviewButton">ADD A REVIEW +</button>
  </div>
  </div>) : (<div className = "reviewList"  id ='reviewList'>
  <div>
    <div className = "reviewTitle">{reviews.length} reviews, sorted by <u>relevance ∨</u></div>
    {reviews.map((info)=> (
      <ReviewListEntry
        body = {info.body}
        title = {info.summary}
        rating = {info.rating}
        helpfulness = {info.helpfulness}
        name = {info.reviewer_name}
        id = {info.review_id}
      />
    ))}
  </div>
  <div>
  <button className = "reviewButton">MORE REVIEWS</button>
  <button onClick={handleFormView} className = "reviewButton">ADD A REVIEW +</button>
  </div>
  </div>)

  )
}
