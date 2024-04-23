import "./AdminProfile.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AdminProfile = () => {
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
              <div className="admin-pro-y">
                <div className="div6">
                  <div className="div7">
                    <div className="div8">
                      <div className="div9">
                        <b className="b1">Your Profile</b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-container">
                  <div className="form-container-root">
                    <div className="div90">
                      <div className="div91">
                        <div className="div92">
                          <div className="div93">
                            <div className="new-password">New Password*</div>
                          </div>
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

export default AdminProfile;
