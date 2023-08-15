import React from "react";
import { Carousel } from "antd";
import { api } from "~/utils/api";
const ProductCarousel: React.FC = () => {
  const { data, isLoading, isError } = api.queries.getProducts.useQuery();
  return (
    <div className=" container">
      <Carousel autoplay arrows className=" overflow-hidden rounded-xl">
        {data &&
          data.map((x) => {
            return (
              <div
                key={x.id}
                className={`m-0 h-96 overflow-hidden rounded-xl bg-[url('/smokedFishPNG.png')]  bg-cover`}
              >
                <div className=" flex h-full flex-col gap-2 bg-[#000304bc] p-3 sm:flex-row">
                  <img
                    src={x.image ? x.image : ""}
                    alt={x.name}
                    className="mx-auto h-64 rounded-lg sm:mx-0 sm:h-80"
                  />
                  <div className=" flex items-center justify-center sm:h-80">
                    <span className=" text-center font-cavean text-3xl text-white sm:text-7xl">
                      {x.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        {isLoading && (
          <div className=" item-center m-0 flex h-96 justify-center overflow-hidden rounded-xl  bg-[#02304743] text-center">
            <p className=" my-40 text-xl text-white">Loading ...</p>
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
