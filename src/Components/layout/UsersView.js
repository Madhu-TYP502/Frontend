import { Badge, Empty, Table, Tag, Button, Form, Input, Modal, Radio, Select, Space } from 'antd';
import { useEffect, useState } from 'react'
import NewUserModal from '../modal/NewUserModal';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useUserStore from '../../hooks/usersStore';
import DeleteUserModal from '../modal/DeleteUserModal';
import UpdateUserModal from '../modal/UpdateUserModal';


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

const EditUserModal = ({ visible, onCreate, onCancel }) => {
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
      title={"EDIT USER DETAILS"}
      okText="Save change.."
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
        <Form.Item name="phone"
          label="Phone"
          rules={[
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
              onChange={handleChange}
              placeholder="Please select branches">
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

      <Button key="back">
        Return
      </Button>,
      <Button key="submit" type="primary">
        Submit
      </Button>

    </Modal>
  );
};

const UsersView = () => {

  const APIURL = "/admin-service/admin/get/all/users";
  const addUsers = useUserStore((state) => state.addUsers);
  const users = useUserStore((state) => ({ users: state.users }))

  const axiosPrivate = useAxiosPrivate();

  let fetchUsers = null;
  useEffect(() => {
    const controller = new AbortController();
    let response;
    fetchUsers = async () => {
      try {
        response = await axiosPrivate.get(APIURL, {
          signal: controller.signal
        });
        addUsers(response.data);
      }
      catch (err) {
        console.error(err);
      }
    }

    fetchUsers();

    return () => {
      controller.abort();
    }
  }, []);

  const handleEdit = () => {
    console.log("Edit Clicked");
  }

  const handleDelete = () => {
    console.log("Delet Clicked");
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: name => <h4>{name}</h4>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Branches Assigned',
      dataIndex: 'branchesAssigned',
      key: 'branchesAssigned',
      render: (_, { branchesAssigned }) => (
        <>
          {branchesAssigned.map(branch => {
            return (
              <Tag key={branch}>
                {branch.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'LastLogin',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
    {
      title: 'EDIT / DELETE',
      dataIndex: 'edituser',
      key: 'edituser',
      render: () => 
      <Space>
      <UpdateUserModal/>
      <DeleteUserModal/>
      </Space>
    },
  ];

  const UserTable = () => {
    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
      console.log('Received values of form: ', values);
      setVisible(false);
    };

    return <>
      <Table dataSource={users.users} columns={columns}
        bordered
        title={() =>
          <>
            <Tag>Total users</Tag>
            <Badge count={users.users.length} size='default' />
              <NewUserModal/>
          </>}
        pagination={{ pageSize: 15 }}
        rowKey={(user) => user.id}
      />;
    </>
  }
  if (users.users.length <= 0) {
    return <Empty />
  }
  return <UserTable />;
};

export default UsersView;




