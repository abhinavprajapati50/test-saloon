import React from 'react';
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalPhoneRoundedIcon from "@material-ui/icons/LocalPhoneRounded";
import MailIcon from "@material-ui/icons/Mail";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./css/Footer.css";

const Footer = () => {
    return (
      <div className="footer">
        {/* <section>Footer Example 4</section> */}
        <footer class="footer-distributed">
          <div class="footer-left">
            {/* <h3>
              Company<span>logo</span>
            </h3> */}

            <img
                src="./images/salon_logo.jpg"
                alt=""
            />

            <p class="footer-links">
              <a href="#" class="link-1">
                Home
              </a>

              {/* <a href="#">Blog</a> */}

              <a href="#">Service</a>

              <a href="#">About</a>

              {/* <a href="#">Faq</a> */}

              <a href="#">Contact</a>
            </p>

            <p class="footer-company-name">Copyrights reserved @ 2021</p>
          </div>

          <div class="footer-center">
            <div>
              <LocationOnIcon />
              <p>
                <span>404 Town Plaza</span> Nikol, Ahemedabad
              </p>
            </div>

            <div>
              <LocalPhoneRoundedIcon />
              <p>+919825634512</p>
            </div>

            <div>
              <MailIcon />
              <p>
                <a href="mailto:beautysaloon@gmail.com">
                  beautysaloon@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div class="footer-right">
            <p class="footer-company-about">
              <span>About the company</span>
              Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
              euismod convallis velit, eu auctor lacus vehicula sit amet.
            </p>

            <div class="footer-icons">
              <a href="#">
                <FacebookIcon />
              </a>
              <a href="#">
                <TwitterIcon />
              </a>
              <a href="#">
                <LinkedInIcon />
              </a>
              <a href="#">
                <GitHubIcon />
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
}

export default Footer
