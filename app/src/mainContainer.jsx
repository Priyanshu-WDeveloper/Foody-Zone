import { BASE_URL } from "./App"


const MainContainer = ({ data, error, loading }) => {

    return (
        <section className=' bg-[url(./images/bg.svg)] min-h-[calc(100vh-167px)] text-white '>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            <div className='flex flex-wrap gap-5 justify-center max-w-[1410px] m-auto pt-[66px]'>
                {data && data?.map(({ name, image, price, text }, i) => (<>
                    <div key={i} className='customcard flex p-2.5'>
                        <figure className='img'>
                            <img
                                // src={item.image}
                                // width={133}
                                className=' w-full h-full '
                                src={BASE_URL + image}
                                alt="image" />
                        </figure>

                        <div className='flex flex-col items-end'>
                            <div>
                                <h3>{name}</h3>
                                <p>{text}</p>
                            </div>
                            <div>
                                <button
                                    className="px-[12px] py-[6px] bg-[#FF4343] rounded-[5px] text-white mt-2"
                                    key={i}>
                                    ${price.toFixed(2)}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
                ))}
            </div>

        </section>
    )
}

export default MainContainer