import React from "react";
import { connect } from "react-redux";
import "../index.less";

const Footer = (props) => {
  const { webVersion } = props;
  return (
    <div className="footone">
      <div className="footer">
        {/* <div className='footersu' >苏ICP备10209703号-1   </div> */}
        <div>
          <a
            style={{ fontSize: "14px" }}
            className="fottermain"
            href="https://beian.miit.gov.cn/"
            target="_blank"
          >
            粤ICP备10004982号
          </a>
          &nbsp;&nbsp;版本號:{webVersion}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { webVersion } = state.homeReducer;
  return {
    webVersion,
  };
};

export default connect(mapStateToProps)(Footer);
