import React, { useEffect, useState } from "react";
import { Carousel, Radio } from "antd";
import { api } from "~/utils/api";
const ProductCarousel: React.FC = () => {
  const { data, isLoading, isError } = api.queries.getProducts.useQuery();
  const [productSelected, setProductSelected] = useState("all");
  const [products, setProducts] = useState(data);
  useEffect(() => {
    if (productSelected !== "all") {
      setProducts(
        data
          ? data.filter((dt) => {
              return dt.category === productSelected?.toUpperCase();
            })
          : []
      );
    } else {
      setProducts(data);
    }
  }, [productSelected]);
  useEffect(() => {
    setProductSelected("all");
    setProducts(data);
  }, [data]);
  return (
    <div className=" container relative">
      <div className=" absolute  -top-10 right-0 ">
        <Radio.Group
          value={productSelected}
          size="small"
          buttonStyle="solid"
          onChange={(e: any) => setProductSelected(e.target.value)}
        >
          <Radio.Button value="all">All</Radio.Button>
          <Radio.Button value="tinapa">Tinapa</Radio.Button>
          <Radio.Button value="pasalubong">Pasalubong</Radio.Button>
        </Radio.Group>
      </div>
      <Carousel autoplay arrows className=" overflow-hidden rounded-xl">
        {products &&
          products.map((x) => {
            return (
              <div
                key={x.id}
                className={`m-0 h-96 overflow-hidden rounded-xl bg-[url('/smokedFishPNG.png')]  bg-cover`}
              >
                <div className=" flex h-full flex-col gap-2 bg-[#482400bc] p-3 sm:flex-row">
                  <img
                    src={x.image ? x.image : ""}
                    alt={x.name}
                    className="mx-auto h-64 rounded-lg sm:mx-0 sm:h-80"
                  />
                  <div className=" flex items-center justify-center sm:h-80">
                    <span className=" text-center font-cavean text-2xl text-white sm:text-7xl">
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
