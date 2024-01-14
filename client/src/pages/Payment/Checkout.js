// 👻 Developed by DanBi Choi on Aug 9th, 2023.
// -----------------------------------------------------
import PaymentMethodInput from '../../components/cards/PaymentMethodInput';
import Jumbotron from '../../components/cards/Jumbotron';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CartTotalBox from '../../components/cards/CartTotalBox';
import useScrollToTop from '../../hooks/useScrollToTop';
import { maxWidth } from '../../constants/constant';

export default function Checkout() {
    // hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    useScrollToTop();

    // redirect anonymous user
    useEffect(() => {
        if (!auth?.token) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <Jumbotron
                title={'Checkout'}
                directory={'Cart'}
                subDirectory={'Checkout'}
            />
            <div style={{ maxWidth: maxWidth }} className='container-fluid'>
                <div>
                    <div className='row' style={{ margin: '75px 0' }}>
                        <div className='col-md-6'>
                            <CartTotalBox />
                        </div>
                        <div className='col-md-6'>
                            <div
                                style={{
                                    backgroundColor: '#ffacac81',
                                    padding: '1rem',
                                    margin: '1rem 0',
                                    border: '1px solid #FF6565',
                                }}
                            >
                                <p>
                                    ❗️Please note: Do not enter your real
                                    credit card details. For any purchases, use
                                    a provided dummy credit card number instead.
                                </p>
                                <ul>
                                    ✅ Dummy Credit Card:
                                    <li>• Card#: 371449635398431</li>
                                    <li>• Exp Date: 12/23</li>
                                    <li>• CVV: 1234</li>
                                </ul>
                            </div>
                            <PaymentMethodInput />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
