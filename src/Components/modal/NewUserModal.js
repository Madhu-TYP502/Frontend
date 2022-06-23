import { Button, Form, Input, Modal, Radio } from 'antd';
import { Select } from 'antd';
import { UserAddOutlined } from '@ant-design/icons'
import { errorNotification, successNotification } from '../notifications/Notification';
import { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useUserStore from '../../hooks/usersStore';




const { Option } = Select;
const children = [];


children.push(<Option key='Bengaluru - Basavanagudi'>{"Bengaluru - Basavanagudi"}</Option>);
children.push(<Option key='Bengaluru - Old Airport Road'>{"Bengaluru - Old Airport Road"}</Option>);
children.push(<Option key='Bengaluru - Rajajinagar'>{"Bengaluru - Rajajinagar"}</Option>);
children.push(<Option key='Bengaluru - Hebbal'>{"Bengaluru - Hebbal"}</Option>);
children.push(<Option key='Bengaluru - BTM Layout'>{"Bengaluru - BTM Layout"}</Option>);
children.push(<Option key='Mysore'>{"Mysore"}</Option>);
children.push(<Option key='Pune - Deccan Gymkhana'>{"Pune - Deccan Gymkhana"}</Option>);
children.push(<Option key='Pune - Hadapsar'>{"Pune - Hadapsar"}</Option>);
children.push(<Option key='Pune - Wakad'>{"Pune - Wakad"}</Option>);
children.push(<Option key='Mumbai - Andheri'>{"Mumbai - Andheri"}</Option>);
children.push(<Option key='Mumbai - Thane'>{"Mumbai - Thane"}</Option>);
children.push(<Option key='Navi - Mumbai'>{"Navi - Mumbai"}</Option>);
children.push(<Option key='Chennai - Vadapalani'>{"Chennai - Vadapalani"}</Option>);
children.push(<Option key='Chennai - Chromepet'>{"Chennai - Chromepet"}</Option>);
children.push(<Option key='Chennai - Velachery'>{"Chennai - Velachery"}</Option>);
children.push(<Option key='Hyderabad - KPHB'>{"Hyderabad - KPHB"}</Option>);
children.push(<Option key='Chandigarh'>{"Chandigarh"}</Option>);
children.push(<Option key='Gurugram'>{"Gurugram"}</Option>);
children.push(<Option key='Bhubaneswar'>{"Bhubaneswar"}</Option>);
children.push(<Option key='Noida'>{"Noida"}</Option>);
children.push(<Option key='ONLINE'>{"ONLINE"}</Option>);


const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {


    const [form] = Form.useForm();

    const [Branches, setBranches] = useState([]);

    const [value, setRole] = useState('');

    const handleChange = (data) => {
        setBranches(data);
    };

    const onChange = (data) => {
        console.log('radio checked', data.target.value);
        setRole(data.target.value);
    };



    return (
        <Modal
            visible={visible}
            title="Create a new user"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values, Branches, value);
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
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter name!',
                        },
                    ]}

                >
                    <Input />
                </Form.Item>
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
                <Form.Item name="Branches" label="Branches">
                    <>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select branch"
                            onChange={handleChange}>
                            {children}
                        </Select>
                        <br />
                    </>
                </Form.Item>
                <Form.Item name="modifier" className="collection-create-form_last-form-item">
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value="Admin">Admin</Radio>
                        <Radio value="Supervisor">Supervisor</Radio>
                        <Radio value="Trainer">Trainer</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const NewUserModal = () => {
    const axiosPrivate = useAxiosPrivate();
    const addUsers = useUserStore((state)=> state.addUsers);

    const user = {
        name: "",
        email: "",
        phone: "",
        role: "",
        branchesAssigned: []
    }
    const [visible, setVisible] = useState(false);

    const onCreate = (values, Branches, value) => {
        setVisible(false);
        user.name = values.name;
        user.email = values.email;
        user.phone = values.phone;
        user.role = value;
        user.branchesAssigned = Branches;

        const ADD_USER_API_URL = "/admin-service/admin/create/user";

        const addUser = async () => {
            try {
            const response = await axiosPrivate.post(ADD_USER_API_URL,
                JSON.stringify(user),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            successNotification("User added successfully",'');
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
            }
            catch (err) {
              console.error(err);
            }
          }
    };
    return (
        <div>
            <br />
            <Button
                icon={<UserAddOutlined />}
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
            Add User
            </Button>
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

export default NewUserModal;