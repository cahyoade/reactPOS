import React, { useState } from 'react';
import Item from './Item';
import User from './User';

function ItemAndMemberList(props) {
    const [keyword, setKeyword] = useState('');
    const pattern = new RegExp(`${keyword}`, 'i');
    let displayedItems = [...props.data].filter(item => item.name.match(pattern));

    return ( 
        <div className={`w-4/12 h-[620px] p-6 rounded-xl shadow-xl border border-solid border-neutral-300 flex flex-col`}>
            <p className='mb-4 text-2xl'>Barang/Member</p>
            <input placeholder='cari' className='w-full h-10 px-3 rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm mb-3' onChange={e => setKeyword(e.target.value)}></input>
            <div className='overflow-y-scroll grow'>
                {displayedItems.map((x, id) => {
                    return x.prices ? <Item {...x} setActiveItem={props.setActiveItem} key={id} startDeleteSequence={props.startDeleteSequence}/> : <User {...x} key={id} setActiveUser={props.setActiveUser} startDeleteSequence={props.startDeleteSequence}/>
                })}
            </div>
        </div>
    );
}

export default ItemAndMemberList;