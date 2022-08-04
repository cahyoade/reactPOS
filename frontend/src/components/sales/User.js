import checked from '../../images/checked.png'
import unChecked from '../../images/unChecked.png'

function User(props) {
    let userData = {...props};
    delete userData.active;
    delete userData.setUser;

    return ( 
        <div className='flex cursor-pointer justify-between items-center p-2 border-b-2 hover:bg-slate-200' onClick={() => props.active ? props.setUser({}) : props.setUser(userData)}>
            <div className='text-xs'>
                <p>{props.name}</p>
                <p className='italic'>{props.points} poin</p>
            </div>
            <img alt='checkBox' src={props.active ? checked : unChecked} className='w-5'></img>
        </div>
    );
}

export default User;