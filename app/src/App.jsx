import MainContainer from "./mainContainer";
import React, { useEffect } from "react";
import { useState } from "react";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const categoryFoods = [
    {
      name: "All",
      category: "all",
    },
    {
      name: "Breakfast",
      category: "breakfast",
    },
    {
      name: "Lunch",
      category: "lunch",
    },
    {
      name: "Dinner",
      category: "dinner",
    },
  ];
  const [data, setData] = useState([]);
  const [fieldData, setFieldData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log(data);
        setData(data);
        setFieldData(data);
        setLoading(false);
      } catch (error) {
        console.log(error, "error");
        setError(true);
        setLoading(false);
      }
    })();
  }, []);
  const handleInputSearch = (e) => {
    setSearchTerm(e.target.value);
    // const value = e.target.value;
    // // setData(data.filter(data => data?.name.toLowerCase().includes(value.toLowerCase())))
    // if (value === "") {
    //   setData(fieldData)
    // }
    // const filter = data.filter(data => data?.name.toLowerCase().includes(value.toLowerCase()))
    // setData(filter)
  };
  useEffect(() => {
    if (searchTerm === "") {
      setData(fieldData);
    }
    const filter = fieldData.filter((data) =>
      data?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //! showing setData so changing the fieldData value not data
    setData(filter);
  }, [searchTerm, fieldData]);

  const handleSearch = (category) => {
    if (category === "all") {
      setData(fieldData);
    } else {
      setData(fieldData.filter((data) => data.type === category));
      //! showing setData so changing the fieldData value
    }
  };
  return (
    <>
      <section className=" bg-gray-700 ">
        <div className="max-w-[1440px] h-[120px] flex justify-between items-center m-auto p-10 ">
          <div>
            <figure>
              <img src="./images/Foody Zone.svg" alt="logo" />
            </figure>
          </div>
          <div>
            <input
              className=" p-2 w-[240px] rounded-[5px] border-1 border-red-600 text-white placeholder:text-white"
              type="search"
              placeholder="Search"
              onChange={handleInputSearch}
            />
          </div>
        </div>
        <div className=" flex justify-center gap-2.5 pb-2.5 ">
          {categoryFoods.map((food, i) => (
            <button
              className="px-[12px] py-[6px] bg-[#FF4343] rounded-2xl text-white"
              onClick={() => handleSearch(food.category)}
              key={i}
            >
              {food.name}
            </button>
          ))}
        </div>
      </section>
      <MainContainer data={data} error={error} loading={loading} />
    </>
  );
};

export default App;
