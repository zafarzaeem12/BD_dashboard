import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
import $ from "jquery";
import "datatables.net";
import Modal from "react-modal";
import article from "../images/article.jpg";
import {
  getAllPosts,
  addPost,
  deletePost,
  getPreference,
  editPost,
} from "../store/slices/userSlice";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <button onClick={toggleReadMore} className="read-or-hide">
        {text.length > 150 ? (
          isReadMore ? (
            <>
              <p style={{ fontWeight: "bold" }}>...Read more</p>{" "}
            </>
          ) : (
            <>
              <p style={{ fontWeight: "bold" }}>Show less</p>
            </>
          )
        ) : (
          <></>
        )}
      </button>
    </p>
  );
};

const AddCategory = () => {
  const [id, setId] = useState();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState(null);
  const [preferences, setPreferences] = useState(null);
  // const status = useSelector(preferences)
  // const [preferences, setPreferences] = useState(null)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState();
  const [text, setText] = useState("");
  const [edittext, setEdittext] = useState("");
  const [tags, setTags] = useState("");
  const [edittags, setEditTags] = useState("");
  const [tagsarray, setTagsarray] = useState([]);
  const [edittagsarray, setEditTagsarray] = useState([]);
  const [title, setTitle] = useState("");
  const [edittitle, setEdittitle] = useState("");
  const [category, setCategory] = useState([]);
  const [editcategory, setEditcategory] = useState([]);
  const [attachment, setAttachment] = useState();
  const [editattachment, setEditattachment] = useState();
  const [editthumbnail, setEditthumbnail] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [type, setType] = useState();

  const [page, setPage] = useState('');
  // var csvData = [
  //     ["Name", "Email", "Number", "State", "Verified", "Zip Code", "Role"],
  // ]
  // preferences?.map((item) =>
  //     csvData.push([`${item?.name}`, `${item?.email}`, `${item?.number}`, `${item?.state}`, `${item?.isVerified}`, `${item?.zipCode}`, `${item?.role}`])
  // )

  console.log("tagsarray", category);
  console.log("i=d", id);

  function viewModal(item, type) {
    setIsOpen(true);
    if (type == "posts") {
      setPosts(item);
    } else if (type == "delete") {
      setId(item._id);
    } else if (type == "add") {
      // setId(item)
    } else if (type == "edit") {
      setId(item);
      setEdittitle(item?.title);
      setEdittext(item?.text);
      setEditcategory(item?.category);
      setEditTagsarray(item?.hash_tags);
      setType(item?.type);
      setAttachment(item?.attachment);
      setEditattachment(item?.attachment);
      setThumbnail(item?.thumbnail);
    }
    setModalType(type);
    setIsOpen(true);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "30%",
      height: modalType == "edit" ? "60%" : "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "auto",
      scrollbarColor: "red orange",
      scrollbarWidth: "thin",
    },
  };
  Modal.setAppElement("#root");

  function closeModal() {
    setIsOpen(false);
    setId("");
    setTitle("");
    setText("");
    setCategory([]);
    setTags("");
    setTagsarray([]);
    setAttachment();
    setEditattachment();
    setThumbnail();
  }

  $(document).ready(function () {
    document.getElementById("heart").onclick = function () {
      document.querySelector(".fa-gratipay").style.color = "#E74C3C";
    };
  });

//   const Posts = async () => {
//     try {
//       setPosts(null);
//       const response = await dispatch(getAllPosts()).unwrap();
//       console.log(response.data);
//       setPosts(response?.data);
//     } catch (rejectedValueOrSerializedError) {
//       console.log(rejectedValueOrSerializedError);
//     }
//   };

//   const AllPreferences = async () => {
//     try {
//       setPreferences(null);
//       const response = await dispatch(getPreference()).unwrap();
//       console.log(response.data);
//       setPreferences(response?.data);
//     } catch (rejectedValueOrSerializedError) {
//       console.log(rejectedValueOrSerializedError);
//     }
//   };

//   function AttachmenthandleChange(e) {
//     e.preventDefault();
//     console.log("e.target.files[0]", e.target.files);
//     setAttachment(e.target.files[0]);
//   }
//   function ThumbnailhandleChange(e) {
//     e.preventDefault();
//     setThumbnail(e.target.files[0]);
//   }


//   const editHandleClick = (e, i) => {
//     if (editcategory.includes(e.target.value)) {
//       setEditcategory(
//         editcategory.filter((selectedItem) => selectedItem !== e.target.value)
//       );
//     } else {
//       setEditcategory([...editcategory, e.target.value]);
//     }
//   };

//   const createPost = async () => {
//     try {
//       if (category.length < 1) {
//         toast.error("please add atleast one category");
//       } else {
//         var formdata = new FormData();
//         formdata.append("text", text);
//         formdata.append("hash_tags", JSON.stringify(tagsarray));
//         formdata.append("title", title);
//         formdata.append("category", JSON.stringify(category));
//         formdata.append("attachment", attachment);
//         formdata.append("thumbnail", thumbnail);

//         // setpreferences(null)
//         const response = await dispatch(addPost(formdata)).unwrap();
//         console.log(response.data);
//         // setpreferences(response?.data)
//         closeModal();
//         // window.location.reload();
//         Posts();
//         AllPreferences();
//       }
//     } catch (rejectedValueOrSerializedError) {
//       console.log(rejectedValueOrSerializedError);
//     }
//   };

//   const EditPost = async () => {
//     try {
//       // console.log('category', editcategory)
//       // return
//       // return
//       if (editcategory.length < 1) {
//         toast.error("please add atleast one category");
//       } else {
//         var formdata = new FormData();
//         formdata.append("post_id", id?._id);
//         formdata.append("text", edittext);
//         formdata.append("hash_tags", JSON.stringify(edittagsarray));
//         formdata.append("title", edittitle);
//         formdata.append("category", JSON.stringify(editcategory));
//         formdata.append("attachment", attachment);
//         formdata.append("thumbnail", thumbnail);

//         // setpreferences(null)
//         const response = await dispatch(editPost(formdata)).unwrap();
//         console.log(response.data);
//         // setpreferences(response?.data)
//         closeModal();
//         // window.location.reload();
//         Posts();
//         AllPreferences();
//       }
//     } catch (rejectedValueOrSerializedError) {
//       console.log(rejectedValueOrSerializedError);
//     }
//   };

//   const addTags = (e) => {
//     e.preventDefault();
//     try {
//       if (tags == "") {
//         toast.error("Tag field shouldn't be empty");
//       } else {
//         setTagsarray([...tagsarray, tags]);
//       }
//       setTags("");
//     } catch (rejectedValueOrSerializedError) {
//       console.log(rejectedValueOrSerializedError);
//     }
//   };

//   const editTags = (e) => {
//     e.preventDefault();
//     try {
//       if (edittags == "") {
//         toast.error("Tag field shouldn't be empty");
//       } else {
//         setEditTagsarray([...edittagsarray, edittags]);
//       }
//       setEditTags("");
//     } catch (rejectedValueOrSerializedError) {
//       console.log(rejectedValueOrSerializedError);
//     }
//   };

//   const removeTags = (e, i) => {
//     e.preventDefault();
//     try {
//       console.log("i, index", e, i);
//       // return
//       var arrr = tagsarray?.splice(i, 1);
//       console.log("subcategory", tags);
//       setTagsarray((current) =>
//         current.filter((arr) => {
//           return arr !== arrr;
//         })
//       );
//       // setSubcategoryarray()
//     } catch (rejectedValueOrSerializedError) {
//       console.log(rejectedValueOrSerializedError);
//     }
//   };

//   const removeEditTags = (e, i) => {
//     e.preventDefault();
//     try {
//       console.log("i, index", e, i);
//       // return
//       var arrr = edittagsarray?.splice(i, 1);
//       console.log("subcategory", edittags);
//       setTagsarray((current) =>
//         current.filter((arr) => {
//           return arr !== arrr;
//         })
//       );
//       // setSubcategoryarray()
//     } catch (rejectedValueOrSerializedError) {
//       console.log(rejectedValueOrSerializedError);
//     }
//   };

//   const postDelete = async (id) => {
//     try {
//       // setpreferences(null)
//       const response = await dispatch(deletePost({ _id: id })).unwrap();
//       console.log(response.data);
//       // setpreferences(response?.data)
//       closeModal();
//       // window.location.reload();
//       Posts();
//       setId("");
//     } catch (rejectedValueOrSerializedError) {
//       console.log(rejectedValueOrSerializedError);
//     }
//   };

//   useEffect(() => {
//     let mount = true;
//     if (mount) {
//       Posts();
//       AllPreferences();
//     }
//     return () => {
//       mount = false;
//     };
//   }, []);

//   useEffect(() => {
//     if (posts) {
//       $("#tableData").DataTable({
//         lengthMenu: [10, 25, 50, 100, 200],
//         language: {
//           emptyTable: "Posts Not Found",
//         },
//         destroy: true,
//       });
//     }
//   }, [posts]);

  return (
    <>
      <Modal
        closeTimeoutMS={500}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Change Password"
      >
        <div
          className="change-password-modal"
          id="exampleModalCenter"
          tabIndex={-1}
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          style={{ display: "block", zIndex: 100 }}
        >
          {modalType == "preferences" ? (
            <>
              <p className="pass-text">Preference Detail</p>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="modal-body">
                {/* <p > <b>Image:</b> {preferences?.profilePicture ? <><img height="20%" width="20%" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIURL}${preferences?.profilePicture}`}></img></> : <>No Image Found</>}</p> */}
                {/* <p > <b>Name:</b> {posts?.preference ? preferences?.preference : <>Name not mentioned</>}</p> */}
                {/* <p > <b>Email:</b> {preferences?.email}</p> */}
                {/* <p > <b>Number:</b> {preferences?.number ? preferences?.number : <>Number not mentioned</> }</p> */}
                {/* <p > <b>State:</b> {preferences?.state ? preferences?.state : <>State not mentioned</>}</p> */}
                {/* <p > <b>Zip Code:</b> {preferences?.zip_code ? preferences?.zip_code : <>Zip Code not mentioned</>}</p>  */}
              </div>
            </>
          ) : modalType == "delete" ? (
            <>
              <p className="pass-text">Are you sure you want to delete?</p>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="modal-body">
                <form>
                  <div
                    className="pass-form-wrap"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div className="login-button mt-2" style={{ width: "40%" }}>
                      <button
                        type="button"
                        // onClick={() => postDelete(id)}
                        className="cta-btn col-reds w-100"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="login-button mt-2" style={{ width: "40%" }}>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="cta-btn col-reds w-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : modalType == "add" ? (
            <>
              <p className="pass-text">Create Post</p>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="modal-body">
                <div className="input-group input-group-sm mb-3 ">
                  {/* <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Title
                    </span>
                  </div> */}
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Category"
                    maxlength={30}
                    value={title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="input-group input-group-sm mb-3 ">
                  {/* <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Text
                    </span>
                  </div> */}
                  <textarea
                    type="text"
                    className="form-control"
                    aria-label="Text"
                    maxlength={275}
                    value={text}
                    placeholder="Text"
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                {/* <div className="input-group input-group-sm mb-3 ">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Tags
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="tags"
                    maxlength={30}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                  <button
                    type="button"
                    className="editBtn xy-center m-0 mb-2"
                    onClick={(e) => addTags(e)}
                  >
                    + Add Tags
                  </button>
                </div>
                {tagsarray?.map((data, i) => (
                  <>
                    <span
                      style={{
                        color: "black",
                        border: "1px solid",
                        borderRadius: "5px",
                        margin: "5px",
                        padding: "5px",
                      }}
                    >
                      {data}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => removeTags(e, i)}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "100%",
                        fontSize: "18px",
                        background: "transparent",
                        border: 0,
                      }}
                      className="xy-center"
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </>
                ))}
                <br /> */}
                <div className="input-group input-group-sm mb-3 ">
                  <div className="input-group-prepend category_wrap">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Category
                    </span>
                  </div>
                  <div className="category_sectBtn">
                   
                    
                  </div>
                  {/* <select
                    name=""
                    id=""
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="select">Select</option>
                    {preferences.map((data) => (
                      <option value={data.preference}>{data.preference}</option>
                    ))}
                  </select> */}
                  {/* <input
                    type="text"
                    className="form-control"
                    aria-label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  /> */}
                </div>
                <div className="input-group input-group-sm mb-3 ">
                  {/* <label className="upload-btn" id="uploadImg"> */}
                  {/* {attachment} */}
                  {/* <img
                            height="100%"
                            width="100%"
                            src={article}
                            alt="img"
                            className="pb-3"
                    /> */}
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Attachment
                    </span>
                  </div>
                  <input
                    type="file"
                    size={80}
                    className="form-control uploader"
                    name="attachment[]"
                    multiple
                    accept="image/jpeg, image/bmp, image/x-png, image/png, image/gif, video/mp4, video/mpeg, audio/mpeg, application/ogg, audio/mp4, audio/mp3"
                    id="upload-img"
                    // onChange={(e) => AttachmenthandleChange(e)}
                  />
                  {/* </label> */}
                </div>
                {/* {type == "Video" ? <></> : <></>} */}
                <div className="input-group input-group-sm mb-3 ">
                  {/* <label className="upload-btn" id="uploadImg"> */}
                  {/* {attachment} */}
                  {/* <img
                            height="100%"
                            width="100%"
                            src={attachment}
                            alt="img"
                            className="pb-3"
                    /> */}
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Thumbnail
                    </span>
                  </div>
                  <input
                    type="file"
                    size={80}
                    className="form-control uploader"
                    name="thumbnail[]"
                    multiple
                    accept="image/png, image/gif, image/jpeg"
                    id="upload-img"
                    // onChange={(e) => ThumbnailhandleChange(e)}
                  />
                  {/* </label> */}
                </div>
                <div className="add-button">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    // onClick={createPost}
                  >
                    Create{" "}
                  </button>
                </div>
              </div>
              {/* <p className="pass-text">Add Category</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <form >
                                <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <div className="login-button mt-2" style={{ width: "40%" }}>
                                        <button type="button" onClick={() => accountDelete(id)} className="cta-btn col-reds w-100">Delete</button>
                                    </div>
                                    <div className="login-button mt-2" style={{ width: "40%" }} >
                                        <button type="button" onClick={closeModal} className="cta-btn col-reds w-100">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div> */}
            </>
          ) : modalType == "edit" ? (
            <>
              <p className="pass-text">Edit Post</p>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              {id ? (
                <>
                  <div className="modal-body">
                    <div className="input-group input-group-sm mb-3 ">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-sm"
                        >
                          Title
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Category"
                        value={edittitle}
                      //  onChange={(e) => setEdittitle(e.target.value)}
                      />
                    </div>
                    <div className="input-group input-group-sm mb-3 ">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-sm"
                        >
                          Text
                        </span>
                      </div>
                      <textarea
                        type="text"
                        className="form-control"
                        aria-label="Text"
                        value={edittext}
                      //  onChange={(e) => setEdittext(e.target.value)}
                      />
                    </div>
                    {/* <div className="input-group input-group-sm mb-3 ">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-sm"
                        >
                          Tags
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="tags"
                        value={edittags}
                        onChange={(e) => setEditTags(e.target.value)}
                      />
                      <button
                        type="button"
                        className="editBtn xy-center m-0 mb-2"
                        onClick={(e) => editTags(e)}
                      >
                        + Add Tags
                      </button>
                    </div> */}
                    {/* {edittagsarray?.map((data, i) => (
                      <>
                        <span
                          style={{
                            color: "black",
                            border: "1px solid",
                            borderRadius: "5px",
                            margin: "5px",
                            padding: "5px",
                          }}
                        >
                          {data}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => removeEditTags(e, i)}
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "100%",
                            fontSize: "18px",
                            background: "transparent",
                            border: 0,
                          }}
                          className="xy-center"
                        >
                          <i className="fa-solid fa-xmark" />
                        </button>
                      </>
                    ))}
                    <br /> */}
                    <div className="input-group input-group-sm mb-3 ">
                      <div className="input-group-prepend category_wrap">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-sm"
                        >
                          Category
                        </span>
                      </div>
                      <div className="category_sectBtn">
                        {preferences?.map((data, index) => (
                          <button
                            className="categoryButton"
                            style={{
                              backgroundColor: editcategory.includes(
                                data?.preference
                              )
                                ? "#204498"
                                : "inherit",
                              color: editcategory.includes(data?.preference)
                                ? "#fff"
                                : "inherit",
                            }}
                            value={data?.preference}
                            //onClick={(e) => editHandleClick(e, index)}
                          >
                            {data.preference}
                          </button>
                        ))}
                      </div>
                      {/* <select
                    name=""
                    id=""
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="select">Select</option>
                    {preferences.map((data) => (
                      <option value={data.preference}>{data.preference}</option>
                    ))}
                  </select> */}
                      {/* <input
                    type="text"
                    className="form-control"
                    aria-label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  /> */}
                    </div>
                    {type == "Article" ? (
                      <></>
                    ) : (
                      <>
                        <div className="input-group input-group-sm mb-3 ">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroup-sizing-sm"
                            >
                              Attachment
                            </span>
                          </div>
                          {type == "Blog" ? (
                            <>
                              <img
                                height={"100%"}
                                width={"100%"}
                                src={`${process.env.REACT_APP_APIIMAGE}${editattachment}`}
                              />
                            </>
                          ) : type == "Video" ? (
                            <>
                              <video
                                height={"100%"}
                                width={"100%"}
                                controls
                                src={`${process.env.REACT_APP_APIIMAGE}${editattachment}`}
                              />
                            </>
                          ) : type == "Audio" ? (
                            <>
                              <audio
                                controls
                                src={`${process.env.REACT_APP_APIIMAGE}${editattachment}`}
                                alt="audio"
                              />
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="input-group input-group-sm mb-3 ">
                          {/* <label className="upload-btn" id="uploadImg"> */}
                          {/* {attachment} */}
                          {/* <img
                            height="100%"
                            width="100%"
                            src={attachment}
                            alt="img"
                            className="pb-3"
                    /> */}
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroup-sizing-sm"
                            >
                              Attachment
                            </span>
                          </div>
                          {type == "Blog" ? (
                            <>
                              <input
                                type="file"
                                size={80}
                                className="form-control uploader"
                                name="attachment[]"
                                multiple
                                accept="image/jpeg, image/bmp, image/x-png, image/png, image/gif"
                                id="upload-img"
                               // onChange={(e) => AttachmenthandleChange(e)}
                              />
                            </>
                          ) : type == "Video" ? (
                            <>
                              <input
                                type="file"
                                size={80}
                                className="form-control uploader"
                                name="attachment[]"
                                multiple
                                accept="video/mp4, video/mpeg"
                                id="upload-img"
                                //onChange={(e) => AttachmenthandleChange(e)}
                              />
                            </>
                          ) : type == "Audio" ? (
                            <>
                              <input
                                type="file"
                                size={80}
                                className="form-control uploader"
                                name="attachment[]"
                                multiple
                                accept="audio/mpeg, application/ogg, audio/mp4, audio/mp3"
                                id="upload-img"
                               // onChange={(e) => AttachmenthandleChange(e)}
                              />
                            </>
                          ) : (
                            <></>
                          )}

                          {/* </label> */}
                        </div>
                      </>
                    )}

                    {/* {type == "Video" ? <></> : <></>} */}
                    {type == "Video" ? (
                      <>
                        <div className="input-group input-group-sm mb-3 ">
                          {/* <label className="upload-btn" id="uploadImg"> */}
                          {/* {attachment} */}
                          {/* <img
                            height="100%"
                            width="100%"
                            src={attachment}
                            alt="img"
                            className="pb-3"
                    /> */}
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroup-sizing-sm"
                            >
                              Thumbnail
                            </span>
                          </div>
                          <input
                            type="file"
                            size={80}
                            className="form-control uploader"
                            name="thumbnail[]"
                            multiple
                            accept="image/png, image/gif, image/jpeg"
                            id="upload-img"
                          // onChange={(e) => ThumbnailhandleChange(e)}
                          />
                          {/* </label> */}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="add-button">
                      <button
                        className="btn btn-primary"
                        type="submit"
                       // onClick={EditPost}
                      >
                        Edit Post{" "}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {/* <p className="pass-text">Add Category</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <form >
                                <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <div className="login-button mt-2" style={{ width: "40%" }}>
                                        <button type="button" onClick={() => accountDelete(id)} className="cta-btn col-reds w-100">Delete</button>
                                    </div>
                                    <div className="login-button mt-2" style={{ width: "40%" }} >
                                        <button type="button" onClick={closeModal} className="cta-btn col-reds w-100">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div> */}
            </>
          ) : (
            <></>
          )}
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: posts ? "3%" : "12%",
          paddingBottom: "50px",
        }}
      >
        <section className="coupon-sec-2">
          <div className="container tableContainer">
            <div className="title_txtSection">
              <h1 className="titleTxt">All Posts</h1>
              <button
                className="excel-btn col-reds w-10 pt-1 pb-1"
                onClick={() => viewModal(null, "add")}
              >
                Add Post
              </button>
            </div>
          </div>
        </section>

      

      </div>
    </>
  );
};

export default AddCategory;
