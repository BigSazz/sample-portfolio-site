import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client.js'

import './Testimonial.scss'

const Testimonial = () => {
    const [brands, setBrands] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const query = '*[_type == "testimonials"]';
        const brandQuery = '*[_type == "brands"]';

        client.fetch(query)
            .then((data) => {
                setTestimonials(data);
            });

        client.fetch(brandQuery)
            .then((data) => {
                setBrands(data);
            })
    }, []);

    console.log("FROM TESTIMONIALS!!!", { testimonials });
    const test = testimonials[currentIndex];
    const handleClick = (idx) => {
        setCurrentIndex(idx)
    }

    return (
        <>
            {testimonials.length && (
                <>
                    <div className="app__testimonials-item app__flex">
                        <img src={urlFor(test.imgurl)} alt="testimonial" />
                        <div className="app__testimonials-content">
                            <p className="p-text">{test.feedback}</p>
                            <div>
                                <h4 className="bold-text">{test.name}</h4>
                                <p className="p-text">{test.company}</p>
                            </div>
                        </div>
                    </div>

                    <div className='app__testimonials-btns app__flex'>
                        <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
                            <HiChevronLeft />
                        </div>
                        <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
                            <HiChevronRight />
                        </div>
                    </div>
                </>
            )}

            <div className="app__testimonials-brands app__flex">
                {brands.map((brand, idx) => (
                    <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, type: 'tween' }}
                        key={brand._id + idx}
                    >
                        <img src={urlFor(brand.imgUrl)} alt={brand.name} />
                    </motion.div>
                ))}
            </div>
        </>
    )
}

export default AppWrap(
    MotionWrap(Testimonial, 'app__testimonials'),
    "testimonials",
    "app__primarybg"
);