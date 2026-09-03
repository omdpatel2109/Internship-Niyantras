import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormTable from './FormTable';
import { Link } from 'react-router-dom';

export type FormValues = {
    // index: number;
    firstName: string;
    lastName: string;
    email: string;
};


const validate = (values: FormValues) => {
    const errors: Partial<Record<keyof FormValues, string>> = {};
    if(!values.firstName) {
        errors.firstName = 'Required';
    }else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }
    if(!values.lastName) {
        errors.lastName = 'Required';
    }else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
    }

    if(!values.email) {
        errors.email = 'Required';
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

export default function Form() {
    const [details, setDetails] = React.useState<FormValues[]>([]);

    function addInTable(values: FormValues) {
        setDetails(details => [...details, values]);
    }

    function removeFromTable(index: number) {
        setDetails(details => details.filter((_, i) => i !== index));
    }

    const formik = useFormik({
        initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        },
        validationSchema: Yup.object({
        firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            addInTable(values);
            formik.resetForm();
        },
    });


    return (
        <>

            <form onSubmit={formik.handleSubmit} className="mx-auto mt-10 max-w-2xl px-4">
                <div className=" space-y-6 rounded-xl border border-gray-200 bg-white p-6 ">
                    <div>
                        <label htmlFor="firstName"
                        className="mb-2 text-lg text-gray-700"
                        >First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div className="mt-1 text-sm text-red-600">{formik.errors.firstName}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="lastName"
                        className="mb-2 text-lg text-gray-700"
                        >Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="mt-1 text-sm text-red-600">{formik.errors.lastName}</div>
                        ) : null}
                    </div>
                        
                    <div>
                        <label htmlFor="email"
                        className="mb-2 text-lg text-gray-700"
                        >Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="mt-1 text-sm text-red-600">{formik.errors.email}</div>
                        ) : null}
                    </div>
                        
                    <div>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium 
                            text-white transition hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
            <FormTable Details={details} />
        </>
    );
};


// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// function App() {
//   return (
//     <div className="p-10">
//       <Alert>
//         <AlertTitle>Success!</AlertTitle>
//         <AlertDescription>
//           Your operation was completed successfully.
//         </AlertDescription>
//       </Alert>
//     </div>
//   );
// }

// export default App;