import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import ProgressBar from "@ramonak/react-progress-bar";
import InputRange from 'react-input-range';


export default function Ratings(props) {

  const [ratePercent, setRatePercent] = useState({1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
  const [changeComfort, setChangeComfort] = useState(0);
  const [starRating, setStarRating] = useState(0);
  const [rateAdded, setRateAdded] = useState(false);

  const [totalFive, setTotalFive] = useState(0);
  const [totalFour, setTotalFour] = useState(0);
  const [totalThree, setTotalThree] = useState(0);
  const [totalTwo, setTotalTwo] = useState(0);
  const [totalOne, setTotalOne] = useState(0);

  useEffect(() => {

    let countOne = 0;
    let countTwo = 0;
    let countThree = 0;
    let countFour = 0;
    let countFive = 0;

    props.reviews.forEach((item) => {
      if (item.rating === 5) {
        countFive++
      } else if (item.rating === 4) {
        countFour++
      } else if (item.rating === 3) {
        countThree++
      } else if (item.rating === 2) {
        countTwo++
      } else if (item.rating === 1) {
        countOne++
      }
    })

    setTotalFive(countFive);
    setTotalFour(countFour);
    setTotalThree(countThree);
    setTotalTwo(countTwo);
    setTotalOne(countOne);

    let divOne = countOne/ props.reviews.length  * (100)
    let divTwo = countTwo / props.reviews.length  * (100)
    let divThree = countThree / props.reviews.length  * (100)
    let divFour = countFour / props.reviews.length  * (100)
    let divFive = countFive / props.reviews.length  * (100)

    setRatePercent({One: divOne, Two: divTwo, Three: divThree, Four: divFour, Five: divFive})

  }, [props.reviews])


  const rateAdder = (e) => {
    let objCopy = {...props.starReview}
    if (objCopy[e.target.value]) {
      delete objCopy[e.target.value]
    } else {
      objCopy[e.target.value] = Number(e.target.value)
    }
    props.setStarReview(objCopy)
    setRateAdded(!rateAdded);
  }

  return (
   <div className="rating">
  <div>
    <div className="ratingTitle">RATINGS & REVIEWS</div>
    <br></br>
    <div className="avgRating">{props.averageRate.toFixed(1)} &nbsp;</div>
    <div className="starRating">
    <StarRatings
      rating={props.averageRate}
      starDimension="18px"
      starSpacing="1px"
      starRatedColor="gold"
    />
    </div>
    <br></br>
  <br></br>

    <br></br>
    <button className="rateNum" id="starRate" type="button" value = {5} onClick={rateAdder}>5 stars</button>
    <div className="progBar">
    <ProgressBar
    completed={ratePercent.Five}
    customLabel={totalFive}
    isLabelVisible = {true}
    bgColor = {`green`}
    width = {`50%`}
    maxCompleted = {50}
    />
    </div>
  <br></br>
  <button className="rateNum" type="button" value = {4} onClick= {rateAdder}>4 stars</button>
  <div className="progBar">
    <ProgressBar
    completed={ratePercent.Four}
    customLabel={totalFour}
    isLabelVisible = {true}
    bgColor = {`green`}
    width = {`50%`}
    maxCompleted = {50}
    />
    </div>
    <br></br>

    <button className="rateNum" type="button" value = {3} onClick= {rateAdder}>3 stars</button>
    <div className="progBar">
    <ProgressBar
    completed={ratePercent.Three}
    customLabel={totalThree}
    isLabelVisible = {true}
    bgColor = {`green`}
    width = {`50%`}
    maxCompleted = {50}
    />
    </div>
    <br></br>

    <button className="rateNum" type="button" value = {2} onClick= {rateAdder}>2 stars</button>
    <div className="progBar">
    <ProgressBar
    completed={ratePercent.Two}
    customLabel={totalTwo}
    isLabelVisible = {true}
    bgColor = {`green`}
    width = {`50%`}
    maxCompleted = {50}
    />
    </div>
    <br></br>

    <button className="rateNum" type="button" value = {1} onClick= {rateAdder}>1 stars</button>
    <div className="progBar">
    <ProgressBar
    completed={ratePercent.One}
    customLabel={totalOne}
    isLabelVisible = {true}
    bgColor = {`green`}
    width = {`50%`}
    maxCompleted = {50}
    />
    </div>
    <br></br>

    <div>Size</div>
    <div>
    <input className="slider"
        max = {5}
        type='range'
        value={Number(props.comfort)}
        disabled
        />
    </div>
    <div className="sizeFit">
      <div id="small">Too small</div>
      <div>Perfect</div>
      <div>Too large</div>
    </div>
    <br></br>

    <div>Comfort</div>
    <div>
    <input className="slider"
        max = {5}
        type='range'
        value={Number(props.size)}
        disabled
        />
    </div>
    <div className="comfortFit">
      <div>Poor</div>
      <div>Perfect</div>
      </div>
    <br></br>

  </div>
  </div>
 )
}
