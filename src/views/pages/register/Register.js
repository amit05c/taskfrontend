import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
let initialvalue = {
  username: '',
  email: '',
  password: '',
  confirmpass: '',
}
const Register = () => {
  const [data, setData] = useState(initialvalue)
  const navigate = useNavigate()
  const [pic, setPic] = useState()
  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSignup = async () => {
    if (data.username == '' || data.password == '' || data.email == '' || data.repeatpass == '') {
      alert('Enter all the fieds')
    } else if (data.password !== data.repeatpass) {
      alert('Password not matching')
    } else {
      await axios
        .post('https://kind-toad-clothes.cyclic.app/user/register', { ...data, pic })
        .then((res) => {
          if (res.data.message == 'Success') {
            setData(initialvalue)
            navigate('/')
          }
        })
        .catch((err) => alert(err.response.data.Error))
    }
  }

  const postDetails = (pics) => {
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'connect_app')
      data.append('cloud_name', 'amitconnectapp')
      fetch('https://api.cloudinary.com/v1_1/amitconnectapp/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString())
          console.log(data.url.toString())
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      name="username"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="repeatpass"
                      onChange={handleChange}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      {/* <CIcon icon={cilLockLocked} /> */}
                      Image
                    </CInputGroupText>
                    <CFormInput
                      type="file"
                      accept="image/*"
                      onChange={(e) => postDetails(e.target.files[0])}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleSignup}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
