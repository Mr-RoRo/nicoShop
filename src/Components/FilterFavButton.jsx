import React from 'react';
import './FilterFavButton.css';

function FilterFavButton (props) {

    const handleFavoriteToggle = () => {
        props.onToggle();
    }

    return (
        <button alt="Favoris" className={`filterButtonFav ${props.parentState ? 'active' : ''}`} onClick={handleFavoriteToggle}>
            <span className='filterButtonFav--icon'>
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.99999 15.7917L7.79166 14.6917C3.49999 10.8 0.666656 8.23333 0.666656 5.08333C0.666656 2.51667 2.68332 0.5 5.24999 0.5C6.69999 0.5 8.09166 1.175 8.99999 2.24167C9.90832 1.175 11.3 0.5 12.75 0.5C15.3167 0.5 17.3333 2.51667 17.3333 5.08333C17.3333 8.23333 14.5 10.8 10.2083 14.7L8.99999 15.7917Z" fill={props.parentState ? '#fff' : '#00263A'}/>
                </svg>
            </span>
            <span className={`filterButtonFav--text ${props.parentState ? 'active' : ''}`}>Favoris</span>
        </button>
    );
};

export default FilterFavButton;
