import React, { useEffect , useState } from 'react';
import './newsmodal.css';

const NewsModal = () => {
  const [email, setEmail] = useState('');
  const [showSubscriptionSuccess, setShowSubscriptionSuccess] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false);

  useEffect(() => {
    window.location.href = '/#popup1';
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('subscribe_pemail');
    const email = emailInput.value.trim();

    if (email) {
      const url = 'https://6478b937362560649a2e5ab6.mockapi.io/api/v1/subscribers';
      const data = { email };

      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          const existingEmail = result.find((item) => item.email === email);
          if (existingEmail) {
            setEmail('');
            setShowEmailWarning(true);
            // Hide the warning after 3 seconds
            setTimeout(() => {
              setShowEmailWarning(false);
            }, 3000);
          } else {
            // Email is not registered, proceed with submission
            fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((result) => {
                // Reset the email input after successful submission
                setEmail('');
                // Show the subscription success message
                setShowSubscriptionSuccess(true);
                // Hide the message after 3 seconds
                setTimeout(() => {
                  setShowSubscriptionSuccess(false);
                }, 3000);
              })
              .catch((error) => {
                console.error('Error submitting newsletter subscription:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error checking email existence:', error);
        });
    }
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
                  <form className='subs' id="subscribe_popup" onSubmit={handleSubmit}>
                    <input type="email" id='subscribe_pemail' placeholder="Enter your email.." value={email} onChange={handleEmailChange} required/>
                    {showSubscriptionSuccess && (
                      <div className="subscription-success">
                        <p>You have successfully subscribed to our newsletter!</p>
                      </div>
                    )}
                    {showEmailWarning && (
                      <div className="email-warning">
                        <p>This email is already registered for the newsletter.</p>
                      </div>
                    )}
                    <button type='submit' className='button'>Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default NewsModal;