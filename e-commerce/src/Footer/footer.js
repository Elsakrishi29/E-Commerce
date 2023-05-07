import React from "react";
import google_icon from '../Asserts/images/Google-App-store-icon.webp';
import apple_icon from '../Asserts/images/Apple-App-store-icon.png';
import './footer.scss'

const Footer = () =>{
    return(
        <div className='footer-container'>
        <div className='footer-sec1'>
            <h4>bigbasket</h4>
            <ul>
              <li><a href=''>About Us</a></li>
              <li><a href=''>In News</a></li>
              <li><a href=''>Green bigbasket</a></li>
              <li><a href=''>Privacy Policy</a></li>
              <li><a href=''>Affiliate</a></li>
              <li><a href=''>Terms and Conditions</a></li>
              <li><a href=''>Careers At bigbasket</a></li>
              <li><a href=''>bb Instant</a></li>
              <li><a href=''>bb Daily</a></li>
              <li><a href=''>bb Blog</a></li>
              <li><a href=''>bbnow</a></li>
            </ul>
        </div>
        <div className='footer-sec1'>
        <h4>Help</h4>
            <ul>
              <li><a href=''>FAQs</a></li>
              <li><a href=''>Contact Us</a></li>
              <li><a href=''>bb Wallet FAQs</a></li>
              <li><a href=''>bb Wallet T&Cs</a></li>
              <li><a href=''>Vendor Connect</a></li>
            </ul>
        </div>
        <div className='footer-sec1'>
        <h4>Download Our App</h4>
        <img src={google_icon}/>
        <img src={apple_icon}/>
        </div>
        <div className='footer-sec1'>
        <h4>Get Social With Us</h4>
        <i className="fa fa-facebook"></i>
        <i className="fa fa-pinterest-p"></i>
        <i className="fa fa-twitter"></i>
        <i className="fa fa-instagram"></i>
        </div>
      </div>
    );
}

export default Footer;  