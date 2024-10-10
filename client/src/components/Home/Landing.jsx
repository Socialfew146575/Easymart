import React, { useRef } from 'react';
import Button from './Button';
import iphone from "../../images/iphone.png"
function Landing({containerRef}) {
  

    const scrollToContainer = () => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="landing"
            className="   bg-[#E7ECEE] mx-auto flex h-screen max-w-screen-2xl items-center justify-center sm:justify-between px-16 sm:flex-row flex-col-reverse"
        >
            <div className="space-y-6">
                <h1 className="space-y-2 text-4xl font-semibold tracking-wide lg:text-5xl xl:text-6xl font-poppins sm:text-left text-center mt-6">
                    <span className="block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                        Powered
                    </span>
                    <span className="block">By Intellect</span>
                    <span className="block">Driven By Values</span>
                </h1>

                <div className="space-x-8 font-poppins">
                    <Button
                        title="Buy Now"
                        onClick={scrollToContainer}
                    />
                    <a href="/explore" className="link font-semibold">
                        Learn More
                    </a>
                </div>
            </div>

            <div className="relative h-[280px] w-[280px] transition-all duration-500 sm:inline lg:h-[550px] lg:w-[500px]">
                <img
                    src={iphone}
                    alt="iphone image"
                    className="object-contain h-full w-full"
                />
            </div>
        </section>
    );
}

export default Landing;
