import React, {useEffect, useState} from 'react';
import firebase from 'firebase';
import {Button, Table} from 'antd';
import {GoogleOutlined, FacebookOutlined, LogoutOutlined} from '@ant-design/icons';
import {columns} from './constants/tabledata';
import {auth, initializeFirebase} from './utils/initializeFirebase';
import {getTableData} from './api/getTableData';
import {app} from '../src/utils/base';
import './App.css';

initializeFirebase();

const App = () => {
  const providerFBAuth = new firebase.auth.FacebookAuthProvider();
  const providerGoogleAuth = new firebase.auth.GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const loginFB = () => {
    auth()
      .signInWithPopup(providerFBAuth)
      .then(({user}) => {
        setUser(user);
      });
  };

  const loginGoogle = () => {
    auth()
      .signInWithPopup(providerGoogleAuth)
      .then(({user}) => {
        setUser(user);
      });
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  const onChange = async e => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(data => {
      console.log('Uploaded', data);
    });
    setFileUrl(await fileRef.getDownloadURL());
  };

  useEffect(() => {
    getTableData().then(data => {
      setTableData(data);
    });
  }, []);

  return (
    <div className='App'>
      <p>{user ? `Hi, ${user.displayName}!` : 'Please Login !'}</p>
      <Button onClick={loginFB} type='primary' icon={<FacebookOutlined />}>
        Login with Facebook
      </Button>
      <Button type='primary' icon={<GoogleOutlined />} onClick={() => loginGoogle()}>
        Login with Google
      </Button>
      <Button onClick={logout} type='primary' icon={<LogoutOutlined />}>
        Logout
      </Button>
      <div className='tableWrapper'>{user && <Table columns={columns} dataSource={tableData} />}</div>

      <input type='file' onChange={onChange}></input>
      <img src={fileUrl}></img>
    </div>
  );
};

export default App;
