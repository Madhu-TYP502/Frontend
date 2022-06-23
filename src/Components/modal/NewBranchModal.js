import { Button, Form, Input, Modal, Radio } from 'antd';
import { useState } from 'react';
import { Select } from 'antd';
import { PlusOutlined  } from '@ant-design/icons'
import { errorNotification, successNotification } from '../notifications/Notification';


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

    const [branchName, setBranch] = useState([]);

    const [branchType, setBranchType] = useState('');

    const onBranchTypeChange = (data) => {
        setBranchType(data.target.value);
    };

    const onBranchSelect = (branchSelected) => {
        console.log(`selected ${branchSelected}`);
        setBranch(branchSelected)
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
                        onCreate(values, branchName, branchType);
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
                    <Form.Item name="Branches" label="Branches">
                    <>
                        <Select
                            showSearch
                            placeholder="Select Branch"
                            optionFilterProp="children"
                            onSelect={onBranchSelect}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                            {children}
                        </Select>
                        <br />
                    </>
                </Form.Item>
                <Form.Item name="modifier" className="collection-create-form_last-form-item">
                    <Radio.Group onChange={onBranchTypeChange} branchType={branchType}>
                        <Radio value="Qspiders">Qspiders</Radio>
                        <Radio value="Jspiders">Jspiders</Radio>
                        <Radio value="Pyspiders">Pyspiders</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="branchManager"
                    label="Branch Manager"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter Branch Manager name!',
                        },
                    ]}
                >
                <Input />
                </Form.Item>
 
                <Form.Item
                    name="state"
                    label="State"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter State name!',
                        },
                    ]}
                >
                <Input />
                </Form.Item>


                <Form.Item
                    name="city"
                    label="City"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter City name!',
                        },
                    ]}
                >
                <Input />
                </Form.Item>

                <Form.Item name="contact" label="contact" rules={[
                    {
                        required: true,
                        message: 'Please enter phone number!',
                        max: 10,
                        min: 10,
                    },
                ]}>
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="supervisorID" label="Supervisor ID" >
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const NewBranchModal = ({ fetchBranches }) => {
    const branch = {
        branchName:"",
        type:"",
        branchManager:"",
        state:"",
        city:"",
        contact:"",
        supervisorID:""
    }
    const [visible, setVisible] = useState(false);

    const onCreate = (values, branchName, branchType) => {
        setVisible(false);
        branch.branchName = branchName;
        branch.type = branchType;
        branch.branchManager = values.branchManager;
        branch.state = values.state;
        branch.city = values.city;
        branch.contact = values.contact;
        branch.supervisorID = values.supervisorID;

        const branchJson = JSON.stringify(branch);

        console.log(branchJson);
        fetch("/admin-service/admin/create/branch",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: branchJson
            }
        ).then((response) => {
            if (response.ok) {
                successNotification("Branch added successfully", '');
                fetchBranches();
            }
            else {
                errorNotification("Error while adding Branch");
            }
        })
            .then((messages) => { console.log(messages); })
            .catch((error) => { console.log(error) });
    };

    return (
        <div>
            <br />
            <Button
                icon={<PlusOutlined/>}
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Add Branch
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

export default NewBranchModal;