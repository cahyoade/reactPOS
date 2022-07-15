import React, { useState } from 'react';
import Item from './Item';

function List(props) {
    const [keyword, setKeyword] = useState('');
    const pattern = new RegExp(`${keyword}`, 'i');
    let displayedItems = [...props.itemData].filter(item => item.name.match(pattern));

    return ( 
        <div className={`w-4/12 aspect-[10/15] p-6 rounded-xl shadow-xl border border-solid border-neutral-300 flex flex-col`}>
            <p className='mb-4 text-2xl'>Barang</p>
            <input placeholder='cari' className='w-full h-[40px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm mb-[12px]' onChange={e => setKeyword(e.target.value)}></input>
            <div className='overflow-y-scroll grow'>
                {displayedItems.map((item, index) => <Item key={index} addProductToCart={props.addProductToCart} {...item}/>)}
            </div>
        </div>
    );
}

export default List;