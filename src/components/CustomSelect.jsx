import React, { useEffect, useRef, useState } from 'react'

const CustomSelect = ({ selectOptions }) => {
    const [visibleOptions, setVisibleOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);
    const ref = useRef(null);

    const handleOption = (option, index) => {
        setSelectedOption(option);
        setActiveIndex(index);
        setVisibleOptions(false);
    }

    const handleKeyDown = (e) => {
        const key = e.keyCode;
        if (visibleOptions) {
            if (key === 38) { // Up arrow
                setActiveIndex((prevIndex) => prevIndex === 0 ? selectOptions.length - 1 : prevIndex - 1);
            } else if (key === 40) { // Down arrow
                setActiveIndex((prevIndex) => prevIndex === selectOptions.length - 1 ? 0 : prevIndex + 1);
            } else if (key === 13) { // Enter key
                setVisibleOptions(false);
            }
        }
    };

    useEffect(() => {
        setSelectedOption(selectOptions[activeIndex])
    }, [selectOptions, activeIndex])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!ref.current.contains(e.target)) {
                setVisibleOptions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div onKeyDown={handleKeyDown} tabIndex={0} ref={ref} className='relative max-w-[300px] sm:max-w-[400px] w-full m-5 outline-none'>
            <div onClick={() => setVisibleOptions(!visibleOptions)} className='w-full flex items-center justify-between gap-4 bg-white rounded-lg shadow-[0_0_10px_4px_#c7c7c7] p-4 sm:px-6 sm:py-5 cursor-pointer'>
                <h4 className={`sm:text-xl ${selectedOption ? 'text-black' : 'text-gray-400'}`}>
                    {selectedOption || 'Select Occupation'}
                </h4>
                <i className={`fa-solid fa-chevron-down text-sm sm:text-base text-gray-700 transition-all duration-300 ${visibleOptions ? 'rotate-180' : 'rotate-0'}`}></i>
            </div>

            <ul className={`absolute top-[68px] sm:top-[82px] bg-white w-full rounded-lg shadow-[0_0_10px_4px_#c7c7c7] overflow-hidden scale-y-0 origin-top transition-all duration-300 ${visibleOptions ? 'scale-y-100' : 'scale-y-0'}`}>
                {selectOptions.map((option, index) => (
                    <li
                        key={index}
                        onClick={() => handleOption(option, index)}
                        className={`sm:text-xl p-4 sm:px-6 hover:bg-[#6c2996] hover:text-white cursor-pointer transition duration-300 ${index === activeIndex && 'text-white bg-[#6c2996]'}`}>{option}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default CustomSelect