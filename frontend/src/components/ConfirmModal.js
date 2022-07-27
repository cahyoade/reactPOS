function ConfirmModal(props) {
    return (
        <div className="w-[100vw] h-[100vh] top-0 left-0 bg-black/30 fixed z-10">
            <div className="z-20 fixed top-[39vh] left-[42%] h-36 w-72 flex flex-col justify-center rounded-lg items-center bg-white">
                <p className="mb-6">{props.text}</p>
                <div className="text-white">
                    <button className="h-7 w-24 rounded-md cursor-pointer bg-gray-400 mr-4" onClick={() => props.negative()}>{props.negativeText}</button>
                    <button className={`h-7 w-24 rounded-md cursor-pointer ${props.delete ? 'bg-mainRed' : 'bg-mainBlue'}`} onClick={() => props.positive()}>{props.positiveText}</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;