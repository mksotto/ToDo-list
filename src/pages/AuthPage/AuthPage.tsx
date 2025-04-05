import {FC, useState} from "react";
import {authLoginPost} from "../../api/auth/authLoginPost.ts";
import {authSignupPost} from "../../api/auth/authSignupPost.ts";
import {Button, Card, Flex, Form, Input} from "antd";
import styles from './AuthPage.module.css'
import {AuthLoginPost, AuthSignupPost} from "../../types/domain/todo-list.ts";
import {useNavigate} from "react-router-dom";

export const AuthPage: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onLogin = async (values: AuthLoginPost) => {
        try {
            await authLoginPost(values);
            navigate('/');
        } catch (e) {
            console.error(e)
        }

    };
    const onSignup = async (values: AuthSignupPost) => {
        try {
            await authSignupPost(values);
            navigate('/');
        } catch (e) {
            console.error(e)
        }
    };
    return (
        <Flex justify='center' align='center' className={styles.layout}>
            <Card
                className={styles.card}
                title={isLogin ? 'Войти в аккаунт' : 'Зарегистрироваться'}
                extra={<Button onClick={() => setIsLogin(!isLogin)}>{!isLogin ? 'Вход' : 'Регистрация'}</Button>}
            >
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    labelAlign='left'
                    wrapperCol={{ span: 18 }}
                    onFinish={(isLogin ? onLogin : onSignup)}
                >
                    <Form.Item
                        label='Username'
                        name='username'
                        rules={[{ required: true, message: 'Введите имя пользователя' }]}
                    >
                        <Input />
                    </Form.Item>
                    {!isLogin && <Form.Item
                        label='Email'
                        name='email'
                        rules={[{required: true, message: 'Введите e-mail'}]}
                    >
                        <Input/>
                    </Form.Item>}
                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[{ required: true, message: 'Введите пароль' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form>
            </Card>
        </Flex>
    );
};