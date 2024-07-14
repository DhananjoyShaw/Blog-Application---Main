// import React from 'react';
import PropTypes from 'prop-types';
import { IF } from '../url';

const ProfilePosts = ({ p }) => {
  return (
    <div className="w-full bg-[#D3EBE0] hover:bg-[#95B1AE] rounded-lg shadow-md mb-4 flex mt-8 space-x-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img className="h-full w-full object-scale-down" src={IF + p.photo} alt="" />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {p.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-900 items-center justify-between md:mb-4">
          <p>@{p.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        {/* Use dangerouslySetInnerHTML to render HTML content */}
        <div className="text-sm md:text-lg" dangerouslySetInnerHTML={{ __html: p.desc.slice(0, 200) + " ...Read more" }} />
      </div>
    </div>
  );
};

ProfilePosts.propTypes = {
  p: PropTypes.shape({
    photo: PropTypes.string,
    title: PropTypes.string,
    username: PropTypes.string,
    updatedAt: PropTypes.string,
    desc: PropTypes.string,
  }).isRequired,
};

export default ProfilePosts;
