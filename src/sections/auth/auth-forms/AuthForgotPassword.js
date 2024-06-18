import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { useIntl } from 'react-intl';

import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';
import { getResetPasswordErrorDescription } from 'utils/errorDescription';

const AuthForgotPassword = () => {
  const intl = useIntl();
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resetPassword } = useAuth();

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(intl.formatMessage({ id: 'lbl.email_invalid' }))
            .max(255)
            .required(intl.formatMessage({ id: 'lbl.email_required' }))
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await resetPassword(values.email).then(
              () => {
                setStatus({ success: true });
                setSubmitting(false);
                dispatch(
                  openSnackbar({
                    open: true,
                    message: intl.formatMessage({ id: 'lbl.check_email' }),
                    variant: 'alert',
                    alert: {
                      color: 'success'
                    },
                    close: false
                  })
                );
                setTimeout(() => {
                  navigate('/check-mail', { replace: true });
                }, 1500);
              },
              (err) => {
                setStatus({ success: false });
                setErrors({ submit: getResetPasswordErrorDescription(err) });
                setSubmitting(false);
              }
            );
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: getResetPasswordErrorDescription(err) });
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
                  <InputLabel htmlFor="email-forgot">{intl.formatMessage({ id: 'lbl.email_address' })}</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-forgot"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'ph.enter_email_address' })}
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-forgot">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12} sx={{ mt: -2 }}>
                <Typography variant="caption">{intl.formatMessage({ id: 'lbl.check_spam' })}</Typography>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {intl.formatMessage({ id: 'lbl.send_password_reset' })}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthForgotPassword;
