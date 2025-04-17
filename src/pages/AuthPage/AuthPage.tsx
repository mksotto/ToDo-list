import {FC, useEffect, useState} from "react";
import {authLoginPost} from "../../api/auth/authLoginPost.ts";
import {authSignupPost} from "../../api/auth/authSignupPost.ts";
import {App, Button, Card, Flex, Form, Input} from "antd";
import styles from './AuthPage.module.css'
import {AuthLoginPost, AuthSignupPost} from "../../types/domain/todo-list.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {BASE_URL} from "../../constants/constants.ts";
import {useProfile} from "../../stores/ProfileStore.ts";
import {isBadRequestError} from "../../errors/BadRequestError.ts";
import {usersExistsPost} from "../../api/users/usersExistsPost.ts";
import {isConflictError} from "../../errors/ConflictError.ts";

export const AuthPage: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {message} = App.useApp();
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
        try {
            setIsLoading(true);
            await authLoginPost(values);
            navigate(BASE_URL);
        } catch (e) {
            if (isBadRequestError(e) && e.reason === 'InvalidUsername') {
                return message.open({
                    type: 'error',
                    content: 'User with that username does not exist!'
                });
            }
            if (isBadRequestError(e) && e.reason === 'InvalidPassword') {
                return message.open({
                    type: 'error',
                    content: 'Incorrect password!'
                });
            }
            console.error(e);
            return message.open({
                type: 'error',
                content: 'Something went wrong!'
            });
        } finally {
            form.resetFields();
            setIsLoading(false);
        }
    };
    const onSignup = async (values: AuthSignupPost) => {
        try {
            setIsLoading(true);
            await authSignupPost(values);
            navigate(BASE_URL);
        } catch (e) {
            if (isConflictError(e) && e.reason === 'EmailExists') {
                return message.open({
                    type: 'error',
                    content: 'E-mail already exists!'
                });
            }
            console.error(e);
            return message.open({
                type: 'error',
                content: 'Something went wrong!'
            });
        } finally {
            form.resetFields();
            setIsLoading(false);
        }
    }
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
                        validateDebounce={500}
                        rules={[
                            { required: true, message: 'Введите имя пользователя' },
                            (!isLogin ? () => ({
                                async validator(_, v) {
                                    const r = await usersExistsPost({username: v})
                                    if (r.exists) {
                                        return Promise.reject('Username already exists!');
                                    }
                                    return Promise.resolve();
                                }
                            }) : {}),
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {!isLogin && <Form.Item
                        label='Email'
                        name='email'
                        validateDebounce={500}
                        rules={[
                            {required: true, message: 'Введите e-mail'},
                            {type: 'email', message: 'Invalid e-mail'}
                        ]}
                    >
                        <Input />
                    </Form.Item>}
                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {required: true, message: 'Введите пароль'},
                            (!isLogin ? {min: 8, message: 'Password must contain at least 8 characters'} : {}),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>Submit</Button>
                </Form>
            </Card>
        </Flex>
    );
};