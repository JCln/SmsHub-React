import { Button } from './Button';
import Annoucement from '../images/announcement.svg';
import announcement_tumbnail from '../images/sampleImg.jpg';
import { Inputs } from './Inputs';
import * as ENRoutes from '../constants/ENRoutes';
import { Link } from 'react-router';

const Announcement = () => {
    const items = [1, 2, 3];
    return (
        <div className='َapp'>
            <div className="">
                <img className='logo-img' src={Annoucement} alt="" />
                <div className="_container">
                    {items.map((object, i) =>
                        <div className='announcement_content'>
                            <img className='announcement_tumbnail' src={announcement_tumbnail} alt="" />
                            <div className="title">عنوان</div>
                            <div className="description">
                                <p>
                                    توضیحات
                                </p>
                            </div>
                            <hr></hr>
                            <div className='price_section'>
                                <div className="price">37تومان</div>
                                <Button onClick={(e) => {
                                    // e.preventDefault();
                                    <Link to={ENRoutes.TwoStepVerification}></Link>
                                    console.log(e);
                                }}
                                >
                                    خرید
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Announcement;