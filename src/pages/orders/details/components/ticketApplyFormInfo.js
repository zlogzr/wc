import React, { Fragment } from 'react';
import HOCformInfo from "./HOCformInfo";

import {baseURL} from '../../../../axios/baseURL'

export default HOCformInfo(({ data }) => {
  console.log('data====', data)
    return(
      <Fragment>
        <li><b>類別</b> <span className="content">{data.TravelTypeName}</span></li>
        <li><b>備註</b> <span className="content">{data.Remark}</span></li>
        <li><b>附檔</b> <span className="content"><a
        //  href={`"${data.OFilePath}"`}
        href={baseURL + '/maintain/OpenExcel?path=' + data.FilePath + '&name=' + data.OFileName}
         >{data.OFileName}</a></span></li>
      </Fragment>
    )
})
