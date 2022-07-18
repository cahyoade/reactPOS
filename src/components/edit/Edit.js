import React, { useState } from 'react';
import ItemAndMemberList from './ItemAndMemberList';
import itemData from '../../sampledata/products';
import userData from '../../sampledata/users';
import ConfirmModal from '../ConfirmModal';
import Form from './Form';

function Edit() {
    const [showModal, setShowModal] = useState(false);
    const [del, setDel] = useState('barang');
    const [user, setUser] = useState({
        id : '',
        name : '',
        points : '',
        phone : ''
    });
    const [item, setItem] = useState({
        id : '',
        name : '',
        unit : '',
        prices : [],
        count : 1,
        lastEdit : ''
    });

    console.log(item);

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

    function delItem(){
        //todo
        setShowModal(false)
    }
    function cancelDelItem(){
        //todo
        setShowModal(false)
    }

    function setActiveItem(item){
        setItem(item);
    }
    function setActiveUser(user){
        setUser(user);
    }

    function resetUser(){
        setUser({
            id : '',
            name : '',
            points : '',
            phone : ''
        })
    }

    function resetItem(){
        setItem({
            id : '',
            name : '',
            unit : '',
            prices : [],
            count : 1,
            lastEdit : ''
        })
    }

    function handleUserChange(e){
        const {value, name} = e.target; 
        setUser(prevUser => {return {...prevUser, [name] : value}});
    }

    function handleItemChange(e){
        const {value, name} = e.target;
        setItem(prevItem => {return {...prevItem, [name] : value}})
    }

    return (
        <div className="px-16 py-6 flex justify-between">
            <ItemAndMemberList data={[...itemData, ...userData]} startDeleteSequence={startDeleteSequence} setActiveItem={setActiveItem} setActiveUser={setActiveUser}/>
            <Form user={user} item={item} handleUserChange={handleUserChange} handleItemChange={handleItemChange} resetItem={resetItem} resetUser={resetUser}/>
            {showModal && <ConfirmModal delete={true} text={`Hapus ${del} "${del === 'member' ? user.name : item.name}" ?`} positiveText='hapus' negativeText='cancel' positive={delItem} negative={cancelDelItem}/>}
        </div>
    );
}

export default Edit;