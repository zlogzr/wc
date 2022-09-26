import React from 'react';
import { withRouter } from "react-router-dom";


const FormInfo = ({ data, waitBackChange = false }) => {

  // console.log(data,'data');
    // const style = {color: 'red'}
    if(data){
      return(
        <ul className="travel-agency-form-info">
          <li><b>單號</b>: &nbsp; &nbsp; &nbsp; &nbsp;  <span className="content">{data.SequenceID}</span></li>
          <li><b>表單名稱</b>:  <span className="content">{data.Name}</span></li>
          {
            waitBackChange?  
            <li><b>類別</b>: &nbsp; &nbsp; &nbsp; &nbsp; <span className="content">{data.Place}</span></li>
            : <li><b>區域</b>: &nbsp; &nbsp; &nbsp; &nbsp; <span className="content">{data.Place}</span></li>
          }
          <li><b>備註</b>: &nbsp; &nbsp; &nbsp; &nbsp; <span className="content" >{data.Remark}</span></li>
        </ul>
      )
    }else{
      return null;
    }
    
}
  
export default withRouter( FormInfo )