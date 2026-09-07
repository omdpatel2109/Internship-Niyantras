import FormTableRow from "./FormTableRow";
import type { FormValues } from "./Form";

interface FormTableProps {
    Details: FormValues[];
    selectedUsers: number[];
    selectUser: (index: number) => void;
}

export default function FormTable({ Details, selectedUsers, selectUser }: FormTableProps) {
    return(
        <>
            <table className="w-3/4 mx-auto border-collapse border border-gray-300 mt-10">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">First Name</th>
                        <th className="border border-gray-300 px-4 py-2">Last Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Select</th >
                    </tr>
                </thead>
                <tbody>
                    {Details.map((detail, index) => (
                        <FormTableRow key={index} formValues={detail} 
                        isSelected={selectedUsers.includes(index)} 
                        onSelect={() => selectUser(index)}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}