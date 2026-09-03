import Form from "./Form";
import type { FormValues } from "./Form";

export default function FormTableRow({ formValues }: { formValues: FormValues }) {
    return(
        <tr>
            <td className="border border-gray-300 px-4 py-2 text-center">{formValues.firstName}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{formValues.lastName}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{formValues.email}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
                <input type="checkbox" />
            </td>
        </tr>
    )
}