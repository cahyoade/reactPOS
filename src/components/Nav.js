function Nav(props){
    return(
        <nav className="w-screen h-20 px-16 flex items-end justify-between">
            <p className="text-2xl mb-[8px]">reactPOS</p>
            <div className="w-[480px] flex items-center justify-between">
                <button onClick={() => props.changeMode('edit')} className={`text text-base h-[40px] w-[150px] rounded-xl drop-shadow-lg border border-solid border-neutral-300 ${props.active === "edit" ? "text-white bg-mainBlue" : ""}`}>Edit Data</button>
                <button onClick={() => props.changeMode('dashboard')} className={`text text-base h-[40px] w-[150px] rounded-xl drop-shadow-lg border border-solid border-neutral-300 ${props.active === "dashboard" ? "text-white bg-mainBlue" : ""}`}>Dashboard</button>
                <button onClick={() => props.changeMode('sales')} className={`text text-base h-[40px] w-[150px] rounded-xl drop-shadow-lg border border-solid border-neutral-300 ${props.active === "sales" ? "text-white bg-mainBlue" : ""}`}>Point of Sales</button>
            </div>
        </nav>
    )
}

export default Nav;