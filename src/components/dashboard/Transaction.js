import arrowDownIcon from '../../images/arrowDown.png'
import React, { useState } from 'react';
import Item from './Item';

function Transaction(props) {
    let formatter = new Intl.NumberFormat('id').format;
    const [showItems, setShowItems] = useState(false);
    let productsText = props.products.map(product => product.name).join(', ')

    return (
        <div className='shadow-lg rounded-xl w-full p-6 mb-4 border-[1px] '>
            <div className="grid grid-cols-6 items-center">
                <p>{props.user.name}</p>
                <p>Rp{formatter(props.total)}</p>
                <p>Rp{formatter(props.profit)}</p>
                <p className='truncate mr-8'>{productsText}</p>
                <p>{new Date(props.date).toLocaleString('fr')}</p>
                <img onClick={() => setShowItems(prev => !prev)} className={`justify-self-end cursor-pointer ${showItems && 'scale-y-[-1]'} duration-400 transition-transform`} alt="arrow down" src={arrowDownIcon}/>
            </div>
            { showItems &&
            <div className='px-24 my-8'>
                {props.products.map((product, index) => <Item {...product} key={index} />)}
            </div>
            }
        </div>
    );
}

export default Transaction;