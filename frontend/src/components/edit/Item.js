import delIcon from '../../images/delete.png'

function Item(props) {
    const formatter = new Intl.NumberFormat('id').format
    let itemData = {...props, count : 1}
    delete itemData.startDeleteSequence;
    delete itemData.setActiveItem;

    return (
        <div className='flex w-full justify-between p-2 border-b-2 hover:bg-slate-200'>
            <div onClick={() => props.setActiveItem(itemData)} className='cursor-pointer'>
                <p className='text-sm'>{props.name}</p>
                <p className='text-sm italic'>Rp{formatter(props.prices[0].price)}/{props.unit}</p>
                <p className='text-sm italic'>Rp{formatter(props.prices[0].profit)}/{props.unit}</p>
            </div>
            <div className='flex items-center text-sm'>
                <p className='mr-3 italic'>{new Date(props.lastEdit).toLocaleDateString()}</p>
                <img src={delIcon} alt='delIcon' className='cursor-pointer' onClick={() => props.startDeleteSequence(itemData)}/>
            </div>
        </div>
    );
}

export default Item;