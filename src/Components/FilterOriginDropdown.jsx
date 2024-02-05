import React, { useState, useRef, useEffect } from 'react';
import './FilterOriginDropdown.css';

function FilterOriginDropdown (props) {
    
    // test input
    // const options = ["FR", "GB", "EC", "MG"];

    // Use Set properties to filter duplicate values, spread operator converts back into array
    const options = [...new Set(props.list.map(item => item.origin).filter(Boolean))].sort((a,b) => a.localeCompare(b));

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownButtonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check for rendered dropdown menu and focus switch outside of dropdown
            if(dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target)) {
                // Close dropdown if clicked outside
                setDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleFilterToggle = (filter) => {
        let updatedFilters;

        if (props.parentState.includes(filter)) {
            updatedFilters = props.parentState.filter((selectedFilter) => selectedFilter !== filter)
        } else {
            updatedFilters = [...props.parentState, filter];
        }
        // update parent state to match child state
        props.onChange(updatedFilters);
    }

    // "highlight" button in case filters are active

    return (
        <div className="FilterOriginDropdown--container" ref={dropdownButtonRef}>
            <button alt="Origine" className={`FilterOriginDropdown--button ${props.parentState.length > 0 ? 'active' : ''}`} onClick={toggleDropdown}>
                <span className={`FilterOriginDropdown--headerText ${props.parentState.length > 0 ? 'active' : ''}`}>
                    Origine
                </span>
                <span className="FilterOriginDropdown--arrow">
                    {dropdownOpen ?
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2075 7.66667L6 3.46833L1.7925 7.66667L0.5 6.37417L6 0.874166L11.5 6.37417L10.2075 7.66667Z" fill={`${props.parentState.length > 0 ? '#FFFFFF' : '#00263A'}`}/>
                    </svg> :
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.7925 0.874166L6 5.0725L10.2075 0.874166L11.5 2.16667L6 7.66667L0.5 2.16667L1.7925 0.874166Z" fill={`${props.parentState.length > 0 ? '#FFFFFF' : '#00263A'}`}/>
                    </svg>
                    }
                </span>
            </button>
            {dropdownOpen && (
                <div className="FilterOriginDropdown--content">
                    <ul className="FilterOriginDropdown--content--ul">
                        {options.map((filter) => (
                            <li className="FilterOriginDropdown--content--li" key={filter}>
                                <input
                                    className="FilterOriginDropdown--content--checkboxinput"
                                    alt={filter}
                                    type="checkbox"
                                    id={filter}
                                    checked={props.parentState.includes(filter)}
                                    onChange={()=>handleFilterToggle(filter)}
                                />
                                <label htmlFor={filter} className='FilterOriginDropdown--content--origincontainer'>
                                    <img className="FilterOriginDropdown--content--originflag" src={`https://www.flagsapi.com/${filter}/flat/64.png`}></img>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FilterOriginDropdown;