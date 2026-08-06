import type { User } from '../type/UserType';

interface Props  {
    user: User,
}

export default function UserLisrRow({user}: Props ){
    return(
        <>
            <tr className="even:bg-[#f9f9f9] hover:bg-[#eef7ff]">

                <td className="border-l border-b border-gray-400 p-[12px] text-left">
                    <img
                        alt={user.firstName}
                        src={user.image}
                        width={50}
                        height={50}
                    />
                </td>

                <td className="border-b border-gray-400 p-[12px] text-left">
                    {`${user.firstName} ${user.lastName}`}
                </td>

                <td className="border-b border-gray-400 p-[12px] text-left">
                    {user.age}
                </td>

                <td className="border-b border-gray-400 p-[12px] text-left">
                    {user.gender}
                </td>

                <td className="border-b border-gray-400 p-[12px] text-left">
                    {user.email}
                </td>

                <td className="border-r border-b border-gray-400 p-[12px] text-left">
                    {user.role}
                </td>

            </tr>
        </>
    )
}