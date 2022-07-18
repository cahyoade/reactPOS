import delIcon from '../../images/delete.png'

function User(props) {
    let userData = {...props}
    delete userData.startDeleteSequence;
    delete userData.setActiveUser;
    
    return ( 
        <div className='flex justify-between items-center p-2 border-b-2'>
            <div className='text-sm' onClick={() => props.setActiveUser(userData)}>
                <p>{props.name}</p>
                <p className='italic'>{props.points} poin</p>
            </div>
            <div className='flex items-center text-sm'>
                <p className='mr-3 italic'>{new Date(props.lastEdit).toLocaleDateString()}</p>
                <img src={delIcon} alt='delIcon' className='cursor-pointer' onClick={() => props.startDeleteSequence(userData)}/>
            </div>
        </div>
    );
}

export default User;