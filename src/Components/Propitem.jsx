import React, { useState } from "react";
import "./Propitem.css";
// see recommended best practice for not having 1000x import lines
import imagePlaceholder from "../assets/imagePlaceholder.png";

function Propitem(props) {
  /* default testing
    const name = "Product name";
    const catching = "Caught";
    const grade = "S+";
    const origin = "NO";
    const price = 30;
    const priceUnit = "kg";
    */

  // console.log(`Loaded path: ${import.meta.env.BASE_URL}`);

  // id (string)
  const id = props.item.id;
  // image path (string)
  const image = props.item.image
    ? `/assets/${props.item.image}`
    : imagePlaceholder;
  // name (string)
  const name = props.item.name;
  // variants (array of strings)
  const variants = props.item.variants;
  // grade (string A to S+)
  const grade = props.item.grade;
  // catching (string)
  const catching = props.item.catching;
  // origin (alpha-2 country code string)
  const origin = props.item.origin;
  const originSrc = `https://www.flagsapi.com/${origin}/flat/64.png`;
  // price (number)
  const price = props.item.price;
  // price unit (string)
  const priceUnit = props.item.priceUnit;

  // variants list construction
  const variantsList = variants.map((item) => {
    return (
      <div className="propitem--variants--container">
        <span className="propitem--variants--text">{item}</span>
      </div>
    );
  });

  // State declaration
  const [isImageOpen, setImageOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [openVariantsCatching, setOpenVariantsCatching] = useState(false);

  // handler declaration
  const handleFavoriteClick = () => {
    // Toggle the state when the favorite button is clicked
    setIsFavorite((prevState) => !prevState);
    props.onFavoriteToggle(id);
  };

  const handleHistory = () => {
    // Toggle the state when the favorite button is clicked
    setIsHistory((prevState) => !prevState);
    props.onHistoryToggle(id);
  };

  const openImageModal = () => {
    // Toggle the image modal state when the thumbnail image is clicked
    setImageOpen(true);
    document.body.style.overflow = "hidden"; // Prevents scrolling
  };

  const closeImageModal = () => {
    // Toggle the image modal state when the thumbnail image is clicked
    setImageOpen(false);
    document.body.style.overflow = "auto"; // Reenables default scrolling behaviour
  };

  const handleOpenVariantsCatchingBox = () => {
    // top open variants and catching box
    setOpenVariantsCatching(!openVariantsCatching);
  };

  return (
    <div className="propitem--container">
      {props.onMobile ? (
        <>
          <div className="propitem--container--left">
            <div className="propitem--name">
              <span className="propitem--name--text">{name}</span>
              <div className="wrapper--openBtn--variants--catching--box">
                <span
                  className="propitem--btn--open--variants--catching"
                  onClick={handleOpenVariantsCatchingBox}
                >
                  ?
                </span>
                {openVariantsCatching && (
                  <div className="variants--catching--box">
                    <div className="propitem--variants">{variantsList}</div>
                    <div className="propitem--catching">
                      <span className="propitem--catching--text">
                        {catching}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="propitem--wrapper--grade--origin">
              <div className="propitem--grade">
                <div
                  className={`propitem--grade--container ${
                    grade === "S+"
                      ? "S_plus"
                      : grade === "A+"
                      ? "A_plus"
                      : grade
                  }`}
                >
                  <span className="propitem--grade--text">{grade}</span>
                </div>
              </div>
              <div className="propitem--origincontainer">
                <img
                  className="propitem--originflag"
                  src={`https:www.flagsapi.com/${origin}/flat/64.png`}
                ></img>
              </div>
            </div>
            <div className="propitem--priceunit">
              <span className="propitem--priceunit--textprice">{price}</span>
              <span className="propitem--priceunit--currency">
                {Number.isInteger(price) && ".-" + " "}/
              </span>
              <span className="propitem--priceunit--textunit">{priceUnit}</span>
            </div>
          </div>
          <div className="propitem--container--right">
            <img
              alt={image}
              className="propitem--image"
              src={image}
              onClick={openImageModal}
            ></img>
            {isImageOpen && (
              <div className="propitem--image--modal" onClick={closeImageModal}>
                <img src={image} className="propitem--image--fullsize" />
              </div>
            )}
            <div className="propitem--buttons">
              <div className="propitem--quantity">
                <input
                  alt={`${name}: Quantité`}
                  className="propitem--quantity--input"
                  type="number"
                  min={0}
                  placeholder="0"
                />
              </div>
              {isHistory && (
                <button
                  className={`propitem--buttons--history ${
                    isHistory ? "active" : ""
                  }`}
                >
                  <svg
                    width="21"
                    height="18"
                    viewBox="0 0 21 18"
                    fill="none"
                    xmlns="http:www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9167 0.75C7.36085 0.75 3.66669 4.44417 3.66669 9H0.916687L4.48252 12.5658L4.54669 12.6942L8.25002 9H5.50002C5.50002 5.4525 8.36919 2.58333 11.9167 2.58333C15.4642 2.58333 18.3334 5.4525 18.3334 9C18.3334 12.5475 15.4642 15.4167 11.9167 15.4167C10.1475 15.4167 8.54335 14.6925 7.38835 13.5283L6.08669 14.83C7.58085 16.3242 9.63419 17.25 11.9167 17.25C16.4725 17.25 20.1667 13.5558 20.1667 9C20.1667 4.44417 16.4725 0.75 11.9167 0.75ZM11 5.33333V9.91667L14.9234 12.245L15.5834 11.1358L12.375 9.22917V5.33333H11Z"
                      fill="#00263A"
                    />
                  </svg>
                </button>
              )}
              <button
                alt={`${name}: Ajouter aux Favoris`}
                className={`propitem--buttons--favorite ${
                  isFavorite ? "active" : ""
                }`}
                onClick={handleFavoriteClick}
              >
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http:www.w3.org/2000/svg"
                >
                  <path
                    d="M8.99999 15.7917L7.79166 14.6917C3.49999 10.8 0.666656 8.23333 0.666656 5.08333C0.666656 2.51667 2.68332 0.5 5.24999 0.5C6.69999 0.5 8.09166 1.175 8.99999 2.24167C9.90832 1.175 11.3 0.5 12.75 0.5C15.3167 0.5 17.3333 2.51667 17.3333 5.08333C17.3333 8.23333 14.5 10.8 10.2083 14.7L8.99999 15.7917Z"
                    fill={isFavorite ? "#fff" : "#00263A"}
                  />
                </svg>
              </button>
              <button
                alt={`${name}: Ajouter au Panier`}
                className="propitem--buttons--addtocart"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http:www.w3.org/2000/svg"
                >
                  <path
                    d="M8.43254 6.47619H10.119V4.04762H12.6488V2.42857H10.119V0H8.43254V2.42857H5.90278V4.04762H8.43254V6.47619ZM5.05952 13.7619C4.13194 13.7619 3.38145 14.4905 3.38145 15.381C3.38145 16.2714 4.13194 17 5.05952 17C5.9871 17 6.74603 16.2714 6.74603 15.381C6.74603 14.4905 5.9871 13.7619 5.05952 13.7619ZM13.4921 13.7619C12.5645 13.7619 11.814 14.4905 11.814 15.381C11.814 16.2714 12.5645 17 13.4921 17C14.4196 17 15.1786 16.2714 15.1786 15.381C15.1786 14.4905 14.4196 13.7619 13.4921 13.7619ZM5.20288 11.131L5.22817 11.0338L5.9871 9.71429H12.2693C12.9018 9.71429 13.4583 9.38238 13.745 8.88048L17 3.20571L15.5327 2.42857H15.5243L14.5967 4.04762L12.2693 8.09524H6.3497L6.24008 7.87667L4.35119 4.04762L3.5501 2.42857L2.75744 0.809524H0V2.42857H1.68651L4.72222 8.57286L3.58383 10.5562C3.44891 10.7829 3.37302 11.05 3.37302 11.3333C3.37302 12.2238 4.13194 12.9524 5.05952 12.9524H15.1786V11.3333H5.41369C5.30407 11.3333 5.20288 11.2443 5.20288 11.131Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <img
            alt={image}
            className="propitem--image"
            src={image}
            onClick={openImageModal}
          ></img>
          {isImageOpen && (
            <div className="propitem--image--modal" onClick={closeImageModal}>
              <img src={image} className="propitem--image--fullsize" />
            </div>
          )}
          <div className="propitem--name">
            <span className="propitem--name--text">{name}</span>
          </div>
          <div className="propitem--variants">{variantsList}</div>
          <div className="propitem--catching">
            <span className="propitem--catching--text">{catching}</span>
          </div>
          <div className="propitem--grade">
            <div
              className={`propitem--grade--container ${
                grade === "S+" ? "S_plus" : grade === "A+" ? "A_plus" : grade
              }`}
            >
              <span className="propitem--grade--text">{grade}</span>
            </div>
          </div>
          <div className="propitem--origincontainer">
            <img className="propitem--originflag" src={originSrc}></img>
          </div>
          <div className="propitem--priceunit">
            <span className="propitem--priceunit--textprice">{price}</span>
            <span className="propitem--priceunit--currency">
              {Number.isInteger(price) && ".-" + " "}/
            </span>
            <span className="propitem--priceunit--textunit">{priceUnit}</span>
          </div>
          <div className="propitem--quantity">
            <input
              alt={`${name}: Quantité`}
              className="propitem--quantity--input"
              type="number"
              min={0}
              placeholder="0"
            />
          </div>
          <div className="propitem--buttons">
            <button
              className={`propitem--buttons--history ${
                isHistory ? "active" : ""
              }`}
            >
              <svg
                width="21"
                height="18"
                viewBox="0 0 21 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9167 0.75C7.36085 0.75 3.66669 4.44417 3.66669 9H0.916687L4.48252 12.5658L4.54669 12.6942L8.25002 9H5.50002C5.50002 5.4525 8.36919 2.58333 11.9167 2.58333C15.4642 2.58333 18.3334 5.4525 18.3334 9C18.3334 12.5475 15.4642 15.4167 11.9167 15.4167C10.1475 15.4167 8.54335 14.6925 7.38835 13.5283L6.08669 14.83C7.58085 16.3242 9.63419 17.25 11.9167 17.25C16.4725 17.25 20.1667 13.5558 20.1667 9C20.1667 4.44417 16.4725 0.75 11.9167 0.75ZM11 5.33333V9.91667L14.9234 12.245L15.5834 11.1358L12.375 9.22917V5.33333H11Z"
                  fill="#00263A"
                />
              </svg>
            </button>
            <button
              alt={`${name}: Ajouter aux Favoris`}
              className={`propitem--buttons--favorite ${
                isFavorite ? "active" : ""
              }`}
              onClick={handleFavoriteClick}
            >
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.99999 15.7917L7.79166 14.6917C3.49999 10.8 0.666656 8.23333 0.666656 5.08333C0.666656 2.51667 2.68332 0.5 5.24999 0.5C6.69999 0.5 8.09166 1.175 8.99999 2.24167C9.90832 1.175 11.3 0.5 12.75 0.5C15.3167 0.5 17.3333 2.51667 17.3333 5.08333C17.3333 8.23333 14.5 10.8 10.2083 14.7L8.99999 15.7917Z"
                  fill={isFavorite ? "#fff" : "#00263A"}
                />
              </svg>
            </button>
            <button
              alt={`${name}: Ajouter au Panier`}
              className="propitem--buttons--addtocart"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.43254 6.47619H10.119V4.04762H12.6488V2.42857H10.119V0H8.43254V2.42857H5.90278V4.04762H8.43254V6.47619ZM5.05952 13.7619C4.13194 13.7619 3.38145 14.4905 3.38145 15.381C3.38145 16.2714 4.13194 17 5.05952 17C5.9871 17 6.74603 16.2714 6.74603 15.381C6.74603 14.4905 5.9871 13.7619 5.05952 13.7619ZM13.4921 13.7619C12.5645 13.7619 11.814 14.4905 11.814 15.381C11.814 16.2714 12.5645 17 13.4921 17C14.4196 17 15.1786 16.2714 15.1786 15.381C15.1786 14.4905 14.4196 13.7619 13.4921 13.7619ZM5.20288 11.131L5.22817 11.0338L5.9871 9.71429H12.2693C12.9018 9.71429 13.4583 9.38238 13.745 8.88048L17 3.20571L15.5327 2.42857H15.5243L14.5967 4.04762L12.2693 8.09524H6.3497L6.24008 7.87667L4.35119 4.04762L3.5501 2.42857L2.75744 0.809524H0V2.42857H1.68651L4.72222 8.57286L3.58383 10.5562C3.44891 10.7829 3.37302 11.05 3.37302 11.3333C3.37302 12.2238 4.13194 12.9524 5.05952 12.9524H15.1786V11.3333H5.41369C5.30407 11.3333 5.20288 11.2443 5.20288 11.131Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
    // <div className="propitem--container">
    //     <img alt={image} className="propitem--image" src={image} onClick={openImageModal}></img>
    //     {isImageOpen && (
    //         <div className="propitem--image--modal" onClick={closeImageModal}>
    //             <img src={image} className="propitem--image--fullsize"/>
    //         </div>
    //     )}
    //     <div className="propitem--name">
    //         <span className="propitem--name--text">{name}</span>
    //     </div>
    //     <div className="propitem--variants">
    //         {variantsList}
    //     </div>
    //     <div className="propitem--catching">
    //         <span className="propitem--catching--text">{catching}</span>
    //     </div>
    //     <div className="propitem--grade">
    //         <div className={`propitem--grade--container ${grade === "S+" ? "S_plus" : grade === "A+" ? "A_plus" : grade}`}>
    //             <span className="propitem--grade--text">{grade}</span>
    //         </div>
    //     </div>
    //     <div className='propitem--origincontainer'>
    //         <img className="propitem--originflag" src={`https://www.flagsapi.com/${origin}/flat/64.png`}></img>
    //     </div>
    //     <div className="propitem--priceunit">
    //         <span className="propitem--priceunit--textprice">{price}</span>
    //         <span className="propitem--priceunit--currency">{Number.isInteger(price) && ".-" + " "}/</span>
    //         <span className="propitem--priceunit--textunit">{priceUnit}</span>
    //     </div>
    //     <div className="propitem--quantity">
    //         <input alt={`${name}: Quantité`} className="propitem--quantity--input" type="number" min={0} placeholder="0"/>
    //     </div>
    //     <div className="propitem--buttons">
    //         <button className={`propitem--buttons--history ${isHistory ? 'active' : ''}`}>
    //             <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    //               <path d="M11.9167 0.75C7.36085 0.75 3.66669 4.44417 3.66669 9H0.916687L4.48252 12.5658L4.54669 12.6942L8.25002 9H5.50002C5.50002 5.4525 8.36919 2.58333 11.9167 2.58333C15.4642 2.58333 18.3334 5.4525 18.3334 9C18.3334 12.5475 15.4642 15.4167 11.9167 15.4167C10.1475 15.4167 8.54335 14.6925 7.38835 13.5283L6.08669 14.83C7.58085 16.3242 9.63419 17.25 11.9167 17.25C16.4725 17.25 20.1667 13.5558 20.1667 9C20.1667 4.44417 16.4725 0.75 11.9167 0.75ZM11 5.33333V9.91667L14.9234 12.245L15.5834 11.1358L12.375 9.22917V5.33333H11Z" fill="#00263A"/>
    //             </svg>
    //         </button>
    //         <button alt={`${name}: Ajouter aux Favoris`} className={`propitem--buttons--favorite ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
    //             <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                 <path d="M8.99999 15.7917L7.79166 14.6917C3.49999 10.8 0.666656 8.23333 0.666656 5.08333C0.666656 2.51667 2.68332 0.5 5.24999 0.5C6.69999 0.5 8.09166 1.175 8.99999 2.24167C9.90832 1.175 11.3 0.5 12.75 0.5C15.3167 0.5 17.3333 2.51667 17.3333 5.08333C17.3333 8.23333 14.5 10.8 10.2083 14.7L8.99999 15.7917Z" fill={isFavorite ? '#fff' : '#00263A'}/>
    //             </svg>
    //         </button>
    //         <button alt={`${name}: Ajouter au Panier`} className="propitem--buttons--addtocart">
    //             <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                 <path d="M8.43254 6.47619H10.119V4.04762H12.6488V2.42857H10.119V0H8.43254V2.42857H5.90278V4.04762H8.43254V6.47619ZM5.05952 13.7619C4.13194 13.7619 3.38145 14.4905 3.38145 15.381C3.38145 16.2714 4.13194 17 5.05952 17C5.9871 17 6.74603 16.2714 6.74603 15.381C6.74603 14.4905 5.9871 13.7619 5.05952 13.7619ZM13.4921 13.7619C12.5645 13.7619 11.814 14.4905 11.814 15.381C11.814 16.2714 12.5645 17 13.4921 17C14.4196 17 15.1786 16.2714 15.1786 15.381C15.1786 14.4905 14.4196 13.7619 13.4921 13.7619ZM5.20288 11.131L5.22817 11.0338L5.9871 9.71429H12.2693C12.9018 9.71429 13.4583 9.38238 13.745 8.88048L17 3.20571L15.5327 2.42857H15.5243L14.5967 4.04762L12.2693 8.09524H6.3497L6.24008 7.87667L4.35119 4.04762L3.5501 2.42857L2.75744 0.809524H0V2.42857H1.68651L4.72222 8.57286L3.58383 10.5562C3.44891 10.7829 3.37302 11.05 3.37302 11.3333C3.37302 12.2238 4.13194 12.9524 5.05952 12.9524H15.1786V11.3333H5.41369C5.30407 11.3333 5.20288 11.2443 5.20288 11.131Z" fill="white"/>
    //             </svg>
    //         </button>
    //     </div>
    // </div>
  );
}

export default Propitem;
