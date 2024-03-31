import "./Customerprofile.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import userImg from "../../Icons/user.png";

const CustomerProfile = () => {
  return (
    <div className="customer-profile">
      <div className="q">
        <div className="w">
          <div className="e">
            <div className="r">
              <div className="t">
                <div className="u">
                  <div className="i">
                    <div className="o">
                      <div className="p">
                        <div className="h">
                          <div className="j">
                            <div className="k">Profile</div>
                          </div>
                        </div>
                      </div>
                      <div className="a">
                        <div className="l">
                          <div className="z">
                            <div className="x">Orders</div>
                          </div>
                        </div>
                      </div>
                      <div className="s">
                        <div className="c">
                          <div className="v">
                            <div className="b">Shopping Lists</div>
                          </div>
                        </div>
                      </div>
                      <div className="d">
                        <div className="n">
                          <div className="m">
                            <div className="div1">Saved Items</div>
                          </div>
                        </div>
                      </div>
                      <div className="f">
                        <div className="div2">
                          <div className="div3">
                            <div className="payment-methods">
                              Payment Methods
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="g">
                        <div className="div4">
                          <div className="div5">
                            <div className="addresses">Addresses</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="y">
                <div className="div6">
                  <div className="div7">
                    <div className="div8">
                      <div className="div9">
                        <b className="b1">Your Profile</b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="div10">
                  <div className="div11">
                    <div className="div12">
                      <div className="div13">
                        <img className="icon" alt="" src={userImg} />
                      </div>
                      <div className="div14">
                        <div className="div15">
                          <div className="div16">
                            <b className="linda">Linda</b>
                          </div>
                        </div>
                        <div className="div17">
                          <div className="div18">
                            <div className="lindagreygmailcom">
                              lindagrey@gmail.com
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="div19">
                      <div className="div20">
                        <div className="div21">
                          <div className="div22">
                            <div className="div23">
                              <b className="b2">Change</b>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="div24">
                  <div className="div25">
                    <div className="div26">
                      <b className="b3">Account Information</b>
                    </div>
                  </div>
                </div>
                <div className="form-container">
                  <div className="form-container-root">
                    <div className="div27">
                      <div className="div28">
                        <div className="div29">
                          <div className="div30">
                            <div className="first-name2">First Name</div>
                          </div>
                          <Form.Control
                            placeholder={"First Name"}
                            className="div31"
                            type={"text"}
                          />
                        </div>
                        <div className="div33">
                          <div className="div34">
                            <div className="last-name2">Last Name</div>
                          </div>
                          <Form.Control
                            placeholder={"Last Name"}
                            className="div35"
                            type={"text"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="div37">
                      <div className="div38">
                        <div className="div39">
                          <div className="div40">
                            <div className="div41">Email</div>
                          </div>
                          {/* <div className="div42">
                        <div className="div43">
                          <div className="div44">
                            <div className="div45">
                              <div className="div46">lindagrey@gmail.com</div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                          <Form.Control
                            placeholder={"Email"}
                            className="div42"
                            type={"email"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="div47">
                      <div className="div48">
                        <div className="div49">
                          <div className="div50">
                            <div className="div51">Contact Number</div>
                          </div>
                          {/* <div className="div52">
                        <div className="div53">
                          <div className="div54">
                            <div className="div55">
                              <div className="div56">(123) 123-1234</div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                          <Form.Control
                            placeholder={"Contact Number"}
                            className="div42"
                            type={"number"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="div57">
                      <div className="div58">
                        <div className="div59">
                          <div className="div60">
                            <div className="address2">Address</div>
                          </div>
                          {/* <div className="div61">
                        <div className="div62">
                          <div className="depth-9-frame-012">
                            <div className="depth-10-frame-012">
                              <div className="main-st">1234 Main St</div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder={"Address"}
                            className="ddiv61"
                            type={"text"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="div63">
                      <div className="div64">
                        <div className="div65">
                          <div className="div66">
                            <div className="postal-code">Postal Code</div>
                          </div>
                          {/* <div className="div67">
                        <div className="div68">
                          <div className="depth-9-frame-013">
                            <div className="depth-10-frame-013">
                              <div className="div69">12345</div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                          <Form.Control
                            placeholder={"Postal Code"}
                            className="div67"
                            type={"text"}
                          />
                        </div>
                        <div className="div70">
                          <div className="div71">
                            <div className="city2">City</div>
                          </div>
                          {/* <div className="div72">
                        <div className="div73">
                          <div className="depth-9-frame-014">
                            <div className="depth-10-frame-014">
                              <div className="anytown">Anytown</div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                          {/* <Form.Control
                        placeholder={"City"}
                        className="div72"
                        type={"text"}
                      /> */}
                          <Form.Select
                            aria-label="Default select example"
                            style={{ height: "40px" }}
                          >
                            {/* <option>{label}</option> */}
                            {["Jaffna"].map((option, index) => {
                              return (
                                <option value="1" key={index}>
                                  {option}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </div>
                      </div>
                    </div>
                    <div className="div74">
                      {/* <div className="div75">
                    <div className="div76">
                      <div className="div77">
                        <b className="save">Save</b>
                      </div>
                    </div>
                  </div> */}
                      <Button
                        variant="outline-success"
                        style={{ width: "54%" }}
                      >
                        Save
                      </Button>{" "}
                    </div>
                    <div className="div78" style = {{marginTop: "50px"}}>
                      <div className="div79">
                        <div className="div80">
                          <b className="password3">Password</b>
                        </div>
                      </div>
                    </div>
                    <div className="div81">
                      <div className="div82">
                        <div className="div83">
                          <div className="div84">
                            <div className="current-password">
                              Current Password*
                            </div>
                          </div>
                          {/* <div className="div85">
                        <div className="div86">
                          <div className="div87">
                            <div className="div88">
                              <div className="div89">••••••••</div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                          <Form.Control
                            placeholder={"Password"}
                            className="div85"
                            type={"password"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="div90">
                      <div className="div91">
                        <div className="div92">
                          <div className="div93">
                            <div className="new-password">New Password*</div>
                          </div>
                          {/* <div className="div94">
                        <div className="div95">
                          <div className="div96">
                            <div className="div97">
                              <div className="div98">••••••••</div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                          <Form.Control
                            placeholder={"New Password"}
                            className="div94"
                            type={"password"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="div99">
                      <div className="div100">
                        <div className="div101">
                          <div className="div102">
                            <div className="confirm-new-password">
                              Confirm New Password*
                            </div>
                          </div>
                          {/* <div className="div103">
                        <div className="div104">
                          <div className="div105">
                            <div className="div106">
                              <div className="div107">••••••••</div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                          <Form.Control
                            placeholder={"Confirm New Password"}
                            className="div103"
                            type={"password"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="div108">
                      {/* <div className="div109">
                    <div className="div110">
                      <div className="div111">
                        <b className="change-password">Change Password</b>
                      </div>
                    </div>
                  </div> */}
                      <Button
                        variant="outline-success"
                        style={{ width: "54%" }}
                      >
                        Change Password
                      </Button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
