import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, CardActions, Collapse, Divider, Typography } from '@mui/material';

// third-party
import { CopyToClipboard } from 'react-copy-to-clipboard';

// project import
import SyntaxHighlight from './SyntaxHighlight';
import IconButton from 'components/@extended/IconButton';

// assets
import { CodeOutlined, CopyOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'react-redux';

// ==============================|| CLIPBOARD & HIGHLIGHTER   ||============================== //

const Highlighter = ({ codeString, codeHighlight }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [highlight, setHighlight] = useState(codeHighlight);

  return (
    <>
      <CardActions>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CopyToClipboard
            text={codeString}
            onCopy={() => {
              dispatch(
                openSnackbar({
                  open: true,
                  message: intl.formatMessage({ id: 'lbl.copy_confirmation' }),
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
            }}
          >
            <IconButton color="secondary" size="small" sx={{ fontSize: '0.875rem', width: 'auto' }}>
              <CopyOutlined />
              <Typography ml="0.5rem">{intl.formatMessage({ id: 'lbl.copy_the_source' })}</Typography>
            </IconButton>
          </CopyToClipboard>
          <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />
          <IconButton
            sx={{ fontSize: '0.875rem', width: 'auto' }}
            color={highlight ? 'primary' : 'secondary'}
            onClick={() => setHighlight(!highlight)}
          >
            <CodeOutlined />
            <Typography ml="0.5rem">{intl.formatMessage({ id: 'lbl.show_the_exemple' })}</Typography>
          </IconButton>
        </Box>
      </CardActions>
      <Collapse in={highlight}>{highlight && <SyntaxHighlight>{codeString}</SyntaxHighlight>}</Collapse>
    </>
  );
};

Highlighter.propTypes = {
  codeHighlight: PropTypes.bool,
  codeString: PropTypes.string
};

export default Highlighter;
