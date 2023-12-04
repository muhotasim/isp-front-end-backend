import {
  PageHeader,
  Button,
  Form,
  Input,
  Radio,
  Row,
  Col,
  Select,
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, create, update  } from "../../../services/page.service";
import { all, createBulk, deletePageSections } from "../../../services/sections.service";
import { toast } from "react-toastify";
import {  Save } from "react-feather";
import StyleEditor from 'react-style-editor';
import axiosExeptionHandler from "../../utils/axios.exception-handaler";

import JoditEditor from "jodit-react";
const ModifyPage = () => {
  const { id } = useParams();
  const form = useRef();
  const editor = useRef(null);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const navicate = useNavigate();

  const onFinish = async (values) => {
    values.status = values.status ? 1 : 0;
    values.no_follow = values.no_follow ? 1 : 0;
    values.no_index = values.no_index ? 1 : 0;
    values.type = values.type ? values.type : "user_created";
    setLoading(true);
    try {
      debugger
      let response;
      await deletePageSections({page_id: id})
      if (id) {
        response = await update(id, values);
      } else {
        response = await create(values);
      }
      const { data } = response;
      const page_id = data.data.id ?? id;
      const pageSection = values.sections?values.sections.map((section_id, index)=>({section_id, page_id, serial: index})):[]
      toast.success(data?.message, { position: "top-right", theme: "dark" });
      if(pageSection.length) await createBulk(JSON.stringify(pageSection))
    
      setLoading(false);
      navicate("/pages");
    } catch (e) {
      axiosExeptionHandler(e, () => {
        setLoading(false);
      });
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
      data.data.sections = data.data.sections.filter(s=>s.value!=null).sort((a,b)=>a.serial-b.serial).map(s=>s.value)
      form.current.setFieldsValue(data.data);
      debugger
      toast.success(data?.message, { position: "top-right", theme: "dark" });
      setLoading(false);
    } catch (e) {
      const data = e?.response?.data;
      if (data)
        toast.error(data.message, { position: "top-right", theme: "dark" });
      setLoading(false);
    }
  };

  const getAllSections = async (callback = null) => {
    try {
      const response = await all();

      const { data } = response;
      setSections(data.data.data.map((d) => ({ label: d.name?d.name:d.title, value: d.id })));
      if (callback) {
        callback();
      }
    } catch (e) {
      axiosExeptionHandler(e, () => setLoading(false));
    }
  };

  useEffect(() => {
    getAllSections(() => {
      if (id) {
        getData();
      }
    });
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={`${id ? "Update" : "Create"} Page`}
      />
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
        <Row gutter={15}>
          <Col lg={12} md={24} sm={24} xs={24}>
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
            <Form.Item hidden label="Type" name="type">
              <Input />
            </Form.Item>
            <Form.Item
              label="Content Body"
              name="content_body"
              rules={[
                {
                  required: true,
                  message: "Please input your content body",
                },
              ]}
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
            </Form.Item>
            <Form.Item label="Sections" name="sections">
              <Select
                mode="multiple"
                allowClear
                showSearch
                options={sections}
                style={{ width: "100%" }}
                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                placeholder="Please select sections for the list"
              />
            </Form.Item>

            <Form.Item label="Page Css" name="p_css">
              <StyleEditor style={{minHeight: '200px'}}/>
            </Form.Item>
            <Form.Item label="Status" name="status">
              <Radio.Group>
                <Radio value={1}>Active</Radio>
                <Radio value={0}>Inactive</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={24} sm={24} xs={24}>
            <Form.Item
              label="Meta Title"
              name="meta_title"
              rules={[
                {
                  required: true,
                  message: "Please input your Meta Title",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Meta Key" name="meta_key">
              <Input />
            </Form.Item>
            <Form.Item label="Meta Description" name="meta_description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="No Follow" name="no_follow">
              <Radio.Group>
                <Radio value={1}>On</Radio>
                <Radio value={0}>Off</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="No Index" name="no_index">
              <Radio.Group>
                <Radio value={1}>On</Radio>
                <Radio value={0}>Off</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ float: "right" }}>
          <Button type="primary" htmlType="submit">
            <Save size={14} />{" "}
            <span style={{ paddingLeft: "5px" }}>
              {" "}
              {id ? "Update" : "Create"}
            </span>
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ModifyPage;
