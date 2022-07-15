import UserList from './UserList'
import Summary from './Summary'
import CartItem from './CartItem';

function Cart(props) {
    return ( 
        <div className='w-7/12 ml-[46px] grow p-6 rounded-xl shadow-xl border border-solid border-neutral-300 flex'>
            <div className='w-9/12 mr-6'>
                <h1 className='mb-4 text-2xl'>Keranjang</h1>
                {props.products.map((x, idx) => <CartItem removeProductFromCart={props.removeProductFromCart} changeItemCount={props.changeItemCount} key={idx} {...x}/>)}
            </div>
            <div className='grow flex flex-col'>
                <UserList title="Member" userData={props.userData} setUser={props.setUser} activeUser={props.user.name}/>
                <Summary createTransaction={props.createTransaction} changePayment={props.changePayment} loadBon={props.loadBon} saveBon={props.saveBon} user={props.user} pointsAdded={props.pointsAdded} total={props.total} cash={props.cash} change={props.change} setCash={props.setCash} payment={props.payment}/>
            </div>
        </div>
    );
}

export default Cart;