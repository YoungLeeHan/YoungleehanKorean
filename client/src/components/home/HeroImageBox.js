import img1 from '../../assets/images/Home/heroImg1.svg';
import img2 from '../../assets/images/Home/heroImg2.svg';

export default function HeroImageBox() {
    return (
        <div className='hero-image-container'>
            <img className='hero-img' src={img1} alt='workbook sample 1' />
            <img className='hero-img' src={img2} alt='workbook sample 1' />
        </div>
    );
}
