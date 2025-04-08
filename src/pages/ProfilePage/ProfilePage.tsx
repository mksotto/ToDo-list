import {PageType} from "../../types/PageType.ts";
import {checkAuthRequired} from "../../modules/checkAuth.ts";
import styles from './ProfilePage.module.css';
import {Card, Flex, Form, Typography, Input} from "antd";
import {useProfile} from "../../stores/ProfileStore.ts";
import {AuthPatch} from "../../types/domain/todo-list.ts";

type EditProfileFormType = AuthPatch & {
    repeat_new_password?: string;
};

const {Title, Paragraph} = Typography;

export const ProfilePage: PageType = () => {
    const {profile} = useProfile();
    if (!profile) return null;
    const [form] = Form.useForm();
    return (
        <Flex align='center' justify='center' className={styles.layout}>
            <Card className={styles.card}>
                <Form<EditProfileFormType>
                    form={form}
                    layout='vertical'
                >
                    <Form.Item name='username' noStyle>
                        <Title level={2} editable={true}>
                            {profile.username}
                        </Title>
                    </Form.Item>
                    <Paragraph>
                        {profile.email}
                    </Paragraph>
                    <Form.Item name='password' label='Current password' required={true} className={styles.passwordItem}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item name='new_password' label='New password' className={styles.passwordItem}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item name='repeat_new_password' label='Confirm new password' className={styles.passwordItem}>
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    )
}

ProfilePage.loader = checkAuthRequired;