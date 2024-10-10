import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { useSearchParams } from 'react-router-dom';
const Search = ({ handleSearch }) => {

    const [searchParams,setSearchParams] = useSearchParams()



    const [keyword, setKeyword] = useState(searchParams.get("search") || "");

    const handleSearchClick = ()=>{

        setSearchParams({search : keyword})
        handleSearch(keyword)


    }


    return (
        <div className='flex items-center justify-start h-full p-6 lg:p-12 w-full'>
            <div className='relative w-[100%] xl:w-[80%]'>
                <input
                    type="text"
                    className='w-full border-2 border-[#adb3ca] rounded-md p-2 text-[#97a2b5] font-opensans pr-10 outline-none'
                    placeholder='Search'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 text-[#adb3ca] text-xl'
                    onClick={handleSearchClick}
                >
                    <IoSearch />
                </button>
            </div>
        </div>
    );
}

export default Search;
