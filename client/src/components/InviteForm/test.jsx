/**
 * All rights reserved to Lumosys Technology Pvt. Ltd. (C) 2023
 * Written by Isuru Ariyarathna, Senal Fernando, Dinith Fernando & Maheshi Anuradha
 * 2023/09/16
 */

import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Row,
  Col,
  notification,
  Spin,
  Skeleton
} from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../../firebase'
import { collection, doc, getDocs, setDoc } from "firebase/firestore";


import MathsBg from '../../../Assets/Images/MathsBg.jpg'
import LearnImg from '../../../Assets/Images/learnImg.png'

import './style.sass'

// Districts
import Discricts from "../../../Raw/Districts";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification();
  const [classes, setClasses] = useState(null)


  useEffect(() => {
    getClasses()
  }, [])

  const getClasses = async () => {
    const classes = []
    try {
      const querySnapshot = await getDocs(collection(db, "classes"));
      querySnapshot.forEach((doc) => {
        classes.push(doc.data());
      });
      setClasses(classes)
    } catch (error) {
      console.log('Error fetching classes:', error);
    }
  }

  const renderClasses = () => {
    if (classes.length > 6) {
      classes.sort((a, b) => a.order - b.order)
      const mid = Math.ceil(classes.length / 3);
      const firstHalf = classes.splice(0, mid)
      const secondHalf = classes.splice(-mid)
      const thirdHalf = classes.splice(-mid)
      return (
        <>
          <Col>
            {firstHalf.map((classItem) => (
              <Col key={classItem.id}>
                <Checkbox value={classItem.id}>{classItem.name}</Checkbox>
              </Col>
            ))}
          </Col>
          <Col>
            {secondHalf.map((classItem) => (
              <Col key={classItem.id}>
                <Checkbox value={classItem.id}>{classItem.name}</Checkbox>
              </Col>
            ))}
          </Col>
          <Col>
            {thirdHalf.map((classItem) => (
              <Col key={classItem.id}>
                <Checkbox value={classItem.id}>{classItem.name}</Checkbox>
              </Col>
            ))}
          </Col>
        </>
      )
    } else if (classes.length > 3) {
      classes.sort((a, b) => a.order - b.order)
      const half = Math.ceil(classes.length / 2);
      const firstHalf = classes.splice(0, half)
      const secondHalf = classes.splice(-half)
      return (
        <>
          <Col>
            {firstHalf.map((classItem) => (
              <Col key={classItem.id}>
                <Checkbox value={classItem.id}>{classItem.name}</Checkbox>
              </Col>
            ))}
          </Col>
          <Col>
            {secondHalf.map((classItem) => (
              <Col key={classItem.id}>
                <Checkbox value={classItem.id}>{classItem.name}</Checkbox>
              </Col>
            ))}
          </Col>
        </>
      )
    } else {
      return (
        <>
          <Col>
            {classes.map((classItem) => (
              <Col key={classItem.id}>
                <Checkbox value={classItem.id}>{classItem.name}</Checkbox>
              </Col>
            ))}
          </Col>
        </>
      )
    }
  }

  const onFinish = async (values) => {
    await handleUserRegister(values)
  };

  const handleUserRegister = async (values) => {
    const indexNumber = values.indexNumber
    const fname = values.fname
    const lname = values.lname
    const fullname = values.fullname
    const email = values.email
    const password = values.password
    const address = values.address
    const contact = values.contact
    const school = values.school
    const district = values.district
    const attempt = values.attempt.value
    const physicsResult = values.physicsResult.value
    const stream = values.stream.value
    const howDidYouKnow = values.howDidYouKnow.label
    const classes = values.classes

    // register user
    try {
      setIsLoading(true)
      const response = await createUserWithEmailAndPassword(auth, email, password);

      // update profile
      await setDoc(doc(db, "users", response.user.uid), {
        indexNumber: indexNumber,
        fname: fname,
        lname: lname,
        fullname: fullname,
        email: email,
        address: address,
        contact: contact,
        school: school,
        district: district,
        attempt: attempt,
        physicsResult: physicsResult,
        stream: stream,
        howDidYouKnow: howDidYouKnow,
        classes: classes,
        photoURL: '',
        role: 'student',
        uid: response.user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        activeStatus: 'pending',
        isNewUser: true,
      });

      setIsLoading(false)
      openNotificationWithIcon('success')

      setTimeout(() => {
        window.location.href = '/signin'
      }, 3000);

    } catch (error) {
      setIsLoading(false)
      if (error.code === 'auth/email-already-in-use') {
        emailAlreadyExists('error')
      } else {
        openNotificationWithIcon('error')
      }
    }

  }
  const onFinishFailed = (errorInfo) => {
    onFinishFailedError('error')
  };

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: { success: 'Successfully Registered', error: 'Error' }[type],
      description: {
        success: 'Please wait for the admin to approve your account', error: 'Something went wrong'
      }[type],
    });
    getClasses()
  };

  const emailAlreadyExists = (type) => {
    api[type]({
      message: { success: 'Successfully Registered', error: 'Error' }[type],
      duration: 10,
      description: {
        success: 'Please wait for the admin to approve your account',
        error: 'The email address is already in use by another account, please reload the page try again with another email address.',
      }[type],
    });
    getClasses()
  }

  const onFinishFailedError = (type) => {
    api[type]({
      message: { success: 'Successfully Registered', error: 'Error' }[type],
      description: {
        success: 'Please wait for the admin to approve your account',
        error: 'Please check the form again and fill the form correctly.',
      }[type],
    });
    getClasses()
  }

  return (
    <div className='signup-page'>
      {contextHolder}
      <Row>
        <Col className='signup-left'>
          <img src={MathsBg} alt='signup' className='bg' />
          <div className='logo'>
            <div className='logo'>
              <a href='/'>
                <h1>Yasalanka</h1>
                <h2
                  style={{
                    fontSize: '11px',
                  }}
                >Physics</h2>
              </a>
            </div>
          </div>
          <div className='texts'>
            <h3>Welcome to,</h3>
            <h1>Yasalanka Physics</h1>
            <h4>Education Hub</h4>

            <h5> Let's create your account</h5>
          </div>
          <div className='image'>
            <img src={LearnImg} alt='signup' />
          </div>
        </Col>

        <Col className='signup-right'>
          <Spin spinning={isLoading}>
            <Form
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row span={24} gutter={10} className='form-row'>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    name="indexNumber"
                    label="Index Number given by the Admin"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your index number!',
                      },

                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || /^YS\/[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The input is not a valid index number (e.g., YS/21/01/0001)!'));
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="YS/24/01/0001" className='form-input' />
                  </Form.Item>
                </Col>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    label="Year of your A/L Examination"
                    name="examYear"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your A/L Examinaion Year!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || /^[0-9]{4}$/.test(value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The input is not a valid year (e.g., 2026)!'));
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="2026" />
                  </Form.Item>
                </Col>
              </Row>

              <Row span={24} gutter={10} className='form-row' >
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    name="fname"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your first name!',
                      },
                    ]}
                  >
                    <Input placeholder="Visal" />
                  </Form.Item>
                </Col>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    label="Last Name"
                    name="lname"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your last name!',
                      },
                    ]}
                  >
                    <Input placeholder="Jayarathna" />
                  </Form.Item>
                </Col>
              </Row>

              <Row span={24} gutter={10} className='form-row'>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    name="fullname"
                    label="Full Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your first name!',
                      },
                    ]}
                  >
                    <Input placeholder="A.B.C Visal Jayarathna" />
                  </Form.Item>
                </Col>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    label="Email Address"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Email address!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The input is not a valid Gmail address (e.g., user@gmail.com)!'));
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="visaljayarathna@gmail.com" />
                  </Form.Item>
                </Col>
              </Row>

              <Row span={24} gutter={10} className='form-row'>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your password',
                      },
                      // should be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character
                      { min: 8 },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[^\da-zA-Z]).{8,}$/.test(value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Password should be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character!'));
                        },
                      }),

                    ]}
                  >
                    <Input.Password
                      placeholder="Input password"
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </Col>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    label="Confirm Password"
                    name="conPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Email address!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Input password"
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row span={24} gutter={10} className='form-row'>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    name="address"
                    label="Home Address"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your home address!',
                      },
                    ]}
                  >
                    <Input placeholder="114, Madanwala , Hanguranketha" />
                  </Form.Item>
                </Col>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    label="Contact Number"
                    name="contact"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your contact number!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || /^0[0-9]{9}$/.test(value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The input is not a valid phone number (e.g., 0XX XXXX XXX)!'));
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="0XX XXXX XXX" />
                  </Form.Item>
                </Col>
              </Row>

              <Row span={24} gutter={10} className='form-row'>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    name="school"
                    label="School"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your school!',
                      },
                    ]}
                  >
                    <Input placeholder="Poramadulla Central College" />
                  </Form.Item>
                </Col>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    label="District"
                    name="district"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your district!',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select a Discrict"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={
                        Discricts.map((district) => ({
                          value: district,
                          label: district,
                        }))
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row span={24} gutter={10} className='form-row'>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    name="attempt"
                    label="Your Attempt Shy in 2023"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your Attempt Shy in 2023!',
                      },
                    ]}
                  >
                    <Select
                      labelInValue
                      placeholder="Select a Attempt Shy in 2023"
                      options={[
                        {
                          value: '1',
                          label: '1st',
                        },
                        {
                          value: '2',
                          label: '2nd',
                        },
                        {
                          value: '3',
                          label: '3rd',
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    label="Your result for physics in last shy"
                    name="physicsResult"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your result for physics in last shy!',
                      },
                    ]}
                  >
                    <Select
                      labelInValue
                      placeholder="Select a result for physics in last shy"
                      options={[
                        {
                          value: 'A',
                          label: 'A',
                        },
                        {
                          value: 'B',
                          label: 'B',
                        },
                        {
                          value: 'C',
                          label: 'C',
                        },
                        {
                          value: 'S',
                          label: 'S',
                        },
                        {
                          value: 'F',
                          label: 'F',
                        },
                        {
                          value: 'firstShy',
                          label: 'First shy',
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row span={24} gutter={10} className='form-row'>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    name="stream"
                    label="Your subject stream"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your subject stream!',
                      },
                    ]}
                  >
                    <Select
                      labelInValue
                      placeholder="Select a subject stream"
                      options={[
                        {
                          value: 'maths',
                          label: 'Maths',
                        },
                        {
                          value: 'bio',
                          label: 'Bio',
                        },
                        {
                          value: 'ict',
                          label: 'ICT',
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col className='row-col'>
                  <Form.Item
                    className='form-item'
                    label="How did you know about our class"
                    name="howDidYouKnow"
                    rules={[
                      {
                        required: true,
                        message: 'Please select how did you know about our class!',
                      },
                    ]}
                  >
                    <Select
                      labelInValue
                      placeholder="Select a how did you know about our class"
                      options={[
                        {
                          value: 'fromAFriend',
                          label: 'From a friend',
                        },
                        {
                          value: 'fromFacebook',
                          label: 'From Facebook',
                        },
                        {
                          value: 'fromInstagram',
                          label: 'From Instagram',
                        },
                        {
                          value: 'fromYouTube',
                          label: 'From YouTube',
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row span={24} gutter={10} className='form-row'>
                <Form.Item
                  className='form-item'
                  // className="form-bottom"
                  label={
                    <span>
                      Classes&nbsp;
                      <Button
                        type="default"
                        size="small"
                        onClick={getClasses}
                      >
                        Reload
                      </Button>
                    </span>
                  }
                  name="classes"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your class/s!',
                    },
                  ]}
                >
                  <Checkbox.Group
                    style={{
                      width: '100%',
                      margin: '0 0 0 1em',
                    }}
                  >
                    <Row span={24}
                      gutter={20}
                    >
                      {classes
                        ?
                        renderClasses()
                        :
                        <Skeleton
                          active
                          paragraph={{ rows: 3 }}
                          title={false}
                          size="small"
                        />}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              </Row>
              <Row span={24}
                className='form-row submit-row'
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Col>
                  <Form.Item className='form-item'>
                    <Button className='form-button' style={{
                      width: '200px',
                      padding: '1.5em',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }} type="primary" htmlType="submit"
                    >
                      Register
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <div className="sign-up">
                <h1>Already have an account <a href="/signin">Sign in</a></h1>
              </div>
            </Form>
          </Spin>
        </Col>
      </Row>
    </div>
  )
}

export default Signup