import { Button, Form, Input, Row, Col } from "antd";
import { login } from "../../../services/user.service";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const navicate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      setLoading(false);
      const response = await login(values);
      const { data } = response;
      toast.success(data?.message, { position: "top-right", theme: "dark" });
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      navicate("/");
    } catch (e) {
      const data = e?.response?.data;
      if (data)
        toast.error(data.message, { position: "top-right", theme: "dark" });
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ marginTop: "15%" }} 
    className="animated fadeIn">
      <Row>
        <Col
          lg={{ span: 4, offset: 10 }}
          md={{ span: 12, offset: 6 }}
          sm={{ span: 18, offset: 3 }}
          xs={{ span: 20, offset: 2 }}
        >
          <Form
            disabled={loading}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username or email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default Login;
