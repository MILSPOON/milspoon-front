/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import './style.css'
import MotionLogo from '../../components/MotionLogo'
import MilHeader from '../../components/MilHeader'
import Nav from '../../components/Nav'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Account = () => {
  // const [state] = useAsync(getData,[]);
  // const { loading, data, error } = state;
  const [response, setResponse] = useState([])
  useEffect(() => {
    // axios로 받아옴
    axios.get('http://localhost:3000/login')
      // result로 결과 값을 받아옴
      .then(result => {
        const response = result.data
        console.log(result)
        // 받아온 변수를 상태에 넣어줌
        setResponse(response)
      // error나면 catch로 받아오기
      }).catch((e) => {
        console.log(e)
      })
  }, [])

  const [user, setUser] = useState({
    userId: '',
    userPw: ''
  })
  const onChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const onClick = () => {
    setUser({
      userId: '',
      userPw: ''
    })
    axios.post('http://localhost:3000/user', user)
      .then(res => {
        const data = res.data
        if (data === 'id is undefined') alert('id가 올바르지 않습니다.')
        if (data === 'pw is undefined') alert('password가 올바르지 않습니다.')
        if (data === 'login successed') {
          alert('login 성공!')
          sessionStorage.setItem('userId', user.userId)
        };
      })
      .catch(e => console.log(e))
  }
  // if(error) return <div>error</div>;
  // if(loading) return <div>loading</div>;
  // if(!data) return <div>loading almost done</div>;
  if (response === []) return <div>로딩중입니다.</div>

  return (
      <div className='loginWrap'>
        <MilHeader></MilHeader>
        <MotionLogo text="떠 먹여주는 국방지식"></MotionLogo>
        <div className='bottomCtn'>
          <div className="verBar"></div>
          <p>로그인</p>
          <input className="idInput" type='text' name='userId' value={user.userId} onChange={onChange} placeholder='아이디_'/>
          <input className="psInput" type='text' name='userPw' value={user.userPw} onChange={onChange}placeholder='비밀번호_' />
          <button className='loginBtn' onClick={onClick}>로그인</button>
          <p className='accountAskText'>아직 계정이 없으신가요? <span><Link className='accountLinkText' to={'/account/create'}>계정 생성</Link></span></p>
        </div>
        <Nav></Nav>
      </div>
  )
}

export default Account
