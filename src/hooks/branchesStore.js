import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Select } from 'antd';

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


const branchesStore = (set) => ({
    branches:[],

    addBranches : () =>{
        set((state)=>({
            branches: state.branches = children
        }))
    },

})
    const useBranchesStore = create(
        devtools(
            persist(branchesStore,{
                name : "branches",
            })
        )
    )
    
    export default useBranchesStore;