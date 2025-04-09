import {PageType} from "../../types/PageType.ts";
import {checkAuthRequired} from "../../modules/checkAuth.ts";
import styles from './ProfilePage.module.css';
import {Card, Flex, Form, Typography, Input, Button, FormProps} from "antd";
import {useProfile} from "../../stores/ProfileStore.ts";
import {authPatch} from "../../api/auth/authPatch.ts";
import {getNewOrUndefined} from "../../utils/getNewOrUndefined.ts";
import {authGet} from "../../api/auth/authGet.ts";
import {useState} from "react";

type EditUserFormType = {
    password: string;
    new_password?: string;
    repeat_new_password?: string;
};

const {Title, Paragraph} = Typography;

export const ProfilePage: PageType = () => {
    const {profile, setProfile} = useProfile();
    const [form] = Form.useForm();
    if (!profile) return null;
    const [username, setUsername] = useState<string>(profile.username);
    const onFinish: FormProps<EditUserFormType>['onFinish'] = (values) => {
        const {password, new_password} = values;
        const newUser = {
            username: getNewOrUndefined(profile.username, username),
            password,
            new_password: !new_password ? undefined : new_password,
        };
        authPatch(newUser).then(() => authGet()).then((r) => setProfile(r));
    }
    return (
        <Flex align='center' justify='center' className={styles.layout}>
            <Card className={styles.card}>
                <Title level={2} editable={{
                    onChange: (v) => setUsername(v),
                }}>
                    {username}
                </Title>
                <Paragraph>
                    {profile.email}
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
                        <Button type="primary" htmlType="submit">Edit</Button>
                    </Flex>
                </Form>
            </Card>
        </Flex>
    )
}

ProfilePage.loader = checkAuthRequired;