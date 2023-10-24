import React from 'react';
import '../App.css'
function Footer() {
  const footerStyle = {
    backgroundColor: '#deded5',
  };

  const headingStyle = {
    letterSpacing: '2px',
    color: '#818963',
  };

  const linkStyle = {
    color: '#4f4f4f',
  };

  const scrollToAbout = () => {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
  };
  return (
    <div className="container my-5 Footer">
      <footer style={footerStyle}>
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4">
              <h5 className="mb-3" style={headingStyle}>E Waste Locator</h5>
              <p>
              Our inspiration for creating the E-waste facility locator website stemmed from a shared concern for the increasing environmental and health hazards caused by improper disposal of electronic waste. We wanted to empower individuals to make responsible choices when disposing of their old devices while raising awareness about the harmful components within e-waste.
              </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="mb-3" style={headingStyle}>links</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-1">
                  <a href="/" style={linkStyle}>Home</a>
                </li>
                <li className="mb-1">
                  <a href="#about-section" onClick={scrollToAbout} style={linkStyle}>About</a>
                </li>
                <li className="mb-1">
                  <a href="/findfacility" style={linkStyle}>Facilities</a>
                </li>
                <li className="mb-1">
                  <a href="/credits" style={linkStyle}>Rewards</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="mb-1" style={headingStyle}>Opening hours</h5>
              <table className="table" style={{ color: '#4f4f4f', borderColor: '#666' }}>
                <tbody>
                  <tr>
                    <td>Mon - Fri:</td>
                    <td>9am - 9pm</td>
                  </tr>
                  <tr>
                    <td>Sat - Sun:</td>
                    <td>9am - 7pm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
