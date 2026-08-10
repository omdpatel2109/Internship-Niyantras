interface Props{
    children: React.ReactNode,
}

function TableHeader({children}: Props){
    return(
        <>
            <th className="border-b border-t border-l border-gray-400 p-[12px] text-left bg-gray-100 text-black">
                {children}
            </th>
        </>    
    )        
}

function TableRow({children}: Props){
    return(
        <>
            <td className="border-b border-gray-400 p-[10px] text-left">
                {children}
            </td>
        </>
    )
}

export {TableHeader, TableRow};