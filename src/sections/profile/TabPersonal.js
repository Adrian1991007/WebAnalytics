// material-ui
import { useOutletContext } from 'react-router';

import { useDispatch } from 'react-redux';

// material-ui
import { Box, Button, FormHelperText, Grid, InputLabel, Stack, TextField } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import { openSnackbar } from 'store/reducers/snackbar';
import MainCard from 'components/MainCard';
import { useIntl } from 'react-intl';
import useAuth from 'hooks/useAuth';

// assets

function useInputRef() {
  return useOutletContext();
}

// ==============================|| TAB - PERSONAL ||============================== //

const TabPersonal = () => {
  const intl = useIntl();
  const { user, updateDisplayName } = useAuth();
  const dispatch = useDispatch();
  const inputRef = useInputRef();

  return (
    <MainCard
      content={false}
      title={intl.formatMessage({ id: 'lbl.personal_information' })}
      sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}
    >
      <Formik
        enableReinitialize
        initialValues={{
          displayName: user?.displayName || '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          displayName: Yup.string()
            .max(255)
            .required(intl.formatMessage({ id: 'lbl.username_required' }))
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          try {
            updateDisplayName(values.displayName);
            dispatch(
              openSnackbar({
                open: true,
                message: intl.formatMessage({ id: 'lbl.profile_updated_successfully' }),
                variant: 'alert',
                alert: {
                  color: 'success'
                },
                close: false
              })
            );
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="username-signup">{intl.formatMessage({ id: 'lbl.username' })}</InputLabel>
                    <TextField
                      fullWidth
                      id="username-signup"
                      value={values.displayName}
                      name="displayName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={intl.formatMessage({ id: 'ph.enter_username' })}
                      autoFocus
                      inputRef={inputRef}
                    />
                    {touched.displayName && errors.displayName && (
                      <FormHelperText error id="username-signup-helper">
                        {errors.displayName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                <Button variant="outlined" color="secondary" onClick={resetForm}>
                  {intl.formatMessage({ id: 'lbl.cancel' })}
                </Button>
                <Button disabled={isSubmitting || Object.keys(errors).length !== 0} type="submit" variant="contained">
                  {intl.formatMessage({ id: 'lbl.update_profile' })}
                </Button>
              </Stack>
            </Box>
          </form>
        )}
      </Formik>
    </MainCard>
  );
};

export default TabPersonal;
