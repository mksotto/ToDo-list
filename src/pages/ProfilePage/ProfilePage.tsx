import {PageType} from "../../types/PageType.ts";
import {checkAuthRequired} from "../../modules/checkAuth.ts";
import styles from './ProfilePage.module.css';
import {Card, Flex, Form, Typography, Input} from "antd";
import {useProfile} from "../../stores/ProfileStore.ts";

const {Title, Paragraph} = Typography;

export const ProfilePage: PageType = () => {
    const {profile} = useProfile();
    if (!profile) return null;
    const [form] = Form.useForm();
    return (
        <Flex align='center' justify='center' className={styles.layout}>
            <Card className={styles.card}>
                <Form form={form}>
                    <Form.Item name='username'>
                        <Title level={2} editable={true}>
                            {profile.username}
                        </Title>
                    </Form.Item>
                    <Form.Item>
                        <Paragraph editable={true}>
                            {profile.email}
                        </Paragraph>
                    </Form.Item>
                    <Form.Item>

                        <Input.Password />
                    </Form.Item>

                    <div></div>
                    <div>{profile.email}</div>
                    <div>{profile.username}</div>
                </Form>
            </Card>
        </Flex>
    )
}

ProfilePage.loader = checkAuthRequired;