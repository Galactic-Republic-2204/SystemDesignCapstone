import React, { useState, useEffect } from 'react';

function Photos ({photos, enlargeCurImage, icon}) {
  const [curImage, setCurImg] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  function changeCurImage(i, key) {
    if (key === 'prev' && i > 0) {
      setCurImg(i-1);
    }
    if (key === 'next' && i < n){
      setCurImg(i+1);
    }
  }

  const n = photos.length -1;

  function changeFullscreen() {
    setFullscreen(!fullscreen);
    console.log('fullscreen', fullscreen);
  }

  if (fullscreen) {
    imageFullscreen = {
      width: 1000,
      height: 670,
      objectFit: 'cover',
      textAlign: 'center',
      padding: '10px',
      cursor: 'zoom-out',
      backgroundImage: `url(${photos[curImage]['url']})`
    };
    document.getElementById('overview').style.display = 'none';
  } else {
    imageFullscreen = {
      width: 480,
      height: 670,
      objectFit: 'cover',
      textAlign: 'center',
      padding: '10px',
      cursor: 'zoom-in',
      backgroundImage: `url(${photos[curImage]['url']})`
    };
    document.getElementById('overview').style.display = 'block';
  }

  return (
    <div className = 'Photos'>
      <div className = 'imagegallery'>
      <i class="material-symbols-outlined" onClick={()=>changeCurImage(curImage, 'prev')}>arrow_upward</i>
        {photos.map((photo, index, array) => {
            if(index === curImage) {
              return (<div><img id = 'curImage' key = {photo['thumbnail_url']} src = {photo['thumbnail_url']} width = '100px' ></img></div>);
            } else {
              return (<div><img id = 'othImage' key = {photo['thumbnail_url']} src = {photo['thumbnail_url']} width = '100px' onClick = {() => setCurImg(index)}></img></div>)
            }
          })}
      <i class="material-symbols-outlined" onClick={()=>changeCurImage(curImage, 'next')}>arrow_downward</i>
      </div>

      <div className = 'curImage' >
      {curImage === 0 ? <div className ="prev" onClick={()=>changeCurImage(curImage, 'prev')} ></div>: <div className ="prev" onClick={()=>changeCurImage(curImage, 'prev')} ><div className = 'item' >&#10094;</div></div> }

       <div onClick = {changeFullscreen} className = 'centerImg' id = 'centerImg'  style = {imageFullscreen}> </div>

      {curImage === n ?  <div className ="next" onClick={()=>changeCurImage(curImage, 'next')}> </div>:  <div className ="next" onClick={()=>changeCurImage(curImage, 'next')}><div className = 'item' >&#10095;</div></div>}

        {/* <div className ="enlarge" onClick={()=>enlargeCurImage(curImage)}>
           {icon} </div> */}


      </div>

    </div>
  );
}

export default Photos;

var imageFullscreen = { // initial #image css but then changes depending if clickedFullScreen ever got invoked
    width: 480,
    height: 670,
    objectFit: 'cover',
    textAlign: 'center',
    padding: '10px',
    cursor: 'zoom-in',
  };
