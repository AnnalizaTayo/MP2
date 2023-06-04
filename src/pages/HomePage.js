import React, { useEffect, useState } from 'react';
import NewsletterModal from './newsmodal';


const HomePage = () => {
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        const delay = setTimeout(() => {
          setShowPopup(true);
        }, 4000);
        return () => clearTimeout(delay);
    }, []);


    return (
        <div>{showPopup &&(
            <NewsletterModal/>
        )}
            Still Working on This Page
            {/* Still waiting for the home page*/}
        </div>
    );
};
  
export default HomePage;