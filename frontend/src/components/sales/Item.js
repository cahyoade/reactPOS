import plusIcon from '../../images/plusIcon.png'

function Item(props) {
    const formatter = new Intl.NumberFormat('id').format
    let itemData = {...props, count : 1}
    delete itemData.addProductToCart;

    return (
        <div className='flex w-full justify-between p-[10px] border-b-2 cursor-pointer' onClick={() => props.addProductToCart(itemData)}>
            <div>
                <p className='text-sm'>{props.name}</p>
                <p className='text-sm italic'>Rp{formatter(props.prices[0].price)}/{props.unit}</p>
            </div>
            <div className='flex items-center text-sm'>
                <p className='mr-[12px] italic'>{new Date(props.lastEdit).toLocaleDateString()}</p>
                <img src={plusIcon} alt='addIcon' />
            </div>
        </div>
    );
}

export default Item;