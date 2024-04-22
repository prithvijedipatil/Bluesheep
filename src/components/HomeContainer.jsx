import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";
import HeroBg1 from "../img/heroBG1.png";
import { Link } from "react-router-dom";

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1  gap-2 w-full " id="home">
      <div className="py-2 my-10  flex flex-col  justify-center gap-10">
        <div className="flex flex-row mx-10 w-full gap-24">
          <div className="py-2  flex   justify-center gap-6 px-5 w-4">
            <div className="flex items-center gap-2  justify-center bg-sky-400 px-4 py-1 rounded-full whitespace-nowrap ">
              <p className="text-base text-white font-semibold p-1 w-full">
                <Link to="/checkout">Check-out</Link>
              </p>
            </div>
          </div>

          <div className="py-2  flex justify-center gap-6 px-5 w-4">
            <div className="flex items-center gap-2 justify-center bg-sky-400 px-4 py-1 rounded-full whitespace-nowrap">
              <p className="text-base text-white font-semibold p-1 w-full">
                <Link to="/checkin">Check-in</Link>
              </p>
            </div>
          </div>
          <div className="py-2  flex justify-center  w-4">
            <div className="flex items-center  justify-center bg-sky-400 px-4 py-1 rounded-full whitespace-nowrap">
              <p className="text-base text-white font-semibold p-1 w-full">
                <Link to="/bill">Bill</Link>
              </p>
            </div>
          </div>
        </div>
        <p className="text-[3.0rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          Savour home like food at
          <span className="text-sky-400 text-[3rem] lg:text-[5rem]">
            <span>&nbsp;</span>
            Bluesheep
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
          eaque fugit distinctio est nam voluptatum architecto, porro iusto
          deserunt recusandae ipsa minus eos sunt, dolores illo repellat facere
          suscipit!
        </p>

        <button
          type="button"
          className="bg-gradient-to-br text-white from-cyan-500 to-blue-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>
      {/* <div className="py-2 flex-1 flex items-center relative">
        <img
          src={HeroBg}
          className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
          alt="hero-bg"
        />

        <div className="w-full h-full absolute top-0 left-0 flex flex-row items-center justify-center lg:px-32  py-4 gap-4 flex-wrap xl:flex-row">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="  lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={n.imageSrc}
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                  alt="I1"
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {n.name}
                </p>

                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                  {n.decp}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span> {n.price}
                </p>
              </div>
            ))}
        </div>
      </div> */}
    </section>
  );
};

export default HomeContainer;
