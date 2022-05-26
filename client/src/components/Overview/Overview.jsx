import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Photos from './Photos.jsx';
import Skus from './Skus.jsx';
import Nav from './Nav.jsx';
import Style from './Style.jsx';
import StarRating from 'react-star-ratings';
//Get all the styles data for a product given product id
//Pass down style specific data
function Overview ({product, searchProduct}) {
  const [style, setStyle] = useState([]);
  const [curStyle, setCurStyle] = useState(null);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(product['default_price']);
  const [largeImg, setlargeImg] = useState(0);
  const icons = [<span className="material-symbols-outlined">fit_screen</span>, <span className="material-symbols-outlined">fullscreen_exit</span>]
  const [icon, setIcon] = useState(<span className="material-symbols-outlined">fit_screen</span>);


  const onLoad = ()=> {
    axios.get(`/styles/?id=${product['id']}`)
    .then((response)=> {
      let results = response.data['results'];
      setStyle(results);
      for (var i = 0; i < results.length; i ++ ) {
        if (results[i]['default?'] === true) {
          console.log('true', i);
          setCurStyle(i);
          break;
        }
      }
    })
    .catch((err) => console.log(`can't load for product with id ${product['id']}`));

    axios.get(`/reviews/${product['id']}`)
    .then((response)=> { return response.data['results'].reduce((prev, cur) => prev = prev + cur['rating'], 0)/response.data['results'].length})
    .then((averating) => setRating(averating))
    .catch((err) => console.log(`can't load for product with id ${product['id']}`));
  };

  useEffect(onLoad, []);

  function changeStyle(n) {
    setCurStyle(n);
    setPrice(style[n]['original_price']);
  }

  function enlarge() {
    setIcon(icons[1-largeImg]);
    setlargeImg(1-largeImg);
  }




    return (
      <>
      <Nav searchProduct = {searchProduct}/>
       {style.length ? (
      <div>
        <div className = 'main-overview'>
          {curStyle !== null ? (<Photos photos = {style[curStyle]['photos']} enlargeCurImage = {enlarge} icon ={icon}/>) : (<a>Loading Styles</a>) }
          <div className = 'overview'>
            <div className = 'rating'>
              <StarRating rating = {rating} starRatedColor="black" starEmptyColor ='grey' starSelectingHoverColor = 'black' numberOfStars={5} name='rating' starDimension="15px" starSpacing="0px"/>
              <a className = 'reviewnum'>{rating}</a>
              <a className = 'reviewlink'>Read all reviews</a>
            </div>
            <div className = 'category'> {product['category']}</div>
            <div className = 'name'> {product['name']}</div>
            <div className = 'price'>${price}</div>
            <Style style = {style} curStyle = {curStyle} changeStyle = {changeStyle} />
            { curStyle !== null ? (<Skus changeStyle = {changeStyle} skus= {style[curStyle]['skus']}/>) : (<a>Loading Skus</a>)}
          </div>
        </div>
        <div className = 'slogan'>{product['slogan']}</div>
        <div className = 'description'>{product['description']}</div>
      </div> ) : (<div>Welcome to Wolverine ... </div>) }
      </>)

}

export default Overview;
