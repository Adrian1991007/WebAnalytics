/**
 * Password validator for login pages
 */

// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
// const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);
const isSecure = (number) =>
  new RegExp(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
  if (count < 2) return { label: 'lbl.poor', color: 'error.main', id: 0 };
  if (count < 3) return { label: 'lbl.weak', color: 'warning.main', id: 1 };
  if (count < 4) return { label: 'lbl.normal', color: 'warning.dark', id: 2 };
  if (count < 5) return { label: 'lbl.good', color: 'success.main', id: 3 };
  if (count < 6) return { label: 'lbl.strong', color: 'success.dark', id: 4 };
  return { label: 'lbl.poor', color: 'error.main' };
};

// password strength indicator
export const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 4) strengths += 1;
  if (number.length > 6) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (isSecure(number)) strengths += 1;
  return strengths;
};
