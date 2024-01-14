// 👻 Developed by DanBi Choi on Aug 23th, 2023.
// -----------------------------------------------------
import { useNavigate } from 'react-router-dom';
import TitleCard from '../cards/TitleCard';
import AccordionDisplay from '../common/AccordionDisplay';
import { BsArrowUpRight } from 'react-icons/bs';
import workbookImg from '../../assets/images/Home/heroImg1.svg';

export default function Worksheet() {
    // hooks
    const navigate = useNavigate();

    return (
        <section
            className='worksheet d-flex flex-column justify-content-center align-items-center'
            style={{ width: '100%' }}
        >
            <TitleCard
                sectionTitle={'Worksheet'}
                mainTitle1={'What Makes'}
                mainTitle2={'YoungLeeHan'}
                mainTitle3={'Special'}
            />
            <div className='worksheet-box row' style={{ width: '100%' }}>
                <div className='col-md-6'>
                    <img src={workbookImg} alt='Write something here' />
                </div>
                <div className='col-md-6'>
                    <AccordionDisplay type={'home'} />
                </div>
            </div>
            <button
                className='btn'
                style={{
                    padding: '12px 32px',
                    fontSize: '16px',
                    border: '1px solid #EBEBEB',
                    boxShadow: '0px 0px 0px 0px rgba(255, 231, 223, 0.00)',
                    marginTop: '50px',
                }}
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/ourstory');
                }}
            >
                See More &nbsp;&nbsp;
                <BsArrowUpRight style={{ paddingBottom: '3px' }} />
            </button>
        </section>
    );
}
