import { PageHeader, Button, Form, Input, Radio, Row, Col } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get, create, update } from '../../../services/user.service';
import { toast } from 'react-toastify';
import { Save } from 'react-feather';
import axiosExeptionHandler from '../../utils/axios.exception-handaler';
const ModifyUser = () => {
    const { id } = useParams();
    const form = useRef()
    const [loading, setLoading] = useState(false)
    const navicate = useNavigate();

    const onFinish = async (values) => {
        values.status = values.status?1:0; 
        setLoading(true);
        try {
            let response; 
            if(id){
                response = await update(id, values)
            }else{
                response = await create(values)
            }
            const {data} = response;
            toast.success(data?.message, { position: "top-right", theme: "dark" });
            setLoading(false)
            setTimeout(()=>{
                navicate('/users')
            },500)
        } catch (e) {
            axiosExeptionHandler(e,()=>{
                setLoading(false);
            })
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const getData=async ()=>{
        setLoading(true);
        try {
            const response = await get(id);
            const { data } = response;
            form.current.setFieldsValue(data.data)
            toast.success(data?.message, { position: "top-right", theme: "dark" });
            setLoading(false);
        } catch (e) {
            const data = e?.response?.data;
            if (data) toast.error(data.message, { position: "top-right", theme: "dark" })
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(id){
            getData()
        }
    },[  ])

    return (<>
        <PageHeader
            className="site-page-header"
            title={`${(id ? "Update" : "Create")} Users`}
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
                        label="User Name"
                        name="user_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email ',
                                type: 'email'
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Details"
                        name="details"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                    >
                            <Radio.Group >
                                <Radio value={1}>Active</Radio>
                                <Radio value={0}>Inactive</Radio>
                            </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            <Save size={14}/> <span style={{paddingLeft: '5px'}}> {(id ? "Update" : "Create")}</span>
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    </>)
}
export default ModifyUser;