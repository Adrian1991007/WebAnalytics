import { FormattedMessage } from 'react-intl';

const getLoginErrorDescription = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      // Adresa de email invalidă
      return <FormattedMessage id="err.invalid_email" />;
    case 'auth/user-disabled':
      // Utilizator dezactivat
      return <FormattedMessage id="err.user_disabled" />;
    case 'auth/user-not-found':
      // Utilizator negăsit
      return <FormattedMessage id="err.user_not_found" />;
    case 'auth/wrong-password':
      // Parolă incorectă
      return <FormattedMessage id="err.wrong_password" />;
    case 'auth/popup-closed-by-user':
      // Fereastra pop-up închisă de către utilizator
      return <FormattedMessage id="err.popup_closed_by_user" />;
    case 'auth/popup-blocked':
      // Fereastra pop-up blocată
      return <FormattedMessage id="err.popup_blocked" />;
    case 'auth/network-request-failed':
      // Eroare de rețea
      return <FormattedMessage id="err.network_request_failed" />;
    default:
      // Eroare necunoscută
      return <FormattedMessage id="err.login_generic_error" />;
  }
};

const getRegisterErrorDescription = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      // Adresa de email deja înregistrată
      return <FormattedMessage id="err.email_already_in_use" />;
    case 'auth/invalid-email':
      // Adresa de email invalidă
      return <FormattedMessage id="err.invalid_email" />;
    case 'auth/weak-password':
      // Parolă slabă
      return <FormattedMessage id="err.password_requirements" />;
    case 'auth/network-request-failed':
      // Eroare de rețea
      return <FormattedMessage id="err.network_request_failed" />;
    default:
      // Eroare necunoscută
      return <FormattedMessage id="err.register_generic_error" />;
  }
};

const getResetPasswordErrorDescription = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      // Adresa de email invalidă
      return <FormattedMessage id="err.invalid_email" />;
    case 'auth/user-not-found':
      // Utilizator negăsit
      return <FormattedMessage id="err.user_not_found" />;
    case 'auth/network-request-failed':
      // Eroare de rețea
      return <FormattedMessage id="err.network_request_failed" />;
    default:
      // Eroare necunoscută
      return <FormattedMessage id="err.reset_password_generic_error" />;
  }
};

const getChangePasswordErrorDescription = (error) => {
  switch (error.code) {
    case 'auth/user-disabled':
      // Utilizator dezactivat
      return <FormattedMessage id="err.user_disabled" />;
    case 'auth/user-not-found':
      // Utilizator negăsit
      return <FormattedMessage id="err.user_not_found" />;
    case 'auth/requires-recent-login':
      // Utilizator negăsit
      return <FormattedMessage id="err.required_relogin" />;
    case 'auth/wrong-password':
      // Parolă incorectă
      return <FormattedMessage id="err.change_password" />;
    default:
      // Eroare necunoscută
      return <FormattedMessage id="err.change_password_generic_error" />;
  }
};

export { getLoginErrorDescription, getRegisterErrorDescription, getResetPasswordErrorDescription, getChangePasswordErrorDescription };
