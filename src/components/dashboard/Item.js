function Item(props) {

    const formatter = new Intl.NumberFormat('id').format;
    let priceIndex;
    props.prices.forEach((i, idx) => {
        if(props.count >= i.min){
            priceIndex = idx;
        }
    })

    return ( 
        <div className='grid grid-cols-3 items-center w-full max-2-[400px] py-2 border-b-2'>
        <div>
            <p>{props.name}</p>
            <p className='italic text-base'>Rp{formatter(props.prices[priceIndex].price)}</p>
        </div>
        <p className='italic text-base self-center ml-2'>{props.count} {props.unit}</p>
        <p className='justify-self-end'>Rp{formatter(props.count * props.prices[priceIndex].price)}</p>
        </div>
    );
}

export default Item;