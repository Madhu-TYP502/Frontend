import useAxiosPrivate from './useAxiosPrivate';
import useUserStore from './usersStore';

const FetchUsers = async () => {
  const addUsers = useUserStore((state)=> state.addUsers);
  const axiosPrivate = useAxiosPrivate();

  let response;
  const APIURL = "/admin-service/admin/get/all/users";
  try {
    response = await axiosPrivate.get(APIURL, {
    }); 
     addUsers(response.data);
     console.log(response.data);
  }
  catch (err) {
    console.error(err);
  }
}

export default FetchUsers;