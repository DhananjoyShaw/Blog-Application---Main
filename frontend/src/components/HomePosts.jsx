import PropTypes from 'prop-types';
import { IF } from '../url';

const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex flex-col mt-8 space-y-4 md:space-y-6">
      {/* Image */}
      <div className="w-full h-[200px] flex justify-center items-center">
        <img src={IF + post.photo} alt="" className="h-full w-full object-scale-down rounded-md" />
      </div>
      {/* Title */}
      <h1 className="text-xl font-bold md:text-2xl">
        {post.title}
      </h1>
      {/* Author and Date */}
      <div className="flex text-sm font-semibold text-gray-900 items-center justify-between">
        <p>@{post.username}</p>
        <div className="flex space-x-2 text-sm">
          <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
        </div>
      </div>
      {/* Content */}
      <div className="text-sm md:text-lg" dangerouslySetInnerHTML={{ __html: post.desc.slice(0, 200) + " ...Read more" }}></div>
    </div>
  );
};

HomePosts.propTypes = {
  post: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default HomePosts;
