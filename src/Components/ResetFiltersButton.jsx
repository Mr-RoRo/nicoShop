import React from 'react';
import './ResetFiltersButton.css';

function ResetFiltersButton (props) {

    const handleResetClick = () => {
        props.onReset();
    }

    return (
        <button alt="Réinitialiser les filtres" className="resetFiltersButton" onClick={handleResetClick}>
            <span className='resetFiltersButton--icon'>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.16669 0.833334L5.25002 1.75H0.666687V3.58333H1.58335V17.3333C1.58335 17.812 1.75874 18.3001 2.10435 18.6457C2.44996 18.9913 2.93798 19.1667 3.41669 19.1667H12.5834C13.0621 19.1667 13.5501 18.9913 13.8957 18.6457C14.2413 18.3001 14.4167 17.812 14.4167 17.3333V3.58333H15.3334V1.75H10.75L9.83335 0.833334H6.16669ZM3.41669 3.58333H12.5834V17.3333H3.41669V3.58333ZM5.25002 5.41667V15.5H7.08335V5.41667H5.25002ZM8.91669 5.41667V15.5H10.75V5.41667H8.91669Z" fill="#00263A"/>
                </svg>
            </span>
        </button>
    );
};

export default ResetFiltersButton;
