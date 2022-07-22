import ItemList from "./ItemList";
import Cart from "./Cart";
import constants from '../../constants';
import React, { useState, useEffect } from 'react';



function Sales() {
    const [transaction, setTransaction] = useState(JSON.parse(localStorage.getItem('sales')) || {
        user : {bon:[]},
        total : 0,
        cash : 0,
        payment : 'cash',
        change : 0,
        pointsAdded : 0,
        profit : 0,
        products : [],
        date : '',
    });

    const [itemData, setItemData] = useState('');
    const [userData, setUserData] = useState('');
    
    useEffect(getData, [])

    useEffect(() => localStorage.setItem('sales', JSON.stringify(transaction)), [transaction])
    useEffect(calculateTotalProfitPointsAndChange, [transaction.products, transaction.cash, transaction.user, transaction.payment]);

    function getData(){
        fetch(`${constants.apiUrl}/members`)
        .then(res => res.json())
        .then(data => setUserData(data));
        fetch(`${constants.apiUrl}/products`)
        .then(res => res.json())
        .then(data => setItemData(data))
    }
    
    function addProductToCart(item){
        if(transaction.products.map(x => x.name).includes(item.name)){
            setTransaction(prevTransaction => {
                return {
                    ...prevTransaction,
                    products : prevTransaction.products.map(x => x.name === item.name ? {...x, count : +x.count + 1} : x)
                }
            })
        }else{
            setTransaction(prevTransaction => {
                return {
                    ...prevTransaction,
                    products : [...prevTransaction.products, item]
                }
            })
        }
    }

    function changeItemCount(item, amount){
        setTransaction(prevTransaction => {
            return {
                ...prevTransaction,
                products : prevTransaction.products.map(x => x.name === item.name ? {...x, count : amount} : {...x})
            }
            }
        )
    }

    function calculateTotalProfitPointsAndChange(){
        if(transaction.payment === 'poin'){
            setTransaction(prevTransaction => {
                let total = 0;
                let profit = 0;

                prevTransaction.products.forEach(item => {
                    let priceIndex;
                    item.prices.forEach((i, idx) => {
                        if(item.count >= i.min){
                            priceIndex = idx
                        }
                    }) ;

                    total += Math.ceil(item.prices[priceIndex].price * item.count / constants.pointsToCashRatio);
                })
                const newTransaction = {...prevTransaction, profit : profit, total : total, change : transaction.user.points - total, pointsAdded : Math.floor(total/constants.cashToPointRatio)};
                return newTransaction;
            });
        }else{
            setTransaction(prevTransaction => {
                let total = 0;
                let profit = 0;
    
                prevTransaction.products.forEach(item => {
                    let priceIndex;
                    item.prices.forEach((i, idx) => {
                        if(item.count >= i.min){
                            priceIndex = idx
                        }
                    }) ;
    
                    total += item.prices[priceIndex].price * item.count;
                    profit += item.prices[priceIndex].profit * item.count;
                })
                const newTransaction = {...prevTransaction, profit : profit, total : total, change : transaction.cash - total, pointsAdded : Math.floor(total/constants.pointsToCashRatio)};
                return newTransaction;
            });
        }
    }

    function removeProductFromCart(item){
        setTransaction(prevTransaction => {
            let index;

            prevTransaction.products.forEach((i, idx) => i.name === item.name ? index = idx : {})
            const newProducts = [...prevTransaction.products];
            newProducts.splice(index, 1);

            return {...prevTransaction, products : newProducts};
        })
    }

    function setUser(user){
        setTransaction(prevTransaction => {
            return {
                ...prevTransaction,
                user : user
            }
        })
    }

    function setCash(amount){
        setTransaction(prevTransaction => {
            return {
                ...prevTransaction,
                cash : amount
            }
        })
    }

    function createTransaction(){
        if(transaction.change < 0){
            window.alert('Uang/poin tidak cukup');
            return
        }

        if(transaction.total === 0){
            window.alert('Transaksi Kosong')
            return
        }
        //todo
        console.log('transaction created')
        setTransaction({
            user : '',
            total : 0,
            cash : 0,
            change : 0,
            pointsAdded : 0,
            profit : 0,
            products : [],
            date : '',
        });
    }

    function setPayment(method){
        setTransaction(prevTransaction => {
            return {...prevTransaction, payment : method}
        })
    }



    return (
        <div className="px-16 py-6 flex">
            <ItemList itemData={itemData} addProductToCart={addProductToCart}/>
            <Cart {...transaction} userData={userData} setPayment={setPayment} changeItemCount={changeItemCount} removeProductFromCart={removeProductFromCart} setUser={setUser} setCash={setCash} createTransaction={createTransaction}/>
        </div>
    );
}

export default Sales;