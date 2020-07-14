import React from 'react';
import SlideShow from 'react-image-show';

export default function Reviewimgs(props) {
  const imgs=props.path;
  return (
      <SlideShow
        images={imgs}
        width="400px"
        imagesWidth="400px"
        imagesHeight="250px"
        imagesHeightMobile="56vw"
        thumbnailsWidth="420px"
        thumbnailsHeight="10vw"
        thumbnails fixedImagesHeight arrows={false}
      />
  );
}