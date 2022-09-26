import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Upload, Icon,message, Button} from "antd";
import { compose } from "../../../../utils";

// 2021.10.11添加
import { actionCreators } from "../store";

import '../index.less'

// 引入下载地址
import { baseURL } from '../../../../axios/baseURL';

// 引入文件上傳
import Uplodes from '../../../../components/upload/index'

const FormItem = Form.Item;
const Dragger = Upload.Dragger;
class BatchUpload extends Component {

state={
    newFilelist: [],
 }


    plscDownLoad() {
        const {urls}=this.props
        // console.log(urls);
        return (
            <div >
                {/* <a href='http://10.42.168.147:1234/maintain/OpenExcel?path=D:/AW/P81/sample.xlsx&name=sample.xlsx'><Icon type="download" size='big' />點此下載模板11</a> */}
                {/* 修改后 */}
                {/* <a href={baseURL+'/maintain/OpenExcel?path=D:/AW/P81/sample.xlsx&name=sample.xlsx'}><Icon type="download" size='big' />點此下載模板</a> */}

                <a href={urls}><Icon type="download" size='big' />點此下載模板</a>
            </div>);
    }

    // 批量上傳時候
    plscUpload() {
        return (<Dragger
            name="file"
            beforeUpload={(file, fileList) =>{return false}}
            // multiple={true}
        //   action={`https://www.mocky.io/v2/5cc8019d300000980a055e76`}
            className="upload-file"
            onChange={this.handleUploadFileChange}
            onPreview={this.onPreview}
            // withCredentials={true}
            onRemove={this.props.handleRemoveFile}
            openFileDialogOnClick={true}
        >
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">點擊或者拖拽文件上傳</p>
        </Dragger>);
    }

    handleUploadFileChange=(file)=>{
        // console.log(file);
        this.setState({newFilelist: file.fileList.map((F) =>
            F.originFileObj
   )});

    }

       // 文件回显功能
       onPreview=fileObj=>{
        const file = this.state.newFilelist.find(F => F.uid === fileObj.uid);
        if (window.FileReader) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            //监听文件读取结束后事件
            reader.onloadend = function (e) {
                // console.log(e.target.result)   //e.target.result就是最后的路径地址
                const a = document.createElement('a'); // 创建a标签
                a.setAttribute('download', file.name);// download属性
                a.setAttribute('href', e.target.result);// href链接
                a.click();
                if(e.target.result){
                  message.info("文件下载成功")
                }
            };
        }
      }

    //   Submitmultiplefiles=()=>{
    //      console.log(this.state,'==-==');
    //   }



    render() {

        const { form: { getFieldDecorator },pageData: { ftszItem, country, certType },flightCategory,newFilelist,flightCategorys,Submitmultiplefiles,urls
        } = this.props;

    //    console.log(this.props);

        const formItemLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 8
            },
        };
        return (
            <div>
                <FormItem label=" " colon={false}  {...formItemLayout} >
                    {getFieldDecorator('downFileOption', {
                        rules: [{ required: true, message: ' ' }],
                    })(
                        this.plscDownLoad()
                    )}
                </FormItem>
                <FormItem label=" " colon={false} {...formItemLayout} >
                    {getFieldDecorator('fileOption', {
                        rules: [{ required: true, message: ' ' }],
                    })(
                        this.plscUpload()


                    )}
                    <Button className="submit-btn" onClick={Submitmultiplefiles.bind(this)}>確定</Button>
                </FormItem>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
        const {
            pageData,
            personInfo,
            flightCategory,  //页面机票数据
            newFilelist,
            urls
        } = state.fillFormReducer.fillFormAssistantReducer;
        return {
            pageData,
            personInfo,
            flightCategory,
            newFilelist,
            urls

        }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPageData() {
            dispatch(actionCreators.getPageInitData());
        },
        Submitmultiplefiles(e){
            e.preventDefault();
            this.props.getflightInfo();
            this.props.form.validateFields((err, values) => {
                // debugger

                    if(!values.fileOption){
                        message.warning('請上傳文件');
                        return false;
                    }

                   setTimeout(()=>{ dispatch(actionCreators.Submitmultiplefilesss(values,this.props.pageData,this.props.flightCategory))},0)

                // dispatch(actionCreators.addFlight(values))
                // setTimeout(()=>{
                //     dispatch(actionCreators.onebyone(values,this.props.pageData,this.props.flightCategory))
                // },0)
                // this.props.form.resetFields()
            })
        }
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    Form.create()
)(BatchUpload);

