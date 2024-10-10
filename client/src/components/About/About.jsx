import React from "react";
import Button from "../../components/Home/Button";
import imac from "../../images/imac.png"
import ipad from "../../images/ipad.png"
import iphone from "../../images/iphone1.png"
import { Link } from "react-router-dom";
function PromoProducts() {
    return (
        <section className="py-20 bg-[#E7ECEE]" id="explore">
            {/* Products */}
            <div className="max-w-screen-xl py-0 px-8 my-0 mx-auto grid grid-rows-2 md:grid-cols-2 items-center gap-x-24 gap-y-36">
                {/* Product 1 */}
                {/* Left */}
                <div className="md:order-none order-1 relative flex items-center justify-center">
                    <div className="absolute h-52 w-[432px] bg-gradient-to-r from-pink-100 to-violet-100 blur-xl"></div>
                    <div className="relative h-80 w-80 md:h-96 md:w-96">
                        <img
                            src={imac}
                            style={{ objectFit: "contain", width: "100%", height: "100%" }}
                            alt="Product Image"
                        />
                    </div>
                </div>
                {/* Right */}
                <div className="max-w-md md:order-none order-2 -mt-24 md:mt-0">
                    <span className="uppercase px-4 py-2 text-xs font-bold font-poppins bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent shadow-md">
                        iMac 24
                    </span>
                    <h2 className="max-w-lg text-2xl font-semibold text-left text-black font-poppins lg:text-4xl lg:text-left mt-5 mb-4">
                        Awesome in any space. Perfectly Blend in your life.
                    </h2>
                    <p className="font-poppins text-base tracking-wide text-[#64646B] mb-4">
                        Designed to take full advantage of next-level performance and
                        special technologies such as the advanced image signal processor and
                        integrated memory architecture.
                    </p>
                    <div className="flex items-center justify-start w-full space-x-4 mt-6">
                        <div className="space-x-8 font-poppins">
                              <Link to={"/products?category=Laptops"}>
                            <Button title="Buy Now" />
                            </Link>
                            
                        </div>
                    </div>
                </div>

                {/* Product 2 */}
                <div className="max-w-md md:order-none order-4 -mt-24 md:mt-0">
                    <span className="uppercase px-4 py-2 text-xs font-bold font-poppins bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent shadow-md">
                        iPad
                    </span>
                    <h2 className="max-w-lg text-2xl font-semibold text-left text-black font-poppins lg:text-4xl lg:text-left mt-5 mb-4">
                        Unleash Your Creativity Anywhere with the Powerful iPad!
                    </h2>
                    <p className="font-poppins text-base tracking-wide text-[#64646B] mb-4">
                        The iPad is a powerful and versatile device that lets you unleash
                        your creativity wherever you go. With its stunning Retina display,
                        fast performance, and intuitive touch controls, you can sketch,
                        write, edit, and create with ease.
                    </p>
                    <div className="flex items-center justify-start w-full space-x-4 mt-6">
                        <div className="space-x-8 font-poppins">
                            <Link to={"/products?category=Ipad"}>
                            <Button title="Buy Now" />
                            </Link>
                            
                        </div>
                    </div>
                </div>

                {/* Left */}
                <div className="md:order-none order-3 relative flex items-center justify-center">
                    <div className="absolute h-52 w-[432px] bg-gradient-to-r from-pink-100 to-violet-100 blur-xl"></div>
                    <div className="relative h-80 w-80 md:h-96 md:w-96">
                        <img
                            src={ipad}
                            style={{ objectFit: "contain", width: "100%", height: "100%" }}
                            alt="Product Image"
                        />
                    </div>
                </div>

                {/* Product 3 */}
                <div className="md:order-none order-5 relative flex items-center justify-center">
                    <div className="absolute h-52 w-[432px] bg-gradient-to-r from-pink-100 to-violet-100 blur-xl"></div>
                    <div className="relative h-80 w-80 md:h-96 md:w-96">
                        <img
                            src={iphone}
                            style={{ objectFit: "contain", width: "100%", height: "100%" }}
                            alt="Product Image"
                        />
                    </div>
                </div>
                {/* Right */}
                <div className="max-w-md md:order-none order-6 -mt-24 md:mt-0">
                    <span className="uppercase px-4 py-2 text-xs font-bold font-poppins bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent shadow-md">
                        iPhone
                    </span>
                    <h2 className="max-w-lg text-2xl font-semibold text-left text-black font-poppins lg:text-4xl lg:text-left mt-5 mb-4">
                        Experience the Future Today with the Revolutionary iPhone!
                    </h2>
                    <p className="font-poppins text-base tracking-wide text-[#64646B] mb-4">
                        The iPhone is more than just a phone, it's a game-changing device
                        that has revolutionized the way we communicate, work, and play. With
                        its sleek design and cutting-edge technology, the iPhone is the
                        ultimate tool for staying connected and organized on the go.
                    </p>
                    <div className="flex items-center justify-start w-full space-x-4 mt-6">
                        <div className="space-x-8 font-poppins">
                              <Link to={"/products?category=Smartphones"}>
                            <Button title="Buy Now" />
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PromoProducts;
