import delIcon from '../../images/delete.png'

function Form(props) {
    return ( 
        <div className='w-7/12 ml-[46px] grow p-6 rounded-xl shadow-xl border border-solid border-neutral-300 grid grid-cols-2 gap-8'>
            <div>
                <p className='mb-4 text-2xl'>{props.item._id ? 'Edit Data' : 'Tambah' } Barang</p>
                <input value={props.item.name} placeholder='nama' name='name' onChange={props.handleItemChange} className='w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm mb-3'></input>
                <input value={props.item.unit} placeholder='satuan' name='unit' onChange={props.handleItemChange} className='w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm mb-3'></input>
                {props.item.prices.map((price, index) => {return (
                    <div className='flex items-center mb-3' key={index}>
                        <input type='number' placeholder='harga' name='price' value={price.price} onChange={e => props.handlePricesChange(e, index)} className='mr-2 w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm '></input>
                        <input type='number' placeholder='untung' name='profit' value={price.profit} onChange={e => props.handlePricesChange(e, index)} className='mr-2 w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm '></input>
                        <input type='number' placeholder='min' name='min' value={price.min} onChange={e => props.handlePricesChange(e, index)} className={`${index > 0 && 'mr-2'} w-16 h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm`}></input>
                        {index > 0 && <img src={delIcon} onClick={e => props.delPrice(index)} alt="deletePrice"/>}
                    </div>
                )})}
                <div className='flex justify-end'>
                    <button className='rounded-md px-2 py-1 shadow-md mr-3 bg-neutral-100 text-sm' onClick={e => props.addPrice()}>Tambah Harga</button>
                    <button className='rounded-md px-2 py-1 shadow-md mr-3 bg-mainRed text-white text-sm' onClick={() => props.resetItem()}>Cancel</button>
                    <button className='rounded-md px-2 py-1 shadow-md bg-mainBlue text-white text-sm' onClick={() => props.item._id === undefined ?  props.insertData('item') : props.editData('item')}>{props.item._id ? 'simpan' : 'buat barang'}</button>
                </div>
            </div>
            <div>
                <p className='text-2xl mb-4'>{props.user._id ? 'Edit Data' : 'Tambah' } Member</p>
                <input placeholder='nama' value={props.user.name} onChange={props.handleUserChange} name='name' className='w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm mb-[12px]'></input>
                <input type='number' placeholder='point' value={props.user.points} onChange={props.handleUserChange} name='points' className='w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm mb-[12px]'></input>
                <input placeholder='no. telp' value={props.user.phone} onChange={props.handleUserChange} name='phone' className='w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm mb-[12px]'></input>
                <div className='flex justify-end'>
                    <button className='rounded-md px-2 py-1 shadow-md mr-3 bg-mainRed text-white text-sm' onClick={() => props.resetUser()}>Cancel</button>
                    <button className='rounded-md px-2 py-1 shadow-md bg-mainBlue text-white text-sm' onClick={() => props.user._id === undefined ? props.insertData('user') : props.editData('user')}>{props.user._id ? 'simpan' : 'buat member'}</button>
                </div>
            </div>
        </div>
    );
}

export default Form;