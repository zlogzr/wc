import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SignFormLists from './components/signFormLists';
import { Card } from "antd";
import { actionCreators } from "./store";

const Sign = ({ match, currPage, getPageData }) => {
  const id = match.params.id;
  currPage(id);
  getPageData(id);
  // const title = id === '1' ? '待簽核表單' : '已簽核表單';

  var title = '';
  if(id === '1'){
    title = '待簽核表單'
  } else if( id === '2'){
    title = '已簽核表單'
  }else if( id === '3' ) {
    title = '待確認表單'
  }
  return (
    <Card
      title={title}
    >
      <SignFormLists header={title} />
    </Card>
  )
}

const mapDispatchToProps = ( dispatch ) => {
  return{
    currPage(id){
      dispatch(actionCreators.currPage(id))
    },
    getPageData(id){
      dispatch(actionCreators.getPageData(id))
    }
  }
}
export default  withRouter(connect( null, mapDispatchToProps )( Sign ))