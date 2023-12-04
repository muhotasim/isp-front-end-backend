import { PageHeader, Button, Form, Input, Radio, Row, Col, Select } from "antd";
import React, { useState, useEffect, useRef } from "react";
import SectionsAndContentSelect from "../../common/SectionsAndContentSelect";
import { useNavigate, useParams } from "react-router-dom";
import { get, create, update, getSectionContent, deleteSectionContent, addBulkSectionContent } from "../../../services/sections.service";
import { toast } from "react-toastify";
import { Save } from "react-feather";
import axiosExeptionHandler from "../../utils/axios.exception-handaler";
const contentTypes = [
  {
    label: "Slider",
    value: "slider",
  },
  {
    label: "Slider 2",
    value: "slider-2",
  },
  {
    value: "post",
    label: "Section Block",
  },
  {
    value: "address",
    label: "Feature",
  },
  {
    value: "package",
    label: "Package",
  },
  {
    value: "popular-package",
    label: "Popular Package",
  },
  {
    value: "client",
    label: "Client",
  },
  {
    value: "section-title",
    label: "Section Title",
  },
  {
    value: "section-title-with-content",
    label: "Section Title With Content",
  },
  {
    value: "page-title-section",
    label: "Page Title Section",
  },
  {
    value: "details-only",
    label: "Details Only",
  }
];
const ModifyContent = () => {
  const { id } = useParams();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const navicate = useNavigate();

  const [selectedOptions, setSelectedOptions ] = useState([])
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
      await deleteSectionContent(id)
      toast.success(data?.message, { position: "top-right", theme: "dark" });
      if(selectedOptions.length) await addBulkSectionContent(selectedOptions.map(d=>({section_id:data.data.id ?? id, content_id: d.id})))
      setLoading(false);
      navicate("/sections");
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

      const sectionContentResponse = await getSectionContent(id);
      form.current.setFieldsValue(data.data);
      setType(data.data.type)
      setSelectedOptions(sectionContentResponse?.data?.data?.data ?? [])
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
  //title, type, caption, content_body, status

  return (
    <>
    
      <PageHeader
        className="site-page-header"
        title={`${id ? "Update" : "Create"} Section`}
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
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name",
                },
              ]}
            >
              <Input />
            </Form.Item>
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
                  width: 220,
                }}
                options={contentTypes}
                onChange={(v)=>{
                  form.current.setFieldValue('type',v);
                  setType(v);
                }}
              />
              {/* <Radio.Group
                options={contentTypes}
                onChange={(v)=>{
                  form.current.setFieldValue('type',v);
                  setType(v);
                }}
              >
              </Radio.Group> */}
            </Form.Item>

           

            <Form.Item name="status">
              <Radio.Group>
                <Radio value={1}>Active</Radio>
                <Radio value={0}>Inactive</Radio>
              </Radio.Group>
            </Form.Item>


            {(!loading&&type!='section-title')&&<div style={{paddingBottom: '25px'}}>
              <h3>Select Content</h3>
              <SectionsAndContentSelect selectedData={selectedOptions} setSelectedData={val=>{
                  setSelectedOptions(val)
              }}/>
            </div>}
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
    </>
  );
};
export default ModifyContent;
