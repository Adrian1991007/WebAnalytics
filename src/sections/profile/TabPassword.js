import { useState } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { openSnackbar } from 'store/reducers/snackbar';
import { isNumber, isLowercaseChar, isUppercaseChar, isSpecialChar, minLength } from 'utils/password-validation';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import { CheckOutlined, EyeOutlined, EyeInvisibleOutlined, LineOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import useAuth from 'hooks/useAuth';
import { getChangePasswordErrorDescription } from 'utils/errorDescription';

// ==============================|| TAB - PASSWORD CHANGE ||============================== //

const TabPassword = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { changePassword } = useAuth();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <MainCard title={intl.formatMessage({ id: 'lbl.change_password' })}>
      <Formik
        initialValues={{
          old: '',
          password: '',
          confirm: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          old: Yup.string().required(intl.formatMessage({ id: 'lbl.old_password_required' })),
          password: Yup.string()
            .required(intl.formatMessage({ id: 'lbl.new_password_required' }))
            .notOneOf([Yup.ref('old'), null], intl.formatMessage({ id: 'lbl.passwords_not_match' }))
            .matches(
              /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
              intl.formatMessage({ id: 'lbl.password_requirements' })
            ),
          confirm: Yup.string()
            .required(intl.formatMessage({ id: 'lbl.confirm_password_required' }))
            .oneOf([Yup.ref('password'), null], intl.formatMessage({ id: 'lbl.password_tab_match' }))
        })}
        onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
          try {
            await changePassword(values.old, values.password);
            dispatch(
              openSnackbar({
                open: true,
                message: intl.formatMessage({ id: 'lbl.password_changhed' }),
                variant: 'alert',
                alert: {
                  color: 'success'
                },
                close: false
              })
            );

            resetForm();
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: getChangePasswordErrorDescription(err) });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item container spacing={3} xs={12} sm={6}>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="password-old">{intl.formatMessage({ id: 'lbl.old_password' })}</InputLabel>
                    <OutlinedInput
                      placeholder={intl.formatMessage({ id: 'ph.enter_old_password' })}
                      id="password-old"
                      type={showOldPassword ? 'text' : 'password'}
                      value={values.old}
                      name="old"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                            color="secondary"
                          >
                            {showOldPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputProps={{}}
                    />
                    {touched.old && errors.old && (
                      <FormHelperText error id="password-old-helper">
                        {errors.old}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="password-password">{intl.formatMessage({ id: 'lbl.new_password' })}</InputLabel>
                    <OutlinedInput
                      placeholder={intl.formatMessage({ id: 'ph.enter_new_password' })}
                      id="password-password"
                      type={showNewPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                            color="secondary"
                          >
                            {showNewPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputProps={{}}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="password-password-helper">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="password-confirm">{intl.formatMessage({ id: 'lbl.confirm_password' })}</InputLabel>
                    <OutlinedInput
                      placeholder={intl.formatMessage({ id: 'ph.enter_confirm_password' })}
                      id="password-confirm"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={values.confirm}
                      name="confirm"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                            color="secondary"
                          >
                            {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {touched.confirm && errors.confirm && (
                      <FormHelperText error id="password-confirm-helper">
                        {errors.confirm}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ p: { xs: 0, sm: 2, md: 4, lg: 5 } }}>
                  <Typography variant="h5">{intl.formatMessage({ id: 'lbl.password_must_contain' })}</Typography>
                  <List sx={{ p: 0, mt: 1 }}>
                    <ListItem divider>
                      <ListItemIcon sx={{ color: minLength(values.password) ? 'success.main' : 'inherit' }}>
                        {minLength(values.password) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary={intl.formatMessage({ id: 'lbl.min_characters' })} />
                    </ListItem>
                    <ListItem divider>
                      <ListItemIcon sx={{ color: isLowercaseChar(values.password) ? 'success.main' : 'inherit' }}>
                        {isLowercaseChar(values.password) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary={intl.formatMessage({ id: 'lbl.min_lower_ch' })} />
                    </ListItem>
                    <ListItem divider>
                      <ListItemIcon sx={{ color: isUppercaseChar(values.password) ? 'success.main' : 'inherit' }}>
                        {isUppercaseChar(values.password) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary={intl.formatMessage({ id: 'lbl.min_upper_ch' })} />
                    </ListItem>
                    <ListItem divider>
                      <ListItemIcon sx={{ color: isNumber(values.password) ? 'success.main' : 'inherit' }}>
                        {isNumber(values.password) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary={intl.formatMessage({ id: 'lbl.min_number' })} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ color: isSpecialChar(values.password) ? 'success.main' : 'inherit' }}>
                        {isSpecialChar(values.password) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary={intl.formatMessage({ id: 'lbl.min_special' })} />
                    </ListItem>
                  </List>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                  <Button variant="outlined" color="secondary" onClick={resetForm}>
                    {intl.formatMessage({ id: 'lbl.cancel' })}
                  </Button>
                  <Button disabled={isSubmitting || Object.keys(errors).length !== 0} type="submit" variant="contained">
                    {intl.formatMessage({ id: 'lbl.change_password' })}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </MainCard>
  );
};

export default TabPassword;
