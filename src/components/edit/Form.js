import PreviousMap from 'postcss/lib/previous-map';
import delIcon from '../../images/delete.png'
function Form(props) {
    return ( 
        <div className='w-7/12 ml-[46px] grow p-6 rounded-xl shadow-xl border border-solid border-neutral-300 grid grid-cols-2 gap-8'>
            <div>
                <p className='mb-4 text-2xl'>{props.item.id === '' ? 'Tambah' : 'Edit Data'} Barang</p>
                <input value={props.item.name} placeholder='nama' name='name' onChange={props.handleItemChange} className='w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm mb-3'></input>
                <input value={props.item.unit} placeholder='satuan' name='unit' onChange={props.handleItemChange} className='w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm mb-3'></input>
                <div className='flex items-center mb-3'>
                    <input placeholder='harga' className='mr-2 w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm '></input>
                    <input placeholder='untung' className='mr-2 w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm '></input>
                    <input placeholder='min' className='mr-2 w-16 h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm '></input>
                    <img src={delIcon} alt="deletePrice" />
                </div>
                <div className='flex justify-end'>
                    <button className='rounded-md px-2 py-1 shadow-md mr-3 bg-neutral-100'>Tambah Harga</button>
                    <button className='rounded-md px-2 py-1 shadow-md mr-3 bg-mainRed text-white' onClick={() => props.resetItem()}>Cancel</button>
                    <button className='rounded-md px-2 py-1 shadow-md bg-mainBlue text-white'>{props.item.id === '' ? 'buat barang' : 'simpan'}</button>
                </div>
            </div>
            <div>
                <p className='text-2xl mb-4'>{props.user.id === '' ? 'Tambah' : 'Edit Data'} Member</p>
                <input placeholder='nama' value={props.user.name} onChange={props.handleUserChange} name='name' className='w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm mb-[12px]'></input>
                <input placeholder='point' value={props.user.points} onChange={props.handleUserChange} name='points' className='w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm mb-[12px]'></input>
                <input placeholder='no. telp' value={props.user.phone} onChange={props.handleUserChange} name='phone' className='w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm mb-[12px]'></input>
                <div className='flex justify-end'>
                    <button className='rounded-md px-2 py-1 shadow-md mr-3 bg-mainRed text-white' onClick={() => props.resetUser()}>Cancel</button>
                    <button className='rounded-md px-2 py-1 shadow-md bg-mainBlue text-white'>{props.user.id === '' ? 'buat member' : 'simpan'}</button>
                </div>
            </div>
        </div>
    );
}

export default Form;