import { Button, Form, Input, Modal, Radio, Tooltip } from 'antd';
import { DeleteOutlined} from '@ant-design/icons'
import { errorNotification, successNotification } from '../notifications/Notification';
import { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useUserStore from '../../hooks/usersStore';


const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {

    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            title="DELETE USER"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item name="phone" label="Phone" rules={[
                    {
                        required: true,
                        message: 'Please enter phone number!',
                        max: 10,
                        min: 10,
                    },
                ]}>
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[
                    {
                        required: true,
                        message: 'Please enter email!',
                        type: 'email'
                    },
                ]}>
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const DeleteUserModal = () => {
    const axiosPrivate = useAxiosPrivate();
    const addUsers = useUserStore((state)=> state.addUsers);

    const user = {
        email: "",
        password: "",
    }
    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
        setVisible(false);
        user.email = values.email;
        user.password = values.phone;

        console.log(user);

        const ADD_USER_API_URL = "/admin-service/admin/delete/user";

        const addUser = async () => {
            try {
            const response = await axiosPrivate.delete(ADD_USER_API_URL,
                JSON.stringify(user),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(response);
            fetchUsers();
            }
            catch (err) {
                if (!err?.response) {
                    errorNotification("Error while adding User");
                    console.error(err);
                }
            }
        };
        addUser();

        const fetchUsers = async () => {
            let response;
              const APIURL = "/admin-service/admin/get/all/users";
            try {
              response = await axiosPrivate.get(APIURL, {
              }); 
               addUsers(response.data);
               successNotification("User Deleted successfully",'');
            }
            catch (err) {
              console.error(err);
            }
          }
    };
    return (
        <div>
            <br />
            <Tooltip title='DELETE USER'>
            <Button
                icon={<DeleteOutlined/>}
                type="primary"
                danger
                onClick={() => {
                    setVisible(true);
                }}>
            </Button>
            </Tooltip>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default DeleteUserModal;