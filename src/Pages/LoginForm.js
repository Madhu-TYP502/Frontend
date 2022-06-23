import { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Input, Row } from 'antd';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = 'auth-ws/auth/login';

const LoginForm = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const userid = response?.headers?.userid;
            setAuth({ email, password, roles, accessToken , userid})
            setEmail('');
            setPassword('');
            console.log(roles);
            navigate(from , {replace: true});
        }
        catch (err) {
            if (!err?.response) {
                setError('No Server Response')
            }
            else if (err.response?.status === 400) {
                setError('Missing username or password');
            }
            else if (err.response?.status === 401) {
                setError('UnAuthourized');
            }
            else {
                setError('Login Failed');
            }
        }
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const handleUsernameChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const errorAlert = error ? <Row>
        <Col span="8"></Col>
        <Col span="8">
            <Alert message={error} type="warning"></Alert>
        </Col>
    </Row> : ''

    return (
        <Form
            {...layout}
            onSubmit={handleSubmit}
            style={{ marginTop: '200px' }}
        >

            <Row>
                <Col span="8"></Col>
                <Col span="8">Login</Col>
            </Row>
            <br />
            <Form.Item
                label="Email"
                name="email"
                value={email}
                onChange={handleUsernameChange}
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                    Login
                </Button>
            </Form.Item>

            {errorAlert}

        </Form>
    );
};
export default LoginForm;