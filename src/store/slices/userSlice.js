import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import {extraReducers} from "../reducer/userReducer"

axios.defaults.baseURL = process.env.REACT_APP_APIURL
const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null
console.log(user)
axios.defaults.headers.common['Authorization'] = `Bearer ${user?.admin_authentication}`;
const initialState = {
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    user: user,
    terms: null,
    privacy: null,
    dashboard: null,   
}

axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Dispatch the logout action
        // store.dispatch(logout());
        localStorage.clear();
  
        // Redirect to the login page
        window.location.href = '/admin';
      }
  
      return Promise.reject(error);
    }
  );

export const signinUser = createAsyncThunk('admin/log-in', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`admin/admin-login`, bodyData)
        console.log('response', response.response)
        return response.data
    } catch (error) {
        console.log('error', error.response)
        return rejectWithValue(error.response.data)
    }
})

export const dashboard = createAsyncThunk('get-dashboard-data', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-dashboard-data`)
        // console.log('response.data', response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// export const recentCampaigns = createAsyncThunk('admin/recentCampaigns', async (bodyData = null, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`admin/recentCampaigns`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

export const getAllUsers = createAsyncThunk('get-all-users', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`admin/getallusers`)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getAllReports = createAsyncThunk('get-all-reports', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-all-reports`)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const acceptRejectReport = createAsyncThunk('accept-or-decline-reports', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.post(`accept-or-decline-reports`,bodyData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getAllPosts = createAsyncThunk('get-all-posts', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-all-posts`)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getAllFeedbacks = createAsyncThunk('get-feedbacks', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-feedbacks`)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addPost = createAsyncThunk('admin/create-new-post', async (bodyData = null, { rejectWithValue }) => {
    try {
        // console.log('first', first)
        const response = await axios.post(`admin/create-new-post`, bodyData)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const editPost = createAsyncThunk('admin/edit-post', async (bodyData = null, { rejectWithValue }) => {
    try {
        // console.log('first', first)
        const response = await axios.post(`admin/edit-post`, bodyData)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deletePost = createAsyncThunk('admin/delete-post', async (id, { rejectWithValue }) => {
    try {
        
        const response = await axios.get(`admin/delete-post/${id._id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getPreference = createAsyncThunk('get-preferences', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-preferences`)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addPreference = createAsyncThunk('add-preference', async (bodyData = null, { rejectWithValue }) => {
    try {
        // console.log('first', first)
        const response = await axios.post(`add-preference`, bodyData)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deletePreference = createAsyncThunk('delete-preference', async (id, { rejectWithValue }) => {
    try {
        
        const response = await axios.get(`delete-preference/${id._id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})













//Question
export const getQuestion = createAsyncThunk('get-questions', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-questions`)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addQuestion = createAsyncThunk('add-question', async (bodyData = null, { rejectWithValue }) => {
    try {
        // console.log('first', first)
        const response = await axios.post(`add-question`, bodyData)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deleteQuestion = createAsyncThunk('delete-question', async (id, { rejectWithValue }) => {
    try {
        
        const response = await axios.get(`delete-question/${id._id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})











//Reason
export const getReason = createAsyncThunk('get-reasons', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-reasons`)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addReason = createAsyncThunk('add-reason', async (bodyData = null, { rejectWithValue }) => {
    try {
        // console.log('first', first)
        const response = await axios.post(`add-reason`, bodyData)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deleteReason = createAsyncThunk('delete-reason', async (id, { rejectWithValue }) => {
    try {
        
        const response = await axios.get(`delete-reason/${id._id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})











export const getAllPayments = createAsyncThunk('get-all-payment', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-all-payment`)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getAllEmployers = createAsyncThunk('get-all-employers', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-all-employers`)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getAllEmployees = createAsyncThunk('get-all-employees', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`getallusers`)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getEmployerJobs = createAsyncThunk('get-all-employers-jobs', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-all-employers-jobs/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getEmployersRequest = createAsyncThunk('get-employers-request', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-employers-request`)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// export const getAllBusiness = createAsyncThunk('admin/getAllBusiness', async (bodyData = null, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`admin/getAllBusiness`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const getMarketPlace = createAsyncThunk('admin/allMarketPlaceAds', async (bodyData = null, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`admin/allMarketPlaceAds`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const approveDisapproveAd = createAsyncThunk('admin/approveDisapproveAd', async (bodyData, { rejectWithValue }) => {
//     try {
//         const response = await axios.post(`admin/approveDisapproveAd/${bodyData.id}`, bodyData)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const getReportedPosts = createAsyncThunk('admin/getReportedPosts', async (bodyData = null, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`admin/getReportedPosts`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const approveDisapproveReport = createAsyncThunk('admin/approveDisapproveReport', async (bodyData, { rejectWithValue }) => {
//     try {
//         const response = await axios.post(`admin/approveDisapproveReport/${bodyData.id}`, bodyData)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

export const deleteAccount = createAsyncThunk('admin/deleteAccount', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`admin/deleteAccount/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const approveDisapprove = createAsyncThunk('verify-employer', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`verify-employer/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const blockUnblock = createAsyncThunk('block-unblock-user', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`block-unblock-user/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updatePassword = createAsyncThunk('admin/update-password', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`admin/update-password`, bodyData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updateTerms = createAsyncThunk('update-content/terms_and_conditions', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.put(`update-content/terms_and_conditions`, bodyData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updatePrivacy = createAsyncThunk('update-content/privacy_policy', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.put(`update-content/privacy_policy`, bodyData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const userLogout = createAsyncThunk('admin/log-out', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.post(`admin/logout`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const terms = createAsyncThunk('get-content/terms_and_conditions', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-content/terms_and_conditions`)
        console.log(response.data.data[0].content)
        return response.data.data[0]
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const privacy = createAsyncThunk('get-content/privacy_policy', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-content/privacy_policy`)
        console.log(response.data.data[0].content)
        return response.data.data[0]
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// export const addCategory = createAsyncThunk('admin/categories', async (category, { rejectWithValue }) => {
//     try {

//         const response = await axios.post(`admin/categories`, category)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })


// export const getCategory = createAsyncThunk('admin/allCategories', async (category, { rejectWithValue }) => {
//     try {

//         const response = await axios.get(`/allCategories`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const deleteCategory = createAsyncThunk('admin/deletecategory', async (id, { rejectWithValue }) => {
//     try {
//         const response = await axios.delete(`admin/deletecategory/${id}`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        token: (state) => {
            var user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                state.user = user
            }
        }
    },
    extraReducers
})
export const getUserStatus = (state) => state?.users?.status;
export const getUserError = (state) => state?.users?.error;
export const getUsertoken = (state) => state?.users?.user?.user_authentication;
export const getProfile = (state) => state?.users?.user;
export const getTerms = (state) => state?.users?.terms;
export const getPrivacy = (state) => state?.users?.privacy;
export const getAllCategories = (state) => state?.users?.categories;
export const getAllCharges = (state) => state?.users?.charges;
export const getDashboard = (state) => state?.users?.dashboard;
export const getareaChart = (state) => state?.users?.areaChart;
export const getlineChart = (state) => state?.users?.lineChart;
export const getcampaigns = (state) => state?.users?.campaigns;

export const { token } = userSlice.actions

export default userSlice.reducer