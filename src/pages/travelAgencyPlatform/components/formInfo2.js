import React from 'react';


const FormInfo2 = ({ data, category }) => {
    // console.log(data, category,'data, categorydata, category');
    // console.log(data[0].SequenceID);
    // const style = {color: 'red'};
    if(data){
      if(category === 1){
        return(
          <ul className="travel-agency-form-info">
            <li><b>單號</b>: &nbsp; &nbsp;  &nbsp; <span className="content">{data.SequenceID}</span></li>
            <li><b>表單名稱</b>: <span className="content">{data.Name}</span></li>
            <li><b>區域</b>: &nbsp; &nbsp;  &nbsp; <span className="content">{data.Place}</span></li>
            <li style={{display:'flex'}}><b style={{width:'75px'}}>備註:</b> <span className="content" title={data.Remark} style={{flex:'1', height:'40px',overflowY:'auto'}}>{data.Remark}</span></li>
          </ul>
        )
      }
      
      else{
        return(
          <ul className="travel-agency-form-info">
            <li><b>單號</b>: &nbsp; &nbsp;  &nbsp; <span className="content">{data.SequenceID}</span></li>
            <li><b>表單名稱</b>: <span className="content">{data.Name}</span></li>
            <li><b>類別</b>: &nbsp; &nbsp;  &nbsp; <span className="content">{data.Place}</span></li>
            <li><b>備註</b>: &nbsp; &nbsp;  &nbsp; <span className="content" >{data.Remark}</span></li>
          </ul>
        )
      }
    }else{
      return null;
    }
    
}
  
export default FormInfo2 