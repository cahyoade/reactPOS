import transactionsData from '../../sampledata/transactions'
import Card from './Card';
import DataChart from './DataChart';

function Dashboard() {
    const formatter = new Intl.NumberFormat('id').format

    let todaySales = 0, todayProfit = 0, thisMonthSales = 0, thisMonthProfit = 0;

    const currentDate = new Date();
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);

    const currentMonth = new Date(currentDate.getTime()).setDate(0);

    transactionsData.forEach(transaction => {
        if(transaction.date > currentMonth){
            thisMonthProfit += transaction.profit;
            thisMonthSales += transaction.total;
            
            if(transaction.date > currentDate){
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
            <DataChart transactionsData={transactionsData}/>
        </div>
    );
}

export default Dashboard;