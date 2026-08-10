import { useNavigate } from 'react-router-dom';
import type { User } from '../type/userType';

interface Props  {
    user: User,
}

export default function UserListRow({user}: Props ){

    const navigate = useNavigate();

    return(
        <>
            <tr className="even:bg-gray-100 hover:bg-gray-300 clickable-row"
            onClick={() => navigate(`/AllDetails/${user.id}`)}
            >

                <td className="border-l border-b border-gray-400 p-[10px] text-left">
                        <img
                            alt={user.firstName}
                            src={user.image}
                            width={50}
                            height={50}
                        />
                </td>

                <td className="border-b border-gray-400 p-[10px] text-left">
                        {`${user.firstName} ${user.lastName}`}
                </td>

                <td className="border-b border-gray-400 p-[10px] text-left">
                        {user.age}
                </td>
                
                <td className="border-b border-gray-400 p-[10px] text-left">
                        {user.gender}
                </td>

                <td className="border-b border-gray-400 p-[10px] text-left">
                        {user.email}
                </td>

                <td className="border-r border-b border-gray-400 p-[10px] text-left">
                        {user.role}
                </td>
            </tr>
        </>
    )
}