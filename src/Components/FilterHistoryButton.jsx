import React from 'react';
import './FilterHistoryButton.css';

function FilterHistoryButton (props) {

    const handleHistoryToggle = () => {
        props.onToggle();
    }

    return (
        <button alt="Historique" className={`filterButtonHistory ${props.parentState ? 'active' : ''}`} onClick={handleHistoryToggle}>
            <span className="filterButtonHistory--icon">
                <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9167 0.75C7.36085 0.75 3.66669 4.44417 3.66669 9H0.916687L4.48252 12.5658L4.54669 12.6942L8.25002 9H5.50002C5.50002 5.4525 8.36919 2.58333 11.9167 2.58333C15.4642 2.58333 18.3334 5.4525 18.3334 9C18.3334 12.5475 15.4642 15.4167 11.9167 15.4167C10.1475 15.4167 8.54335 14.6925 7.38835 13.5283L6.08669 14.83C7.58085 16.3242 9.63419 17.25 11.9167 17.25C16.4725 17.25 20.1667 13.5558 20.1667 9C20.1667 4.44417 16.4725 0.75 11.9167 0.75ZM11 5.33333V9.91667L14.9234 12.245L15.5834 11.1358L12.375 9.22917V5.33333H11Z" fill={props.parentState ? '#fff' : '#00263A'}/>
                </svg>
            </span>
            <span className={`filterButtonHistory--text ${props.parentState ? 'active' : ''}`}>Historique</span>
        </button>
    );
};

export default FilterHistoryButton;
