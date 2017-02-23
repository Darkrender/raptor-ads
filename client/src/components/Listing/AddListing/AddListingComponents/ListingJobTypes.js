import React from 'react';
import { Form } from 'semantic-ui-react';
import { jobCategories} from '../../jobCategories';

export const ListingJobTypes = () => {
  return (
    <Form.Select
      className="ui center aligned grid"
      label="Job Type"
      placeholder="Select type of job here"
      options={jobCategories}
    />
  );
};
