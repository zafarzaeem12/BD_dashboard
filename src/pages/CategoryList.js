import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  blockUnblock,
  deleteAccount,
  getAllUsers,
  categorystatus,
  getAllCategory,
  getUserStatus,
  categorydeleted,
  CategoryAdd
} from "../store/slices/userSlice";
import { CSVLink } from "react-csv";
import $ from "jquery";
import "datatables.net";
import Modal from "react-modal";
import Slider, {
  SliderThumb,
  SliderValueLabelProps,
} from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

// function ValueLabelComponent(props: SliderValueLabelProps) {
//     const { children, value } = props;

//     return (
//       <Tooltip enterTouchDelay={0} placement="top" title={value}>
//         {children}
//       </Tooltip>
//     );
//   }

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

//   const marks = [
//     {
//       value: 0,
//     },
//     {
//       value: 20,
//     },
//     {
//       value: 37,
//     },
//     {
//       value: 100,
//     },
//   ];

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#3880ff" : "#3880ff",
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

Modal.setAppElement("#root");
const CategoryList = () => {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [form, setForm] = useState();
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);
  const status = useSelector(getUserStatus);
  const [userDetail, setUserDetail] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState();
  const [name, setname] = useState("");
  // var csvData = [
  //     ["Name", "Email", "Number", "State", "Verified", "Zip Code", "Role"],
  // ]
  // users?.map((item) =>
  //     csvData.push([`${item?.name}`, `${item?.email}`, `${item?.number}`, `${item?.state}`, `${item?.isVerified}`, `${item?.zipCode}`, `${item?.role}`])
  // )

  console.log("userDetail", userDetail);
  console.log("form", form);
  function viewModal(item, type) {
    setIsOpen(true);
    if (type == "userDetail") {
      setUserDetail(item);
    } else if (type == "delete") {
      setId(item);
    } else if (type == "deleteRow") {
      setId(item);
    } else if (type == "formDetail") {
      setForm(item?.form);
      setname(item?.form?.name);
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
      height: modalType == "formDetail" ? "90%" : "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "auto",
      // scrollbarColor: "red orange",
      // scrollbarWidth: "thin",
    },
  };

  function closeModal() {
    setIsOpen(false);
  }

  // const accountDelete = async (id) => {
  //     try {
  //         await dispatch(deleteAccount(id)).unwrap()
  //         setIsOpen(false)
  //         $('#tableData')
  //             .DataTable().destroy();
  //         try {
  //             Users()
  //         } catch (rejectedValueOrSerializedError) {
  //             console.log(rejectedValueOrSerializedError)
  //         }
  //     } catch (rejectedValueOrSerializedError) {
  //         console.log(rejectedValueOrSerializedError)
  //     }
  // }

  const blockUnblockAccount = async (id) => {
    try {
      const ids = id._id;
      console.log("prev", id.status);
      const status = id.status ? false : true;

      const data = {
        ids,
        status,
      };
      console.log("kkk", data);
      await dispatch(categorystatus(data)).unwrap();
      $("#tableData").DataTable().destroy();
      try {
        Categorys();
        closeModal();
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError);
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  const DeleteCat = async (id) => {
    try {
      const ids = id._id;

      await dispatch(categorydeleted(ids)).unwrap();
      $("#tableData").DataTable().destroy();
      try {
        Categorys();
        closeModal();
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError);
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  const Categorys = async () => {
    try {
      // setUsers(null)
      const response = await dispatch(getAllCategory()).unwrap();
      console.log(response.data);
      setUsers(response?.data);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  function convertIndexToAlphabet(i) {
    var asciiOffset = 97; // ASCII code for 'A'
    return String.fromCharCode(i + asciiOffset);
  }

  const CreatedData = async ( ) => {
    try{
        const data = {
            name
        }
        await dispatch(CategoryAdd(data)).unwrap();
        $('#tableData')
                .DataTable().destroy();
            try {
                Categorys();
                closeModal();
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        
    }catch(err){
        console.log(err)
    }
  }
 
  useEffect(() => {
    let mount = true;
    if (mount) {
      Categorys();
    }
    return () => {
      mount = false;
    };
  }, []);

  useEffect(() => {
    if (users) {
      $("#tableData").DataTable({
        lengthMenu: [10, 25, 50, 100, 200],
        language: {
          emptyTable: "Users Not Found",
        },
        destroy: true,
      });
    }
  }, [users]);

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
          {modalType == "userDetail" ? (
            <>
              <p className="pass-text">User Detail</p>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="modal-body">
                <p>
                  {" "}
                  <b>Image:</b>{" "}
                  {userDetail?.user_image ? (
                    <>
                      <img
                        height="20%"
                        width="20%"
                        style={{ borderRadius: 5 }}
                        src={`${process.env.REACT_APP_APIIMAGE}${userDetail?.user_image}`}
                      ></img>
                    </>
                  ) : (
                    <>No Image Found</>
                  )}
                </p>
                <p>
                  {" "}
                  <b>Name:</b>{" "}
                  {userDetail ? userDetail?.name : <>Name not mentioned</>}
                </p>
                <p>
                  {" "}
                  <b>Email:</b> {userDetail?.email}
                </p>
                <p>
                  {" "}
                  <b>Number:</b>{" "}
                  {userDetail ? (
                    userDetail?.phone_number
                  ) : (
                    <>Number not mentioned</>
                  )}
                </p>
                <p>
                  {" "}
                  <b>Address:</b>{" "}
                  {userDetail?.user_address ? (
                    userDetail?.user_address
                  ) : (
                    <>Address not mentioned</>
                  )}
                </p>
                <p>
                  {" "}
                  <b>City:</b>{" "}
                  {userDetail?.user_city ? (
                    userDetail?.user_city
                  ) : (
                    <>City not mentioned</>
                  )}
                </p>
                <p>
                  {" "}
                  <b>Country:</b>{" "}
                  {userDetail?.user_country ? (
                    userDetail?.user_country
                  ) : (
                    <>Zip Code not mentioned</>
                  )}
                </p>
              </div>
            </>
          ) : modalType == "delete" ? (
            <>
              {id.status == false ? (
                <p className="pass-text">Are you sure you want to Unblock?</p>
              ) : (
                <p className="pass-text">Are you sure you want to Block?</p>
              )}
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
                        onClick={() => {
                          blockUnblockAccount(id);
                        }}
                        className="cta-btn col-reds w-100"
                      >
                        {id?.status === false ? "Unblock" : "Blocks"}
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
          ) : modalType == "deleteRow" ? (
            <>
              <p className="pass-text">Are you sure you want to Delete?</p>

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
                        onClick={() => {
                          DeleteCat(id);
                        }}
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
          ) : modalType == "formDetail" ? (
            <>
              <p className="pass-text">Form Detail</p>
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
                    <label>Category Name</label>
                    <br></br>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Category name"
                      value={name}
                      style={{ backgroundColor: "grey" , width : 400 }}
                      onChange={(e) => setname(e.target.value)}
                    />
                    <br></br>
                  </div>
                </form>
                    <div className="login-button mt-2" style={{ width: "40%" }}>
                      <button
                        type="button"
                        onClick={() => {
                          CreatedData()
                        }}
                        className="cta-btn col-reds w-100"
                      >
                        Create
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

              <br></br>

              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
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
          marginTop: users ? "3%" : "12%",
        }}
      >
        <section className="excel-sec">
          <div className="container">
            <div className="d-flex justify-content-end mt-2 mb-3 pr-3">
              <button
                className="excel-btn col-reds w-10 pt-1 pb-1"
                onClick={(item) => viewModal(item, "formDetail")}
              >
                Add Category
              </button>
            </div>
          </div>
        </section>
        <section className="coupon-sec-2">
          <div className="container tableContainer">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <div className="card shadow mb-4">
                  <div className="card-body">
                    <div className="table-responsive" id="tableready">
                      <h1 className="titleTxt">All Category</h1>
                      <table
                        id="tableData"
                        className="table table-bordered"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        <thead>
                          {users ? (
                            <tr>
                              <th>S.No</th>
                              <th>Name</th>
                              <th>Created date</th>
                              <th>Form</th>
                              <th>Detail</th>
                              <th>Status</th>
                              <th>Delete</th>
                            </tr>
                          ) : (
                            <tr></tr>
                          )}
                        </thead>

                        <tbody>
                          {users?.map((item, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>
                                {item ? item?.name : <>Name not mentioned</>}
                              </td>
                              <td>
                                {moment(item?.createdAt).format("DD-MMM-YYYY")}
                              </td>
                              <td>
                                <span className="edit-icon">
                                  <span
                                    style={{
                                      cursor: "pointer",
                                      fontWeight: "bold",
                                      margin: 10,
                                      fontSize: 13,
                                    }}
                                    onClick={() =>
                                      viewModal(item, "formDetail")
                                    }
                                  >
                                    <i className="fas fa-eye"></i> View
                                  </span>
                                </span>
                              </td>
                              <td>
                                <span className="edit-icon">
                                  <span
                                    style={{
                                      cursor: "pointer",
                                      fontWeight: "bold",
                                      margin: 10,
                                      fontSize: 13,
                                    }}
                                    onClick={() =>
                                      viewModal(item, "userDetail")
                                    }
                                  >
                                    <i className="fas fa-eye"></i> View
                                  </span>
                                </span>
                              </td>
                              <td>
                                <span className="edit-icon">
                                  <span
                                    style={{
                                      cursor: "pointer",
                                      fontWeight: "bold",
                                      margin: 10,
                                    }}
                                    onClick={() => viewModal(item, "delete")}
                                  >
                                    {item?.status === false ? (
                                      <i className="fa fa-unlock-alt">
                                        {" "}
                                        Unblock
                                      </i>
                                    ) : (
                                      <i className="fa fa-solid fa-ban">
                                        {" "}
                                        Block
                                      </i>
                                    )}
                                  </span>
                                  {/* <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => blockUnblockAccount(item?._id)}  >{item?.user_is_blocked === 1 ? <i className="fa fa-unlock-alt"> UnBlock</i> : <i className="fa fa-solid fa-ban"> Block</i>}</span> */}
                                </span>
                              </td>
                              <td>
                                <span className="edit-icon">
                                  <span
                                    style={{
                                      cursor: "pointer",
                                      fontWeight: "bold",
                                      margin: 10,
                                    }}
                                    onClick={() => viewModal(item, "deleteRow")}
                                  >
                                    <i className="fa fa-trash"> Delete</i>
                                  </span>
                                  {/* <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => blockUnblockAccount(item?._id)}  >{item?.user_is_blocked === 1 ? <i className="fa fa-unlock-alt"> UnBlock</i> : <i className="fa fa-solid fa-ban"> Block</i>}</span> */}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default CategoryList;
