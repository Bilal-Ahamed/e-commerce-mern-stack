import React from "react";

function Footer() {
  return (
    <React.Fragment>
      <footer className="bg-light mt-auto pt-5 pb-4 fw-light">
        <div className="container">
          <div class="row row-cols-1 row-cols-md-4 gap-4 gap-md-0 mb-5">
            <div class="col pb-5">
              <ul>
                <li className="">
                  <img
                    className="brand_logo"
                    src="/images/h&m_logo.png"
                    alt=""
                  />
                </li>
              </ul>
            </div>
            <div class="col">
              <ul>
                <h6>Customer Service</h6>
                <li className="text-secondary">Contact Us</li>
                <li className="text-secondary">Contact Us</li>
                <li className="text-secondary">Contact Us</li>
                <li className="text-secondary">Contact Us</li>
              </ul>
            </div>
            <div class="col">
              <ul>
                <h6>Terms Of Services</h6>
                <li className="text-secondary">Contact Us</li>
                <li className="text-secondary">Contact Us</li>
                <li className="text-secondary">Contact Us</li>
                <li className="text-secondary">Contact Us</li>
              </ul>
            </div>
            <div class="col">
              <ul>
                <h6>Products</h6>
                <li className="text-secondary">Contact Us</li>
                <li className="text-secondary">Contact Us</li>
                <li className="text-secondary">Contact Us</li>
                <li className="text-secondary">Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="row text-secondary" style={{ fontSize: 13 }}>
            <div className="col">
              <p>A Part of Hearst Digital Media</p>
              <p>
                H&M participates in various affiliate marketing programs, which
                means we may get paid commissions on editorially chosen products
                purchased through our links to retailer sites.
              </p>
              <p>©2021 H&M, Inc. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
