import {FC} from "react";
import {Typography, App} from "antd";
import {usersExistsPost} from "../../../api/users/usersExistsPost.ts";
import {useProfile} from "../../../stores/ProfileStore.ts";

type Props = {
    username?: string;
    setUsername: (username: string) => void;
};

export const Username: FC<Props> = ({username, setUsername}) => {
    const {profile} = useProfile();
    const {message} = App.useApp();
    const onChange = async (v: string) => {
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
        <Typography.Title
            level={2}
            editable={{onChange}}
        >
            {username}
        </Typography.Title>
    )
}