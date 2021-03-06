import React from 'react';
import { Icon, Header, Modal, Button } from 'semantic-ui-react';

const ListingDeleteModal = ({ handleDelete }) =>
  <Modal
    trigger={<Button negative>Delete Listing</Button>}
    closeIcon="close"
  >
    <Header icon="trash outline" content="Delete Image" />
    <Modal.Content>
      <p>Are you sure you want to delete this listing?</p>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={() => handleDelete()} color="red">
        <Icon name="checkmark" /> Yes, please delete this listing.
      </Button>
    </Modal.Actions>
  </Modal>;

ListingDeleteModal.propTypes = {
  listingId: React.PropTypes.number.isRequired,
  handleDelete: React.PropTypes.func.isRequired,
};

export default ListingDeleteModal;

