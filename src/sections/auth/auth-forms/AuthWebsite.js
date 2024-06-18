import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { useIntl } from 'react-intl';

import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/@extended/AnimateButton';

const AuthWebsite = () => {
  const intl = useIntl();
  const scriptedRef = useScriptRef();

  const regMatch = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  const { updateWebsite } = useAuth();

  return (
    <>
      <Formik
        initialValues={{
          website: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          website: Yup.string()
            .max(255)
            .required(intl.formatMessage({ id: 'lbl.website_required' }))
            .matches(regMatch, intl.formatMessage({ id: 'lbl.website_invalid' }))
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await updateWebsite(values.website);
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
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
                  <InputLabel htmlFor="website-signup">{intl.formatMessage({ id: 'lbl.website' })}*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.website && errors.website)}
                    id="website-signup"
                    type="website"
                    value={values.website}
                    name="website"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'ph.enter_website' })}
                    inputProps={{}}
                  />
                  {touched.website && errors.website && (
                    <FormHelperText error id="helper-text-website-signup">
                      {errors.website}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {intl.formatMessage({ id: 'lbl.save_website' })}
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

export default AuthWebsite;
