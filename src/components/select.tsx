import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import updateObject from '../helpers/update-object';

const Container = styled.div`
  // border: 1px solid lightgrey;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 1px #d4d9dc;
  margin: 10px;
  padding: 5px;
  max-width: 200px;
`;

const Label = styled.label`
  margin-right: 10px;
`;

// TODO: update styles

const Select = ({ data }: SelectData) => {
  const options = Array.isArray(data.options) ? data.options : [];
  const { pathSegments, obj } = data.bindTo;

  let updateMethod = data.bindTo.updateMethod;
  if (typeof updateMethod !== 'function') {
    updateMethod = updateObject;
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    updateMethod(pathSegments, event.target.value, obj);
  };

  return (
    <Container>
      {data.name ? <Label htmlFor={data.name}>{data.title}</Label> : ''}
      <select name={data.name} onChange={handleChange}>
        {options.map(opt => (
          <Option key={opt.value} opt={opt} />
        ))}
      </select>
    </Container>
  );
};

const Option = ({ opt }: { key: string; opt: SelectOption }) => {
  return <option value={opt.value}>{opt.name}</option>;
};

Select.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    bindTo: PropTypes.shape({
      obj: PropTypes.object.isRequired,
      pathSegments: PropTypes.arrayOf(PropTypes.string).isRequired,
      updateMethod: PropTypes.func,
    }),
  }),
};

interface SelectData {
  data: {
    name?: string;
    title?: string;
    options: SelectOption[];
    bindTo: SelectBindTo;
  };
}

interface SelectOption {
  name: string;
  value: string;
}

interface SelectBindTo {
  obj: object;
  pathSegments: string[];
  updateMethod: (
    pathSegments: string[],
    val: any,
    obj?: { [key: string]: any }
  ) => any;
}

export default Select;
