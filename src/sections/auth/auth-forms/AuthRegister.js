import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { useIntl } from 'react-intl';

import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import FirebaseSocial from './FirebaseSocial';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import useAuth from 'hooks/useAuth';
import { getRegisterErrorDescription } from 'utils/errorDescription';

const AuthRegister = () => {
  const intl = useIntl();
  const scriptedRef = useScriptRef();
  const regMatch = /^(https?:\/\/)?www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { firebaseRegister } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  Yup.addMethod(Yup.string, 'passwordLevel', function (errorMessage) {
    return this.test(`password-level`, errorMessage, function () {
      const { path, createError } = this;

      return level.id > 4 || createError({ path, message: errorMessage });
    });
  });

  return (
    <>
      <Formik
        initialValues={{
          displayName: '',
          email: '',
          website: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          displayName: Yup.string()
            .max(255)
            .required(intl.formatMessage({ id: 'lbl.username_required' })),
          website: Yup.string()
            .max(255)
            .required(intl.formatMessage({ id: 'lbl.website_required' }))
            .matches(regMatch, intl.formatMessage({ id: 'lbl.website_invalid' })),
          email: Yup.string()
            .email(intl.formatMessage({ id: 'lbl.email_invalid' }))
            .max(255)
            .required(intl.formatMessage({ id: 'lbl.email_required' })),
          password: Yup.string()
            .max(255)
            .required(intl.formatMessage({ id: 'lbl.password_required' }))
            .passwordLevel(intl.formatMessage({ id: 'lbl.password_requirements' }))
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await firebaseRegister(values);
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: getRegisterErrorDescription(err) });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="username-signup">{intl.formatMessage({ id: 'lbl.username' })}*</InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="username"
                    value={values.displayName}
                    name="displayName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'ph.enter_username' })}
                    fullWidth
                    error={Boolean(touched.displayName && errors.displayName)}
                  />
                  {touched.displayName && errors.displayName && (
                    <FormHelperText error id="helper-text-username-signup">
                      {errors.displayName}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">{intl.formatMessage({ id: 'lbl.email_address' })}*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'ph.enter_email_address' })}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="website-signup">{intl.formatMessage({ id: 'lbl.website' })}*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.website && errors.website)}
                    id="website-signup"
                    value={values.website}
                    name="website"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'ph.enter_website' })}
                  />
                  {touched.website && errors.website && (
                    <FormHelperText error id="helper-website-signup">
                      {errors.website}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">{intl.formatMessage({ id: 'lbl.password' })}</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder={intl.formatMessage({ id: 'ph.enter_password' })}
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level && intl.formatMessage({ id: level.label })}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  {intl.formatMessage({ id: 'lbl.agree_with' })} &nbsp;
                  <Link variant="subtitle2" component={RouterLink}>
                    {intl.formatMessage({ id: 'lbl.terms_of_service' })}
                  </Link>
                  &nbsp; {intl.formatMessage({ id: 'lbl.and' })}&nbsp;
                  <Link variant="subtitle2" component={RouterLink}>
                    {intl.formatMessage({ id: 'lbl.privacy_policy' })}
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {intl.formatMessage({ id: 'lbl.create_account' })}
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">{intl.formatMessage({ id: 'lbl.or' })}</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
