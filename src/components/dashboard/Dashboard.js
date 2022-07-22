import Card from './Card';
import DataChart from './DataChart';
import TransactionList from './TransactionList';
import React, { useState, useEffect } from 'react';
import constants from '../../constants';


function Dashboard() {
    const formatter = new Intl.NumberFormat('id').format;
    const [transactionsData, setTransactionsData] = useState([]);

    let todaySales = 0, todayProfit = 0, thisMonthSales = 0, thisMonthProfit = 0;

    useEffect(getData, [])

    function getData(){
        fetch(constants.apiUrl + '/transactions')
        .then(res => res.json())
        .then(data => setTransactionsData(data))
    }
    const currentDate = new Date();
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);

    const currentMonth = new Date(currentDate.getTime()).setDate(0);

    transactionsData.forEach(transaction => {
        if(new Date(transaction.date) >= currentMonth){
            thisMonthProfit += transaction.profit;
            thisMonthSales += transaction.total;
            
            if(new Date(transaction.date) >= currentDate){
                todayProfit += transaction.profit;
                todaySales += transaction.total;
            }
        }
    })

    return (
        <div className="px-16 py-6">
            <div className='grid grid-cols-4 gap-8 mb-7'>
                <Card title='Penjualan hari ini' content={`Rp${formatter(todaySales)}`}/>
                <Card title='Keuntungan hari ini' content={`Rp${formatter(todayProfit)}`}/>
                <Card title='Penjualan bulan ini' content={`Rp${formatter(thisMonthSales)}`}/>
                <Card title='Keuntungan bulan ini' content={`Rp${formatter(thisMonthProfit)}`}/>
            </div>
            {transactionsData.length > 0 && <DataChart transactionsData={transactionsData}/>}
            <TransactionList transactionsData={transactionsData}/>
        </div>
    );
}

export default Dashboard;