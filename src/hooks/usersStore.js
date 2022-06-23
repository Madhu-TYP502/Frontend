import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const usersStore = (set) => (
    {
        users:[],
        addUser : (user)=>{
            set((state)=>({
                users:[user,...state.users],
            }))
        },
        removeUser : (id) =>{
            set((state)=>({
                users: state.users.filter((user)=> user.id !== id)
            }))
        },
        addUsers : (apiUsers) =>{
            set((state)=>({
                users: state.users = apiUsers
            }))
        },
    })

    const useUserStore = create(
        devtools(
            persist(usersStore,{
                name : "users",
            })
        )
    )
    
    export default useUserStore;