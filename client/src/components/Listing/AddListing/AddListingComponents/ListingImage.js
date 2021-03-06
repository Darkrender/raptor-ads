import React from 'react';
import { Form, Input, Icon } from 'semantic-ui-react';

const ListingImage = ({ onClick, onChange, image, getFormClass }) =>
  <Form.Field className={getFormClass('image')}>
    <Input
      icon={<Icon onClick={() => onClick(image)} name="plus" inverted circular link />}
      placeholder="Add image URL here"
      value={image}
      name="image"
      onChange={e => onChange(e)}
    />
  </Form.Field>;

ListingImage.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  image: React.PropTypes.string.isRequired,
  getFormClass: React.PropTypes.func.isRequired,
};


export default ListingImage;
