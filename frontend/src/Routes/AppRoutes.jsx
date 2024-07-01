import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import 'https://kit.fontawesome.com/64d58efce2.js';

const AppRoutes = () => {
  const [signUpMode, setSignUpMode] = useState(false);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
    minHeight: '100vh',
    overflow: 'hidden'
  };

  const formsContainerStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0'
  };

  const signinSignupStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: signUpMode ? '25%' : '75%',
    width: '50%',
    transition: '1s 0.7s ease-in-out',
    display: 'grid',
    gridTemplateColumns: '1fr',
    zIndex: 5
  };

  const formStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0rem 5rem',
    transition: 'all 0.2s 0.7s',
    overflow: 'hidden',
    gridColumn: '1 / 2',
    gridRow: '1 / 2'
  };

  const titleStyle = {
    fontSize: '2.2rem',
    color: '#444',
    marginBottom: '10px'
  };

  const inputFieldStyle = {
    maxWidth: '380px',
    width: '100%',
    backgroundColor: '#f0f0f0',
    margin: '10px 0',
    height: '55px',
    borderRadius: '5px',
    display: 'grid',
    gridTemplateColumns: '15% 85%',
    padding: '0 0.4rem',
    position: 'relative'
  };

  const inputFieldIconStyle = {
    textAlign: 'center',
    lineHeight: '55px',
    color: '#acacac',
    transition: '0.5s',
    fontSize: '1.1rem'
  };

  const inputStyle = {
    background: 'none',
    outline: 'none',
    border: 'none',
    lineHeight: '1',
    fontWeight: '600',
    fontSize: '1.1rem',
    color: '#333'
  };

  const socialTextStyle = {
    padding: '0.7rem 0',
    fontSize: '1rem'
  };

  const socialMediaStyle = {
    display: 'flex',
    justifyContent: 'center'
  };

  const socialIconStyle = {
    height: '46px',
    width: '46px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 0.45rem',
    color: '#333',
    borderRadius: '50%',
    border: '1px solid #333',
    textDecoration: 'none',
    fontSize: '1.1rem',
    transition: '0.3s'
  };

  const socialIconHoverStyle = {
    color: '#F86F03',
    borderColor: '#F86F03'
  };

  const buttonStyle = {
    width: '150px',
    backgroundColor: '#F86F03',
    border: 'none',
    outline: 'none',
    height: '49px',
    borderRadius: '4px',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '600',
    margin: '10px 0',
    cursor: 'pointer',
    transition: '0.5s'
  };

  const buttonHoverStyle = {
    backgroundColor: '#f98c39'
  };

  const panelStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    textAlign: 'center',
    zIndex: 6
  };

  const leftPanelStyle = {
    pointerEvents: signUpMode ? 'none' : 'all',
    padding: '3rem 17% 2rem 12%'
  };

  const rightPanelStyle = {
    pointerEvents: signUpMode ? 'all' : 'none',
    padding: '3rem 12% 2rem 17%'
  };

  const contentStyle = {
    color: '#fff',
    transition: 'transform 0.9s ease-in-out',
    transitionDelay: '0.6s'
  };

  const imageStyle = {
    width: '100%',
    transition: 'transform 1.1s ease-in-out',
    transitionDelay: '0.4s'
  };

  const panelTransformStyle = signUpMode ? { transform: 'translateX(0%)' } : { transform: 'translateX(800px)' };

  return (
    <div className="container" style={containerStyle}>
      <div className="forms-container" style={formsContainerStyle}>
        <div className="signin-signup" style={signinSignupStyle}>
          <form action="#" className="sign-in-form" style={formStyle}>
            <h2 className="title" style={titleStyle}>Sign in</h2>
            <div className="input-field" style={inputFieldStyle}>
              <FontAwesomeIcon icon={faUser} style={inputFieldIconStyle} />
              <input type="text" placeholder="Username" style={inputStyle} />
            </div>
            <div className="input-field" style={inputFieldStyle}>
              <FontAwesomeIcon icon={faLock} style={inputFieldIconStyle} />
              <input type="password" placeholder="Password" style={inputStyle} />
            </div>
            <input type="submit" value="Login" className="btn solid" style={buttonStyle} />
            <p className="social-text" style={socialTextStyle}>Or Sign in with social platforms</p>
            <div className="social-media" style={socialMediaStyle}>
              <a href="#" className="social-icon" style={socialIconStyle}>
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social-icon" style={socialIconStyle}>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="social-icon" style={socialIconStyle}>
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="social-icon" style={socialIconStyle}>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </form>
          <form action="#" className="sign-up-form" style={{ ...formStyle, opacity: signUpMode ? 1 : 0, zIndex: signUpMode ? 2 : 1 }}>
            <h2 className="title" style={titleStyle}>Sign up</h2>
            <div className="input-field" style={inputFieldStyle}>
              <FontAwesomeIcon icon={faUser} style={inputFieldIconStyle} />
              <input type="text" placeholder="Username" style={inputStyle} />
            </div>
            <div className="input-field" style={inputFieldStyle}>
              <FontAwesomeIcon icon={faEnvelope} style={inputFieldIconStyle} />
              <input type="email" placeholder="Email" style={inputStyle} />
            </div>
            <div className="input-field" style={inputFieldStyle}>
              <FontAwesomeIcon icon={faLock} style={inputFieldIconStyle} />
              <input type="password" placeholder="Password" style={inputStyle} />
            </div>
            <input type="submit" className="btn" value="Sign up" style={buttonStyle} />
            <p className="social-text" style={socialTextStyle}>Or Sign up with social platforms</p>
            <div className="social-media" style={socialMediaStyle}>
              <a href="#" className="social-icon" style={socialIconStyle}>
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social-icon" style={socialIconStyle}>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="social-icon" style={socialIconStyle}>
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="social-icon" style={socialIconStyle}>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container" style={{ position: 'absolute', height: '100%', width: '100%', top: '0', left: '0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div className="panel left-panel" style={{ ...panelStyle, ...leftPanelStyle }}>
          <div className="content" style={contentStyle}>
            <h3>New to our community?</h3>
            <p>
              Discover a world of possibilities! Join us and explore a vibrant
              community where ideas flourish and connections thrive.
            </p>
            <button className="btn transparent" onClick={() => setSignUpMode(true)} style={{ ...buttonStyle, background: 'none', border: '2px solid #fff', width: '130px', height: '41px', fontWeight: '600', fontSize: '0.8rem' }}>
              Sign up
            </button>
          </div>
          <img src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" className="image" alt="" style={imageStyle} />
        </div>
        <div className="panel right-panel" style={{ ...panelStyle, ...rightPanelStyle }}>
          <div className="content" style={{ ...contentStyle, ...panelTransformStyle }}>
            <h3>One of Our Valued Members</h3>
            <p>
              Thank you for being part of our community. Your presence enriches our
              shared experiences. Let's continue this journey together!
            </p>
            <button className="btn transparent" onClick={() => setSignUpMode(false)} style={{ ...buttonStyle, background: 'none', border: '2px solid #fff', width: '130px', height: '41px', fontWeight: '600', fontSize: '0.8rem' }}>
              Sign in
            </button>
          </div>
          <img src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png" className="image" alt="" style={{ ...imageStyle, ...panelTransformStyle }} />
        </div>
      </div>
    </div>
  );
};

export default AppRoutes;
