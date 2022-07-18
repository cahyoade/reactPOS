function Summary(props) {
    const formatter = new Intl.NumberFormat('id');
    return ( 
        <div className={`w-full  p-4 rounded-xl shadow-md border border-solid border-neutral-200 flex flex-col`}>
            <p className='mb-3 pb-1 text-lg'>Ringkasan</p>
            <div className="flex justify-between items-center italic mb-1">
                <p>Member</p>
                <p className="font-bold">{props.user.name}</p>
            </div>
            <div className="flex justify-between items-center italic mb-1">
                <p>Poin Tambahan</p>
                <p>{props.pointsAdded}</p>
            </div>
            <div className="flex justify-between items-center italic mb-1">
                <p>Pembayaran</p>
                <select value={props.payment} onChange={e => props.setPayment(e.target.value)} className="p-1">
                    <option value="cash">Cash</option>
                    <option value="poin">Poin</option>
                </select>
            </div>
            {
            props.payment === 'cash' ? 
                <>
                <div className="flex justify-between items-center mb-1">
                    <p>Total</p>
                    <p>Rp{formatter.format(props.total)}</p>
                </div> 
                <div className="flex justify-between items-center mb-1">
                    <p>Uang</p>
                    <input type="number" onChange={(e) => props.setCash(+e.target.value)} className='h-[30px] px-[10px] w-6/12 self-center rounded-lg bg-neutral-100 border border-solid border-neutral-300' value={props.cash}></input>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <p>Kembalian</p>
                    <p className={`text-green-600 ${props.change < 0 && 'text-red-600'}`}>Rp{formatter.format(props.change)}</p>
                </div>
                </>
                :
                <>
                <div className="flex justify-between items-center mb-1">
                    <p>Total</p>
                    <p>{formatter.format(props.total)} poin</p>
                </div>
                <div className="flex justify-between items-center mb-1">
                    <p>Poin</p>
                    <p>{formatter.format(props.user.points)} poin</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <p>Sisa poin</p>
                    <p className={`text-green-600 ${props.change < 0 && 'text-red-600'}`}>{formatter.format(props.change)} poin</p>
                </div>
                </>
            }
            <button className="h-8 bg-mainBlue rounded-md text-white" onClick={() => props.createTransaction()}>Buat Transaksi</button>
        </div>
     );
}

export default Summary;