import React, { useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ImageWrapper from './image';

const SlidershowCarousel = () => {
    const [carouselImg] = useState<any[]>([
        { key: 1, src: 'login-dashboard.jpg', alt: '' },
        { key: 2, src: 'dashboard-2.svg', alt: '' },
        { key: 3, src: 'login-2.svg', alt: '' },
        { key: 3, src: 'dashboard-3.jpg', alt: '' }
    ]);

    return (
        <>
            <CarouselProvider
                naturalSlideWidth={600}
                naturalSlideHeight={400}
                totalSlides={carouselImg.length}
                isPlaying={true}
                interval={10000}
                touchEnabled={false}
                infinite={true}
            >
                <Slider>
                    {
                        carouselImg.map((item, index) => (
                            <Slide className='dashboard-slide' key={item.key} index={index}>
                                <ImageWrapper alt={item.alt} fileName={item.src} className='dashboard_image'></ImageWrapper>
                            </Slide>
                        ))
                    }
                </Slider>
                {/* <div>
                    <ButtonBack>Back</ButtonBack>
                    <ButtonNext>Next</ButtonNext>
                </div> */}
            </CarouselProvider>
        </>
    );
}
export default SlidershowCarousel;