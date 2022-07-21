import React, { useState } from 'react';
import User from './User';

function List(props) {
    
    const [keyword, setKeyword] = useState('');
    const pattern = new RegExp(`${keyword}`, 'i');
    let displayedItems = [...props.userData].filter(item => item.name.match(pattern));

    return ( 
        <div className={`w-full grow max-h-[240px] p-3 rounded-xl shadow-md border border-solid border-neutral-200 flex flex-col mb-6`}>
            <p className='mb-3 text-lg'>{props.title}</p>
            <input placeholder='cari' className='w-full h-auto min-h-[30px] px-[10px] rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm mb-[12px]' onChange={e => setKeyword(e.target.value)}></input>
            <div className='overflow-y-scroll grow'>
            {displayedItems.map((x, idx) => <User active={x.name === props.activeUser ? true : false} setUser={props.setUser} {...x} key={idx} />)}
            </div>
        </div>
    );
}

export default List;