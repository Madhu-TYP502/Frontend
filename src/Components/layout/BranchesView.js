import { Badge, Empty ,Table, Tag} from 'antd';
import { useState, useEffect } from 'react'
import NewBranchModal from '../modal/NewBranchModal';

const BranchesView = () => {

    const [branches, setBranches] = useState([]);

    const fetchBranches = () => {
        fetch("/admin-service/admin/view/all/branches")
        .then(response =>{
          return response.json();
        })
        .then(data => {
          setBranches(data);
        })
    }

    useEffect(() => {
      fetchBranches();
    }, []);

    if (branches.length <= 0) {
        return <Empty />
    }
    return <BranchesTable branches={branches} fun={fetchBranches()} />;
};

export default BranchesView;


const columns = [
    {
      title: 'Branch Name',
      dataIndex: 'branchName',
      key: 'branchName',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Branch Manager',
      dataIndex: 'branchManager',
      key: 'branchManager',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Supervisor ID',
      dataIndex: 'supervisorID',
      key: 'supervisorID',
    }

  ];
  
  const BranchesTable = ({branches},{fetchBranches}) => {
    return <>
            <Table dataSource={branches} columns={columns}
            bordered
            title={() => 
            <>
            <Tag>Total Branches</Tag>
            <Badge count={branches.length} size='default' />
            <NewBranchModal fun = {fetchBranches}/>
            </>}
            pagination={{ pageSize: 50 }} 
            rowKey = {(branch) => branch.id}/>;
            </>
  }