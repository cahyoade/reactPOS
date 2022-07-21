import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

function DataChart(props) {
    const currentTime = new Date();
    const month = currentTime.getMonth();
    const year = currentTime.getFullYear();
    const labels = {date : [], string : []};
    const transactionsData = {profit : [], sales : []};
    const formatter = new Intl.NumberFormat('id').format

    for(let i = 1; i <= currentTime.getDate(); i++){
        labels.date.push(new Date(year, month, i));
        labels.string.push(`${i}/${month + 1}/${year}`);
    }

    labels.date.forEach((date, index) => {
        let profit = 0;
        let sales = 0;

        props.transactionsData.forEach(transaction => {
            if(transaction.date > date && transaction.date < new Date(new Date(date).setDate(index + 2))){
                profit += transaction.profit;
                sales += transaction.total;
            }
        });

        transactionsData.profit.push(profit);
        transactionsData.sales.push(sales);
    });

    console.log(transactionsData)

    const chartData = {
        labels : labels.string,
        datasets: [
        {
            label : 'Penjualan',
            borderColor: 'rgb(28, 156, 194)',
            backgroundColor: 'rgba(28, 156, 194, 0.5)',
            data: transactionsData.sales
        },
        {
            label : 'Keuntungan',
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            data: transactionsData.profit
        },
        ],
    }

    const chartOptions = {
        aspectRatio : 2.5,
        plugins: {
            title: {
              display: true,
              text: 'Penjualan dan keuntungan bulan ini',
              font: {
                size: 24,
                family: 'rubik'
              }
            },
        },
        scales : {
            yAxes : {
                min : 0,
                max : Math.max(...transactionsData.sales) * 1.3,
                ticks : {
                    callback : function(value, index, ticks){
                        return 'Rp' + formatter(value);
                    }
                }
            }
        }
    }

    return (
        <div className='p-8 rounded-xl shadow-xl border border-solid border-neutral-300'>
            <Line
                data={chartData}
                options={chartOptions}
            />
        </div>
    );
}

export default DataChart;