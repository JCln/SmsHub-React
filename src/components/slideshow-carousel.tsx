import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import loginDashboard from '../images/login-dashboard.jpg';
import loginDashboard2 from '../images/dashboard-2.svg';
import loginDashboard3 from '../images/dashboard-3.jpg';

export default class SlidershowCarousel extends React.Component {

    render() {
        return (
            <CarouselProvider
                naturalSlideWidth={600}
                naturalSlideHeight={400}
                totalSlides={3}
                isPlaying={true}
                interval={10000}
                touchEnabled={false}
                infinite={true}
            >
                <Slider>
                    <Slide className='dashboard-slide' index={0}>
                        <img className='dashboard_image' src={loginDashboard} alt="" />
                    </Slide>
                    <Slide className='dashboard-slide' index={1}>
                        <img className='dashboard_image' src={loginDashboard2} alt="" />
                    </Slide>
                    <Slide className='dashboard-slide' index={2}>
                        <img className='dashboard_image' src={loginDashboard3} alt="" />
                    </Slide>
                </Slider>
                {/* <div>
                    <ButtonBack>Back</ButtonBack>
                    <ButtonNext>Next</ButtonNext>
                </div> */}
            </CarouselProvider>
        );
    }
}