import Transaction from "./Transaction";
import React, { useState } from 'react';


function TransactionList(props) {
    props.transactionsData.sort((a, b) => b.date-a.date);
    const [keyword, setKeyword] = useState('');
    const pattern = new RegExp(`${keyword}`, 'i');
    let displayedTransactions = [...props.transactionsData].filter(transaction => {
        let transactionString = transaction.user.name + ' ' + transaction.products.map(product => product.name).join(', ');
        return transactionString.match(pattern);
    });

    return ( 
        <div className=" py-8">
            <div className="mb-8 flex justify-between">
                <p className="text-2xl">History Transaksi</p>
                <input placeholder='cari berdasarkan barang/member' className='w-96 h-8 px-3 rounded-lg bg-neutral-100 border border-solid border-neutral-300 placeholder:italic placeholder:text-sm' onChange={e => setKeyword(e.target.value)}></input>
            </div>
            {displayedTransactions.map((transaction, index) => <Transaction key={index} {...transaction}/>)}
        </div> 
    );
}

export default TransactionList;