import {Link} from 'react-router-dom';

export default function Dashboard() {
    return (
        <>
            <header className="w-full bg-gray-800 text-white text-xl p-4 flex justify-center">
                <h1>Review Topics</h1>
            </header>
            <div className="m-6 p-6 grid grid-cols-3 gap-30 bg-gray-200">
                <div className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex 
                items-center justify-center h-[300px] w-[300px] text-lg 
                text-bold border border-none rounded-lg">
                    <Link to="/form" className='text-white hover:text-gray-900'>Form</Link>
                </div>

                <div className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex 
                items-center justify-center h-[300px] w-[300px] text-lg 
                text-bold border border-none rounded-lg">
                    <Link to="/apidata" className='text-white hover:text-gray-900'>API data</Link>
                </div>

                <div className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex 
                items-center justify-center h-[300px] w-[300px] text-lg 
                text-bold border border-none rounded-lg">
                    <Link to="/themetoggle" className='text-white hover:text-gray-900'>Theme Toggle</Link>
                </div>
            </div>
        </>
    )
}