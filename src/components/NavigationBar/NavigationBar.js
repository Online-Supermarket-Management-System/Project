import "./NavigationBar.css";
import iconuser from "../../Icons/icons8-user-circle-24.png"

const NavigationBar = () => {
  const navigateToProfile = () => {
    window.location.href = "/customerprofile";
  }
  return (
    <header className="depth-2-frame-2">
      <div className="depth-3-frame-01">
        <div className="depth-4-frame-01">
          <div className="depth-5-frame-014">
            <div className="depth-6-frame-013">
              <img
                className="vector-0"
                loading="lazy"
                alt=""
                src="Northway title.jpg"
              />
              <div className="depth-7-frame-015" />
            </div>
          </div>
          <div className="depth-5-frame-1">
            <div className="depth-6-frame-014">
              <b className="northway-supermart">Northway Supermart</b>
            </div>
          </div>
        </div>
      </div>
      <div className="depth-3-frame-1">
        <nav className="depth-4-frame-02">
          <div className="depth-5-frame-015">
            <div className="depth-6-frame-015">
              <a className="home" href="/">Home</a>
            </div>
          </div>
          <div className="depth-5-frame-11">
            <div className="depth-6-frame-016">
              <div className="about-us">About Us</div>
            </div>
          </div>
          <div className="depth-5-frame-2">
            <div className="depth-6-frame-017">
              <div className="contact-us">Contact Us</div>
            </div>
          </div>
          <div className="depth-5-frame-3">
            <div className="depth-6-frame-018">
              <a className="login1" href="/login">Login</a>
            </div>
          </div>
          <div className="depth-5-frame-4">
            <div className="depth-6-frame-019">
              <a className="register" href="/Register">Register</a>
            </div>
          </div>
        </nav>
        <div className="depth-4-frame-11">
          <div className="depth-5-frame-016">
            <div className="depth-6-frame-020">
              <div className="depth-7-frame-016">
                <b className="cart-0">Cart (0)</b>
              </div>
            </div>
          </div>
          <div className="depth-5-frame-12" onClick={navigateToProfile}>
            <div className="depth-6-frame-021">
              <div className="depth-7-frame-017" >
                <img class="vector-01" alt="customer-profile" src={iconuser}/>
                <div className="depth-8-frame-011" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
