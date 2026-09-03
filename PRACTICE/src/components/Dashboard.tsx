import {Link} from 'react-router-dom';

export default function Dashboard() {
    return (
        <>
            <header className="w-full bg-gray-800 text-white text-xl p-4 flex justify-center">
                <h1>Review Topics</h1>
            </header>
            <div className="m-6 p-6 grid grid-cols-4 gap-4 bg-gray-200">
                <div className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex 
                items-center justify-center h-[200px] w-[200px] text-lg 
                text-bold border border-none rounded-lg">
                    <Link to="/form" className='text-white hover:text-gray-900'>Form</Link>
                </div>
            </div>
        </>
    )
}