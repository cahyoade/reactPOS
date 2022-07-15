import React, { useState } from 'react';
import ItemAndMemberList from './ItemAndMemberList';
import itemData from '../../sampledata/products';
import userData from '../../sampledata/users';
import ConfirmModal from '../ConfirmModal';

function Edit() {
    const [showModal, setShowModal] = useState(false);
    const [del, setDel] = useState('barang');
    const [mode, setMode] = useState('insert');
    const [user, setUser] = useState({
        name : '',
        point : '',
        phone : ''
    });
    const [item, setItem] = useState({
        name : '',
        unit : '',
        prices : [],
        count : 1,
        lastEdit : ''
    });

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

    return (
        <div className="px-16 py-6 flex justify-between">
            <ItemAndMemberList data={[...itemData, ...userData]} startDeleteSequence={startDeleteSequence}/>
            {showModal && <ConfirmModal delete={true} text={`Hapus ${del} "${del === 'member' ? user.name : item.name}"`} positive={delItem} negative={cancelDelItem}/>}
        </div>
    );
}

export default Edit;