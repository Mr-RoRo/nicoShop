import React, { useState } from 'react';
import "./Propheader.css";

function Propheader(props) {

    const arrowSleep =  <svg width="14" height="14" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.58331 9.33917L7.58331 2.33334L6.41665 2.33334L6.41665 9.33917L4.66665 9.33917L6.99998 11.6667L9.33331 9.33917L7.58331 9.33917Z" fill="#00263A" fill-opacity="0.25"/>
                        </svg>;
    const arrowDown =   <svg width="14" height="14" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.58334 9.33917L7.58334 2.33334L6.41667 2.33334L6.41667 9.33917L4.66667 9.33917L7 11.6667L9.33334 9.33917L7.58334 9.33917Z" fill="#00263A"/>
                        </svg>;
    const arrowUp =     <svg width="14" height="14" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.41663 4.66084V11.6667H7.58329V4.66084H9.33329L6.99996 2.33334L4.66663 4.66084H6.41663Z" fill="#00263A"/>
                        </svg>;

    const [arrowStates, setArrowStates] = useState({
        name: 'arrowSleep',
        catching: 'arrowSleep',
        grade: 'arrowSleep',
        origin: 'arrowSleep',
    });

    const handleArrowClick = (header) => {
        setArrowStates((prevState) => {
          const newArrowStates = { ...prevState };
    
          // Set the clicked header's state to arrowUp if it was arrowSleep,
          // arrowDown if it was arrowUp, and arrowSleep otherwise
          if (newArrowStates[header] === 'arrowSleep' || newArrowStates[header] === 'arrowUp') {
            newArrowStates[header] = 'arrowDown';
          } else if (newArrowStates[header] === 'arrowDown') {
            newArrowStates[header] = 'arrowUp';
          } else {
            newArrowStates[header] = 'arrowSleep';
          }
    
          // Set all other headers to arrowSleep
          Object.keys(newArrowStates).forEach((key) => {
            if (key !== header) {
              newArrowStates[key] = 'arrowSleep';
            }
          });

          // Update App states for parent-child coordination
          props.onChange(newArrowStates);
          
          return newArrowStates;
        });
    };


    return (
        <div className="propheader--container">
            <div className='propheader--emptyplaceholderimage'></div>
            <div alt="Produit" className="propheader--name" onClick={() => handleArrowClick('name')}>
                <span className="propheader--name--text">Produit</span>
                <span className="propheader--name--arrow">{arrowStates.name === 'arrowUp' ? arrowUp : (arrowStates.name === 'arrowDown' ? arrowDown : arrowSleep)}</span>
            </div>
            <div className="propheader--variants">
                <span className="propheader--variants--text">Variantes</span>
            </div>
            <div alt="Mode de pêche" className="propheader--catching" onClick={() => handleArrowClick('catching')}>
                <span className="propheader--catching--text">Mode de pêche</span>
                <span className="propheader--catching--arrow">{arrowStates.catching === 'arrowUp' ? arrowUp : (arrowStates.catching === 'arrowDown' ? arrowDown : arrowSleep)}</span>
            </div>
            <div alt="Grade" className="propheader--grade" onClick={() => handleArrowClick('grade')}>
                <span className="propheader--grade--text">Grade</span>
                <span className="propheader--grade--arrow">{arrowStates.grade === 'arrowUp' ? arrowUp : (arrowStates.grade === 'arrowDown' ? arrowDown : arrowSleep)}</span>
            </div>
            <div alt="Origine" className="propheader--origin" onClick={() => handleArrowClick('origin')}>
                <span className="propheader--origin--text">Origine</span>
                <span className="propheader--origin--arrow">{arrowStates.origin === 'arrowUp' ? arrowUp : (arrowStates.origin === 'arrowDown' ? arrowDown : arrowSleep)}</span>
            </div>
            <div className="propheader--priceunit">
                <span className="propheader--priceunit--text">Prix à l'unité</span>
            </div>
            <div className="propheader--quantity">
                <span className="propheader--quantity--text">Quantité</span>
            </div>
            <div className='propheader--emptyplaceholderbuttons'></div>
        </div>
    );  
}

export default Propheader;