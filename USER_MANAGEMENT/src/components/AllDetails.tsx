import type {User} from '../type/userType';

interface Props {
    user: User[];
}

export default function AllDetails({ user }: Props) {
    return (
        <>
            heyyy {user[0]?.firstName}
        </>
    );
}