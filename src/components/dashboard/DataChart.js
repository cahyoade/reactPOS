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
    const transactionsData = {profit : new Array(currentTime.getDate()).fill(0), sales : new Array(currentTime.getDate()).fill(0)};
    const formatter = new Intl.NumberFormat('id').format

    for(let i = 1; i <= currentTime.getDate(); i++){
        labels.date.push(new Date(year, month, i));
        labels.string.push(`${i}/${month + 1}/${year}`);
    }

    props.transactionsData.forEach(transaction => {
        const index = new Date(transaction.date).getDate() - 1;

        transactionsData.sales[index] += transaction.total;
        transactionsData.profit[index] += transaction.profit;
    })

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
        scales : {
            yAxes : {
                min : 0,
                max : Math.ceil(Math.max(...transactionsData.sales) * 1.3),
                ticks : {
                    callback : function(value, index, ticks){
                        return 'Rp' + formatter(value);
                    }
                }
            }
        }
    }

    return (
        <div className='px-12 py-8 rounded-xl shadow-xl border border-solid border-neutral-300 mb-8'>
            <p className='text-2xl mb-8'>Keuntungan dan penjualan bulan ini</p>
            <Line
                data={chartData}
                options={chartOptions}
            />
        </div>
    );
}

export default DataChart;