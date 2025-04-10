import {PageType} from "../../types/PageType.ts";
import {checkAuthRequired} from "../../modules/checkAuth.ts";
import styles from './ProfilePage.module.css';
import {Card, Flex, Form, Typography, Input, Button, FormProps, App} from "antd";
import {useProfile} from "../../stores/ProfileStore.ts";
import {authPatch} from "../../api/auth/authPatch.ts";
import {getNewOrUndefined} from "../../utils/getNewOrUndefined.ts";
import {authGet} from "../../api/auth/authGet.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AUTH_BASE_URL} from "../../constants/constants.ts";
import {usersExistsPost} from "../../api/users/usersExistsPost.ts";

type EditUserFormType = {
    password: string;
    new_password?: string;
    repeat_new_password?: string;
};

const {Title, Paragraph} = Typography;

export const ProfilePage: PageType = () => {
    const navigate = useNavigate();
    const {profile, setProfile} = useProfile();
    const [form] = Form.useForm();
    const {message} = App.useApp();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string | undefined>(profile?.username);
    useEffect(() => setUsername(profile?.username), [profile]);
    const onFinish: FormProps<EditUserFormType>['onFinish'] = async (values) => {
        const {password, new_password} = values;
        const newUser = {
            username: getNewOrUndefined(profile?.username, username),
            password,
            new_password: !new_password ? undefined : new_password,
        };
        if (!newUser.username && !newUser.new_password) return null;
        try {
            setIsLoading(true);
            await authPatch(newUser);
            if (new_password) {
                return navigate(AUTH_BASE_URL, {state: {logout: true, username: username}});
            }
            return authGet().then((r) => setProfile(r));
        } catch (e) {
            console.error(e);
        } finally {
            authGet().then((r) => setProfile(r))
            setIsLoading(false);
        }
    };
    const onEditUsername = async (v: string) => {
        if (v === profile?.username) return;
        try {
            const r = await usersExistsPost({username: v});
            if (r.exists) return message.open({
                type: 'error',
                content: 'This username already exists!'
            });
            return setUsername(v);
        } catch (e) {
            console.error(e);
            return message.open({
                type: 'error',
                content: 'Something went wrong!'
            });
        }
    };
    return (
        <Flex align='center' justify='center' className={styles.layout}>
            <Card className={styles.card}>
                <Title
                    level={2}
                    editable={{onChange: onEditUsername}}
                >
                    {username}
                </Title>
                <Paragraph>
                    {profile?.email}
                </Paragraph>
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='password'
                        label='Current password'
                        className={styles.passwordItem}
                        rules={[
                            {required: true, message: 'Enter your current password'}
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item name='new_password' label='New password' className={styles.passwordItem}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        name='repeat_new_password'
                        label='Confirm new password'
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (getFieldValue('new_password') && !value) {
                                        return Promise.reject(new Error('Confirm new password!'));
                                    }
                                    if (!value || getFieldValue('new_password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Flex justify='end'>
                        <Button type="primary" htmlType="submit" loading={isLoading}>Edit</Button>
                    </Flex>
                </Form>
            </Card>
        </Flex>
    )
}

ProfilePage.loader = checkAuthRequired;