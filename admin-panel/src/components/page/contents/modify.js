import {
  PageHeader,
  Button,
  Form,
  Input,
  Radio,
  Row,
  Col,
  Select,
  Modal
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, create, update } from "../../../services/content.service";
import { toast } from "react-toastify";
import { Save } from "react-feather";
import JoditEditor from "jodit-react";
import axiosExeptionHandler from "../../utils/axios.exception-handaler";
import { AppLoader } from "../../../App";
import SelectFile from "../../common/SelectFile";
import appConst from "../../../constants/app.constants";
// 'slider','post','address','package','popular-package','client'
const contentTypes = [
  {
    label: "Slider",
    value: "slider",
  },
  {
    value: "post",
    label: "Post",
  },
  {
    value: "package",
    label: "Package",
  },
  // {
  //   value: "popular-package",
  //   label: "Popular-package",
  // },
  {
    value: "client",
    label: "Client",
  }
];

const ModifyContent = () => {
  const { id } = useParams();
  const form = useRef();
  const editor = useRef(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [featureImage, settFeatureImage] = useState(null);
  const [featureImageMdal, setFeatureImageModal] = useState(false);
  const navicate = useNavigate();

  const onFinish = async (values) => {
    values.status = values.status ? 1 : 0;
    setLoading(true);
    try {
      let response;
      if (id) {
        response = await update(id, values);
      } else {
        response = await create(values);
      }
      const { data } = response;
      toast.success(data?.message, { position: "top-right", theme: "dark" });

      setLoading(false);
      navicate("/contents");
    } catch (e) {
      axiosExeptionHandler(e, () => setLoading(false));
    }
  };
  const onFinishFailed = (errorInfo) => {
    toast.warn("Please provide all the information currectly", {
      position: "top-right",
      theme: "dark",
    });
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await get(id);
      const { data } = response;

      if(data.data.file_id){
        settFeatureImage({uri: data.data.uri, id:data.data.file_id })
      }
      form.current.setFieldsValue(data.data);
      form.current.setFieldValue('type',data.data.type);
      setType(data.data.type)
      toast.success(data?.message, { position: "top-right", theme: "dark" });
      setLoading(false);
    } catch (e) {
      const data = e?.response?.data;
      if (data)
        toast.error(data.message, { position: "top-right", theme: "dark" });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, []);
  let src = featureImage?(appConst.host + featureImage?.uri.split(".").join("128x128.")):'';
  return (
    <>
      <PageHeader
        className="site-page-header"
        title={`${id ? "Update" : "Create"} Content`}
      />
      <Row>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form
            className="animated fadeIn"
            ref={form}
            disabled={loading}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your title",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your type",
                },
              ]}
            >
              <Select
                style={{
                  width: 120,
                }}
                defaultValue={"post"}
                value={type}
                // disabled={id?true:false}
                allowClear
                options={contentTypes}
                onChange={(v)=>{
                  setType(v)
                  form.current.setFieldValue('type',v);
                }}
              />
            <p style={{fontSize: '10px'}}>Content type is used for diffrientiate the types of content</p>
            </Form.Item>
            {/* {type==='slider'?<Form.Item label="Caption" name="caption">
              <Input.TextArea />
            </Form.Item>:null} */}
            
            {(type=='slider'||type=='post'||type=='package'||type=='client')?<Form.Item
              label="Content Body"
              name="content_body"
            >
              <JoditEditor
                ref={editor}
                config={{
                  toolbarAdaptive: false,
                  statusbar: false,
                  readonly: false,
                  placeholder: "Start typings...",
                }}
                tabIndex={1}
              />
            </Form.Item>:<Form.Item
              label="Content Body"
              name="content_body"
            >
              <Input.TextArea />
            </Form.Item>}

            {(type=='post'||type=='slider'||type=='package'||type=='client')?<Form.Item name="file_id" 
              label="Feature Image">
              <Input value={featureImage?.id ?? ''} type="hidden"/>
              <Button onClick={()=>{
                setFeatureImageModal(true)
              }}>Select Image</Button>
              <br/>
              <img src={src}/>
            </Form.Item>:null}

            <Form.Item name="status">
              <Radio.Group>
                <Radio value={1}>Active</Radio>
                <Radio value={0}>Inactive</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <Save size={14} />{" "}
                <span style={{ paddingLeft: "5px" }}>
                  {" "}
                  {id ? "Update" : "Create"}
                </span>
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Modal open={featureImageMdal} onCancel={()=>{setFeatureImageModal(false)}} okButtonProps={{style: {display: 'none'}}} cancelButtonProps={{style: {display: 'none'}}}>
        {featureImageMdal?<SelectFile onSelect={image=>{
          settFeatureImage(image)
          if(image){
            
            form.current.setFieldValue('file_id',image.id);
          }
         setFeatureImageModal(false)
        }}/>:null}
      </Modal>
    </>
  );
};
export default ModifyContent;
