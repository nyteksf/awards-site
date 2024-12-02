import React from "react";

const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {

  return (
    <button id={id} className={`group relative cursor-not-allowed z-10 w-fit overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-[#242424] ${containerClass}`}>
        {leftIcon}
        
        <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
            <div>
                {title}
            </div>
        </span>

        {rightIcon}
    </button>
  )
};

export default Button;
