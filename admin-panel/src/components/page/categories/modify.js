import {
  PageHeader,
  Button,
  Form,
  Input,
  Radio,
  Row,
  Col,
  Divider,
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, create, update } from "../../../services/categories.service";
import { toast } from "react-toastify";
import { Save } from "react-feather";
import axiosExeptionHandler from "../../utils/axios.exception-handaler";
const ModifyCategory = () => {
  const { id } = useParams();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const navicate = useNavigate();

  const onFinish = async (values) => {
    values.status = values.status ? 1 : 0;
    values.no_follow = values.no_follow ? 1 : 0;
    values.no_index = values.no_index ? 1 : 0;
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
      navicate("/categories");
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
      form.current.setFieldsValue(data.data);
      toast.success(data?.message, { position: "top-right", theme: "dark" });
      setLoading(false);
    } catch (e) {
      axiosExeptionHandler(e, () => {
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, []);
  return (
    <>
      <PageHeader
        className="site-page-header"
        title={`${id ? "Update" : "Create"} Category`}
      />
      <Row>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form
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
            <Form.Item label="Content Body" name="content_body">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Status" name="status">
              <Radio.Group>
                <Radio value={1}>Active</Radio>
                <Radio value={0}>Inactive</Radio>
              </Radio.Group>
            </Form.Item>
            <Divider>SEO Information</Divider>
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
export default ModifyCategory;
