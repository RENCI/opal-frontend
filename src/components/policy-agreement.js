import { useState } from 'react';
import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from '@mui/joy';
import { usePreferences } from '@context';
import { Policy } from '@views/policy';

export const PolicyAgreementDialog = () => {
  const [checked, setChecked] = useState(false);
  const { showPolicyAgreementOnStart } = usePreferences()
  const [accepted, setAccepted] = useState(false);

  const dontShowPopup = !showPolicyAgreementOnStart.enabled

  if (dontShowPopup) {
    return
  }

  const handleChangeChecked = event => setChecked(event.target.checked)

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
  };

  const handleClickAccept = () => {
    setAccepted(true);
    if (checked) {
      showPolicyAgreementOnStart.unset()
      return
    }
    showPolicyAgreementOnStart.set()
  }

  return (
    <Modal open={ !accepted } onClose={ handleClose }>
      <ModalDialog role="alertdialog" color="primary" size="md">
        <DialogTitle>OPAL Data Sharing and Use Policy</DialogTitle>
        <Divider />
        <DialogContent sx={{ width: '800px', maxWidth: 'calc(100vw - 4rem)' }}>
          <Policy />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Checkbox
            onChange={ handleChangeChecked }
            checked={ checked }
            label="Don't show on startup"
            sx={{ whiteSpace: 'nowrap'}}
          />
          <Button
            fullWidth
            onClick={ handleClickAccept }
          >Accept and Close</Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};
