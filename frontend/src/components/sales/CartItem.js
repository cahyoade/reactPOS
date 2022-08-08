import delIcon from '../../images/delete.png';

function CartItem(props) {
    
    const formatter = new Intl.NumberFormat('id').format;
    let priceIndex;
    props.prices.forEach((i, idx) => {
        if(props.count >= i.min){
            priceIndex = idx;
        }
    })

    return ( 
        <div className='grid grid-cols-8 items-center w-full py-2 border-b-2'>
            <div className='pr-2 col-span-2'>
                <p>{props.name}</p>
                <p className='italic text-base'>Rp{formatter(props.prices[priceIndex].price)}</p>
            </div>
            <div className='flex justify-end px-4 col-span-3'>
                <input type="number" value={props.count} onChange={e => props.changeItemCount({name : props.name}, e.target.value === '' || e.target.value < 0 ? 0 : +e.target.value)} className='h-[30px] px-[10px] w-full self-center rounded-lg bg-neutral-100 border border-solid border-neutral-300'></input>
                <p className='italic text-base self-center ml-2'>{props.unit}</p>
            </div>
            <p className='justify-self-end col-span-2'>Rp{formatter(props.count * props.prices[priceIndex].price)}</p>
            <img src={delIcon} alt='delIcon' onClick={() => props.removeProductFromCart(props)} className='cursor-pointer justify-self-end'></img>
        </div>
    );
}

export default CartItem;