import React, { useState, useEffect } from 'react';
import ItemAndMemberList from './ItemAndMemberList';
import ConfirmModal from '../ConfirmModal';
import Form from './Form';
import constants from '../../constants';

function Edit() {
    const [showModal, setShowModal] = useState(false);
    const [itemData, setItemData] = useState('');
    const [userData, setUserData] = useState('');
    const [del, setDel] = useState('barang');
    const [user, setUser] = useState({
        name : '',
        points : '',
        phone : ''
    });
    const [item, setItem] = useState({
        name : '',
        unit : '',
        prices : [{price : '', profit : '', min : 0}],
        count : 1,
        lastEdit : ''
    });

    useEffect(getData, []);

    function getData(){
        fetch(`${constants.apiUrl}/members`)
        .then(res => res.json())
        .then(data => setUserData(data));
        fetch(`${constants.apiUrl}/products`)
        .then(res => res.json())
        .then(data => setItemData(data))
    }

    function startDeleteSequence(item){
        setShowModal(true);
        if(item.prices){
            setItem(item);
            setDel('barang');
        }else{
            setUser(item);
            setDel('member');
        }
    }

    function delData(){
        fetch(`${constants.apiUrl}/delete/${del === 'barang' ? 'products' : 'members'}/${del === 'barang' ? item._id : user._id}`)
        .then(res => res.json())
        .then(data => data.success === 1 ? window.alert(`${del} ${del === 'barang' ? item.name : user.name} berhasil dihapus.`) : window.alert('operasi hapus gagal.'))
        .then(() => getData());
        setShowModal(false);
    }
    function cancelDel(){
        setShowModal(false);
    }

    function insertData(type){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(type === 'user' ? user : item)
        };

        fetch(`${constants.apiUrl}/insert/${type === 'user' ? 'members' : 'products'}`, options)
        .then(res => res.json())
        .then(data => console.log(data))
        .then(() => {
            if(type === 'user'){
                resetUser();
            }else{
                resetItem();
            }
            getData();
            window.alert('tambah data berhasil');
        });
    }

    function editData(type){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(type === 'user' ? user : item)
        };

        fetch(`${constants.apiUrl}/replace/${type === 'user' ? 'members' : 'products'}`, options)
        .then(res => res.json())
        .then(data => console.log(data))
        .then(() => {
            if(type === 'user'){
                resetUser();
            }else{
                resetItem();
            }
            getData();
            window.alert('edit data berhasil');
        });
    }

    function setActiveItem(item){
        setItem(item);
    }
    function setActiveUser(user){
        setUser({...user, points : +user.points});
    }

    function resetUser(){
        setUser({
            name : '',
            points : '',
            phone : ''
        })
    }

    function resetItem(){
        setItem({
            name : '',
            unit : '',
            prices : [{price : '', profit : '', min : ''}],
            count : 1,
            lastEdit : ''
        })
    }

    function handlePricesChange(event, index){
        const {name, value} = event.target;
        setItem(prevItem => {
            const newItemPrices = [...prevItem.prices];
            newItemPrices[index][name] = +value;
            return {...prevItem, prices : newItemPrices};
        })
    }

    function addPrice(){
        setItem( prevItem => {
            return {...prevItem, prices : [...prevItem.prices, {price : '', profit : '', min : ''}]}
        })
    }

    function delPrice(index){
        setItem(prevItem => {
            const newItemPrices = [...prevItem.prices];
            newItemPrices.splice(index, 1);
            return {...prevItem, prices : newItemPrices};
        });
    }

    function handleUserChange(e){
        const {value, name} = e.target;
        if(name === 'points'){
            setUser(prevUser => {return {...prevUser, [name] : +value}});    
        }else{
            setUser(prevUser => {return {...prevUser, [name] : value}});
        }
    }

    function handleItemChange(e){
        const {value, name} = e.target;
        setItem(prevItem => {return {...prevItem, [name] : value}})
    }

    return (
        <div className="px-16 py-6 flex justify-between">
            <ItemAndMemberList data={[...itemData, ...userData]} startDeleteSequence={startDeleteSequence} setActiveItem={setActiveItem} setActiveUser={setActiveUser}/>
            <Form user={user} item={item} handleUserChange={handleUserChange} handleItemChange={handleItemChange} handlePricesChange={handlePricesChange} addPrice={addPrice} delPrice={delPrice} resetItem={resetItem} resetUser={resetUser} editData={editData} insertData={insertData}/>
            {showModal && <ConfirmModal delete={true} text={`Hapus ${del} "${del === 'member' ? user.name : item.name}" ?`} positiveText='hapus' negativeText='cancel' positive={delData} negative={cancelDel}/>}
        </div>
    );
}

export default Edit;