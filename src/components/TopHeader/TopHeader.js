import "./TopHeader.css";
import Dropdown from 'react-bootstrap/Dropdown';

const TopHeader = () => {
  return (
    <div className="top-header">
      <div className="frame-parent1">
        <div className="frame-parent2">
          <div className="summer-sale-for-all-swim-suits-wrapper">
            <div className="summer-sale-for">
              Summer Sale For All Fresh Fruits And Free Express Delivery - OFF
              50%
            </div>
          </div>
          <div className="shopnow">ShopNow</div>
        </div>
        <div className="frame-parent3">
          {/* <div className="english-wrapper">
            <div className="english">English</div>
          </div>
          <select className="dropdown-icon" defaultValue={"en"}>
            <option value="en">English</option>
            <option value="fr">Tamil</option>
            <option value="de">Sinhala</option>
          </select> */}
          <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        English
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
