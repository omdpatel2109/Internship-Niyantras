import FormTableRow from "./FormTableRow";

export default function FormTable({ Details }: { Details: any[] }) {
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
                        <FormTableRow key={index} formValues={detail} />
                    ))}
                </tbody>
            </table>
        </>
    )
}