/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import blogService from "../appwrite/blogService";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-slate-50 rounded-xl shadow-sm p-4">
        <div className="w-full justify-center mb-4">
          <img src={blogService.getFilePreview(featuredImage)} alt={title} />
        </div>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
