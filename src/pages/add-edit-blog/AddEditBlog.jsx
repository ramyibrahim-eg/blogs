import React, { useEffect, useState } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import imgLogo from "../../img/img-icon.webp";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Sports",
  "Business",
];

const AddEditBlog = ({ user }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [numUpload, setNumUpload] = useState(0);
  const [disabled, setDisabled] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, trending, category, description } = form;

  useEffect(() => {
    const imgInp = document.querySelector("#imgInp");
    const blah = document.querySelector("#blah");
    const reactTag = document.querySelector(".react-tag-input__input");

    reactTag.addEventListener("keydown", (e) => {
      if (e.keyCode == 188) {
        Object.defineProperty(KeyboardEvent.prototype, "keyCode", {
          get: function () {
            switch (this.key) {
              case ",":
                return 13;
              default:
                return this.which;
            }
          },
        });
      }
    });

    imgInp.onchange = (evt) => {
      const [file] = imgInp.files;
      if (file) {
        blah.src = URL.createObjectURL(file);
      }
    };

    const FileUpload = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);

          for (let i = 0; i <= progress; i++) {
            setNumUpload(i);
          }

          switch (snapshot.state) {
            case "paused":
              console.log("Upload");
              break;
            case "running":
              console.log("running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("image upload successfully");
            setDisabled(false);
            setForm((prev) => ({ ...prev, imgURl: downloadUrl }));
          });
        }
      );
    };

    file && FileUpload();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const handleCategory = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Article added successfully");
          navigate("/");
        } catch (error) {
          toast.error("Error adding article");
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Update Article successfully");
          navigate("/");
        } catch (error) {
          toast.error("Update Article Error");
        }
      }
    } else {
      {
        id ? setDisabled(false) : setDisabled(true);
      }
      return toast.error("All fields are mandatory to fill");
    }
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">
            {id ? "Update Blog" : "Create Blog"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6 div-form">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 py-3">
                <ReactTagInput
                  tags={tags}
                  placeholder="tags"
                  onChange={handleTags}
                  required
                />
              </div>

              <div className="col-12 py-3">
                <p className="trending">Is it trending blog ?</p>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="yes"
                    name="radioOption"
                    checked={trending === "yes"}
                    onChange={handleTrending}
                    required
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    &nbsp;yes&nbsp;
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    value="no"
                    name="radioOption"
                    checked={trending === "no"}
                    onChange={handleTrending}
                    required
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    &nbsp;no
                  </label>
                </div>
              </div>

              <div className="col-12 py-3">
                <select
                  value={category}
                  onChange={handleCategory}
                  className="catg-dropdown"
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="handle-img">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                  id="imgInp"
                  required
                />
                <img id="blah" src={imgLogo} alt="your image" />
              </div>

              {numUpload === 0 ? (
                <></>
              ) : (
                <div className="col-12 py-3 text-center">
                  <div className="progress" style={{ height: "5px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: numUpload + "%" }}
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  upload {numUpload}%
                </div>
              )}

              <div className="col-12 py-3">
                <textarea
                  className="form-control description-box"
                  placeholder="description"
                  value={description}
                  name="description"
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-12 py-3 text-center">
                <button
                  className="btn btn-add"
                  type="submit"
                  disabled={disabled}
                >
                  {id ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;
