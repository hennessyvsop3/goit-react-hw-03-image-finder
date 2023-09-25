import React from 'react'
import css from "./ImageGalleryItem.module.css"

export const ImageGalleryItem = ({ shouldPopup, images }) => {
    return images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <li
            key={id}
            className={css.ImageGalleryItem}
            onClick={()=> shouldPopup(largeImageURL)}
          >
            <img
              src={webformatURL}
              alt="pixabay"
              className={css.ImageGalleryItemImage}
            />
          </li>
        );
    });
};
