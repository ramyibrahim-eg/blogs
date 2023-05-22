import React, { useState } from "react";
import { excerpt } from "../../utility/Utility";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingSpinnerButton from './LoadingSpinnerButton';

const BlogSection = ({ blogs, user, handleDelet }) => {
  const userId = user?.uid;

  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const [i, setI] = useState(3);

  let readMore = blogs.slice(0, i);

  const readMoreItem = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setI((prev) => prev + 3);
      if (i > blogs.length - 4) {
        setShowButton(false);
      }
    }, 2000);
  };

  return (
    <div>
      <div className="blog-heading text-start py-2 mb-4">Blogs</div>
      {readMore?.map((item) => (
        <div className="row pb-4" key={item.id}>
          <div className="col-md-5">
            <div className="hover-blogs-img">
              <Link to={`/ditails/${item.id}`}>
                <div className="blogs-img">
                  <img src={item.imgURl} alt={item.title} />
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-7">
            <Link to={`/ditails/${item.id}`}>
              <div className="text-start">
                <h6 className="category catg-color">{item.category}</h6>
                <span className="title py-2">{item.title}</span>
                <span className="meta-info">
                  <p className="author">{item.author} </p> -{" "}
                  {item.timestamp.toDate().toDateString()}
                </span>
              </div>
            </Link>

            <div className="short-description text-start">
              {excerpt(item.description, 120)}
            </div>

            <div className="w-100 d-flex align-items-center justify-content-between">
              <Link to={`/ditails/${item.id}`}>
                <button className="btn btn-read">Read More</button>
              </Link>
              {userId && item.userId === userId && (
                <div>
                  <AiFillDelete
                    className="AiFillDelete"
                    onClick={() => {
                      handleDelet(item.id);
                    }}
                  />
                  <Link to={`/update/${item.id}`}>
                    <FaEdit className="FaEdit" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-center">
        {showButton && (
          <LoadingSpinnerButton
            className="btn btn-read"
            onClick={readMoreItem}
            title={"Load More"}
            loading={loading}
          ></LoadingSpinnerButton>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
