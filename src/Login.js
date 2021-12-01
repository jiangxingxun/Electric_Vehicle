import React from 'react';
import Router from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: '0 25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  circular: {
    color: '#fff',
    marginRight: '15px'
  }
}));

const validateUsername = username => {
  if (!username) return '请输入用户名';
  if (username !== 'root') return '请输入正确的用户名';
  return '';
};

const validatePassword = password => {
  if (!password) return '请输入密码';
  if (password !== '1234') return '请输入正确的密码';
  return '';
};

const Login = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({ username: '', password: '' });
  const [usernameError, setUsernameError] = React.useState({
    status: false,
    msg: '用户名'
  });
  const [passwordError, setPasswordError] = React.useState({
    status: false,
    msg: '密码'
  });

  const handleChange = name => e => {
    setState({
      ...state,
      [name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validateUsername(state.username)) {
      setUsernameError({ status: true, msg: validateUsername(state.username) });
    } else {
      setUsernameError({ status: false, msg: '用户名' });
    }
    if (validatePassword(state.password)) {
      setPasswordError({ status: true, msg: validatePassword(state.password) });
      return;
    } else {
      setPasswordError({ status: false, msg: '密码' });
    }

    Router.push('/overview');
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h6">
        请登录
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          error={usernameError.status}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label={usernameError.msg}
          name="username"
          autoFocus
          onChange={handleChange('username')}
        />
        <TextField
          error={passwordError.status}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label={passwordError.msg}
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChange('password')}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          {/* <CircularProgress
            color="primary"
            className={classes.circular}
            size={20}
          /> */}
          登录
        </Button>
      </form>
    </div>
  );
};

export default Login;
