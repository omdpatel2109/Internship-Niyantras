import type { FormValues } from "./Form";

interface FormTableRowProps {
    formValues: FormValues;
    isSelected: boolean;
    onSelect: () => void;
}

export default function FormTableRow({ formValues, isSelected, onSelect }: FormTableRowProps) {
    return(
        <tr>
            <td className="border border-gray-300 px-4 py-2 text-center">{formValues.firstName}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{formValues.lastName}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{formValues.email}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
                <input type="checkbox"  checked={isSelected} onChange={onSelect}/>
            </td>
        </tr>
    )
}