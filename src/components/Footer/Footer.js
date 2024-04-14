import "./Footer.css";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


import iconfacebook from "../../Icons/iconfacebook.png"
import iconx from "../../Icons/icons8-x-50.png"
import icontiktok from "../../Icons/icons8-tiktok-48.png"
import iconinsta from "../../Icons/icons8-instagram-48.png"

import Form from 'react-bootstrap/Form';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="frame-parent4">
          <div className="frame-parent5">
            <div className="frame-parent6">
              <div className="logo-parent">
                <div className="logo">
                  <h3 className="exclusive">Exclusive</h3>
                </div>
                <div className="subscribe">Subscribe</div>
              </div>
              <div className="get-10-off">Get 10% off your first order</div>
            </div>
            {/* <div className="send-mail">
              <input className="enter-your-email" placeholder="Enter your email"></input>
              <img className="icon-send" alt="" src="/iconsend.svg" />
            </div> */}
            <Form.Control
              type="email"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="Enter your email"
            />
          </div>
          <div className="support-parent">
            <div className="support">Support</div>
            <div className="color-palette">
              <div className="bijoy-sarani-dhaka-container">
                <p className="parameshwara-junction-palaly">
                  184 parameshwara junction Palaly Road thirunelvely , Jaffna,
                  Sri Lanka
                </p>
                <p className="m2mf9wp-jaffna">
                  <span> </span>
                  <b className="m2mf9wp-jaffna1">M2MF+9WP, Jaffna</b>
                </p>
              </div>
              <div className="exclusivegmailcom">
                Northwaysupermart@gmail.com
              </div>
              <div className="size-sorter">+94 76 317 3092</div>
            </div>
          </div>
          <div className="opacity-modifier">
            <div className="account">Account</div>
            <div className="spacing-regulator">
              <div className="my-account">My Account</div>
              <div className="login-register">Login / Register</div>
              <div className="cart">Cart</div>
              <div className="wishlist">Wishlist</div>
              <div className="shop">Shop</div>
            </div>
          </div>
          <div className="fill-filler">
            <div className="quick-link">Quick Link</div>
            <div className="privacy-policy-parent">
              <div className="privacy-policy">Privacy Policy</div>
              <div className="terms-of-use">Terms Of Use</div>
              <div className="faq">FAQ</div>
              <div className="contact">Contact</div>
              <div className="mask-master">
              <div className = "social-icon-con">
              <img
                className="icon-facebook"
                loading="lazy"
                alt=""
                src={iconfacebook}
              />
              </div>
              <div className = "social-icon-con">
              <img
                className="icon-twitter"
                loading="lazy"
                alt=""
                src={iconx}
              />
              </div>
              <div className = "social-icon-con">
              <img
                className="icon-instagram"
                loading="lazy"
                alt=""
                src={iconinsta}
              />
              </div>
              {/* <div className = "social-icon-con">
              <img
                className="icon-linkedin"
                loading="lazy"
                alt=""
                src={icontiktok}
              />
              </div> */}
            </div>
            
            </div>
          </div>
          <div className="layer-stack-parent">
            <div className="layer-stack">
              <div className="download-app">Are you here to access the admin features?  </div>
              <div className="save-3-with-app-new-user-only-parent">
                <div className="save-3-with">
                <a href="/adminLogin">
                <Button variant="outline-light">Access to the Admin panel </Button>{' '}
                </a>
                </div>

                <div className="proximity-prober">
                  {/* <img
                    className="qr-code-icon"
                    loading="lazy"
                    alt=""
                    src="/qr-code@2x.png"
                  /> */}
                  <div className="transform-transformer">
                    {/* <img
                      className="googleplay-icon"
                      loading="lazy"
                      alt=""
                      src="/googleplay.svg"
                    />
                    <img
                      className="appstore-icon"
                      loading="lazy"
                      alt=""
                      src="/appstore@2x.png"
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="mask-master">
              <img
                className="icon-facebook"
                loading="lazy"
                alt=""
                src={iconfacebook}
              />
              <img
                className="icon-twitter"
                loading="lazy"
                alt=""
                src={iconx}
              />
              <img
                className="icon-instagram"
                loading="lazy"
                alt=""
                src={iconinsta}
              />
              <img
                className="icon-linkedin"
                loading="lazy"
                alt=""
                src={icontiktok}
              />
            </div> */}
          </div>
        </div>
      </div>
      <div className="path-processor">
        <img
          className="underline-icon"
          loading="lazy"
          alt=""
          src="/underline.svg"
        />
        <div className="shape-library">
          <div className="icon-copyright-parent">
            {/* <img
              className="icon-copyright"
              loading="lazy"
              alt=""
              
            /> */}
            <div className="copyright-rimel-2022">
            &copy; Copyright Northway Supermart. All right reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
