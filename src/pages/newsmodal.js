import React, { useEffect } from 'react';
import './newsmodal.css';

const NewsModal = () => {
    useEffect(() => {
        window.location.href = '/#popup1';
      }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle form submission here
    // You can send the newsletter subscription data to your backend or perform any other necessary action
  };

  return (
    <div>
      <div id="popup1" className="overlay">
        <div className="popup">
          <a className="close" href="/#">&times;</a>
          <div id="dialog" className="window">
            <div className="box">
              <div className="newletter-title">
                <h2>Sign up &amp; get 10% off</h2>
              </div>
              <div className="box-content newleter-content">
                <label>Subscribe to our newsletters now and stay up-to-date with new release products and exclusive offers.</label>
                <div id="frm_subscribe">
                  <form name="subscribe" id="subscribe_popup" onSubmit={handleSubscribe}>
                    <div>
                      <input type="text" defaultValue="" name="subscribe_pemail" id="subscribe_pemail" onChange={(e) => { /* To update necessary actions */ }}/>
                      <input type="hidden" value="" name="subscribe_pname" id="subscribe_pname" />
                      <div id="notification"></div>
                      <button type="submit" className="button">Submit</button>
                    </div>
                  </form>
                  <div className="subscribe-bottom">
                    <input type="checkbox" id="newsletter_popup_dont_show_again" />
                    <label htmlFor="newsletter_popup_dont_show_again">Don't show this popup again</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="btn btn-primary skip" href="/#popup1" style={{ padding: '6px 15px', background: '#333', color: '#fff', textDecoration: 'none', fontFamily: 'Gill Sans', borderRadius: '3px', margin: '25% 40%', display: 'inline-block' }}>
        OPEN POPUP
      </a>
    </div>
  );
};

export default NewsModal;