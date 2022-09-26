import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Redirect, Route } from "react-router-dom";
import { actionCreators } from "./store";
import { Form, Input, Icon, Button, Card } from "antd";
import { getUrlParam } from "../../utils";
import "./index.less";

const FormItem = Form.Item;

const Login = (props) => {
  // console.log(props,'111');
  const {
    form: { getFieldDecorator, validateFields },
    handleLogin,
    history,
    loading,
  } = props;
  // console.log(props,'props');
  const formRule = {
    userName: {
      rules: [{ required: true, message: "請輸入賬號" }],
    },
    passWord: {
      rules: [{ required: true, message: "請輸入密碼" }],
    },
  };
  const iconStyle = { color: "rgba(0,0,0,.25)" };
  const category = getUrlParam(props.location.search, "category");
  const cate = category === "staff" || category === "travel";
  let isLogin = false;
  if (!(sessionStorage.getItem("user") || sessionStorage.getItem("userId"))) {
    isLogin = true;
  }
  if (cate && isLogin !== false) {
    return (
      <div className="login-container">
        <div className="mask"></div>
        <Card
          title={
            category === "staff"
              ? "機票管理系統-員工登錄"
              : "機票管理系統-陸行社登錄"
          }
          className="login-content"
          bordered={false}
        >
          <Form
            onSubmit={(e) => handleLogin(validateFields, history, category, e)}
          >
            <FormItem className="a">
              {getFieldDecorator(
                "userName",
                formRule.userName
              )(
                <Input
                  autoFocus
                  prefix={<Icon type="user" style={iconStyle} />}
                  placeholder="賬號"
                  autoComplete="off"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator(
                "passWord",
                formRule.passWord
              )(
                <Input
                  prefix={<Icon type="lock" style={iconStyle} />}
                  type="passWord"
                  placeholder="密碼"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-btn"
                loading={loading}
              >
                登錄
              </Button>
              <Button
                type="primary"
                className="signout-btn"
                loading={loading}
                // onClick.native={logSubClick}
                onClick={sign}
              >
                退出登錄
              </Button>
            </FormItem>
            <FormItem></FormItem>
          </Form>
        </Card>
      </div>
    );
  } else {
    // return <Redirect to="/home" />
    return <Route exact path="/" render={() => <Redirect to="/home" />} />;
  }
};

// 退出登錄
const sign = () => {
  window.history.back(-1);
};
const mapStateToProps = (state) => {
  const { login, loading } = state.loginReducer;
  return { login, loading };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin(validateFields, history, category, e) {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch(actionCreators.login(history, values, category));
        }
      });
    },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  Form.create()
)(Login);
