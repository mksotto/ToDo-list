import {FC, useEffect, useState} from "react";
import {authLoginPost} from "../../api/auth/authLoginPost.ts";
import {authSignupPost} from "../../api/auth/authSignupPost.ts";
import {Button, Card, Flex, Form, Input} from "antd";
import styles from './AuthPage.module.css'
import {AuthLoginPost, AuthSignupPost} from "../../types/domain/todo-list.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {BASE_URL} from "../../constants/constants.ts";
import {useProfile} from "../../stores/ProfileStore.ts";

export const AuthPage: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();
    const {profile, logout} = useProfile();
    const [form] = Form.useForm();
    useEffect(() => {
        if (location.state?.logout && profile) {
            void logout();
            navigate(location.pathname, {replace: true})
        }
        if (location.state?.username) {
            form.setFieldValue('username', location.state.username);
            navigate(location.pathname, {replace: true})
        }
    }, [location.state]);
    const onLogin = async (values: AuthLoginPost) => {
        setIsLoading(true);
        authLoginPost(values)
            .then(() => navigate(BASE_URL))
            .catch(e => console.error(e))
            .finally(() => setIsLoading(false));
    };
    const onSignup = async (values: AuthSignupPost) =>
        authSignupPost(values).then(() => navigate(BASE_URL)).catch((e) => console.error(e));
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
                        <Input />
                    </Form.Item>}
                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[{ required: true, message: 'Введите пароль' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>Submit</Button>
                </Form>
            </Card>
        </Flex>
    );
};