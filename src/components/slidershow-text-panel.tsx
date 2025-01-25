import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
// import { getDynamics } from '../dynamics/getDynamics'; // to show text dynamically

export default class SlidershowTextPanel extends React.Component {

    render() {
        // const carouselContent: any = getDynamics.carouselSlides;
        // console.log(carouselContent);
        return (
            <CarouselProvider
                naturalSlideWidth={1000}
                naturalSlideHeight={200}
                totalSlides={3}
                isPlaying={true}
                interval={10000}
                touchEnabled={false}
                infinite={false}
            >
                <Slider>
                    <Slide className='slider_content' index={0}>
                        <h4>قابلیت اتصال به داشبورد امور مشترکین</h4>
                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که </p>
                    </Slide>
                    <Slide className='slider_content' index={1}>
                        <h4>قابلیت اتصال به داشبورد امور مشترکین</h4>
                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که </p>
                    </Slide>
                    <Slide className='slider_content' index={2}>
                        <h4>قابلیت اتصال به داشبورد امور مشترکین</h4>
                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که </p>
                    </Slide>
                </Slider>
                <div>
                    <div>
                        <ButtonBack className='_dot'><div></div></ButtonBack>
                        <ButtonNext className='_dot'><div></div></ButtonNext>
                        <ButtonNext className='_dot'><div></div></ButtonNext>
                    </div>
                </div>
            </CarouselProvider >
        );
    }
}