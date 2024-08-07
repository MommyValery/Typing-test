import styled from "styled-components";

const Select = ({defaultValue, options, ...props}) => {
  return (
    <select defaultValue={defaultValue} {...props}>
      {options.map(option => {
        return (
          <option key={option.value} value={option.value}>{option.name}</option>
        );
      })}
    </select>
  )
}

const StyledSelect = styled(Select)`

 position: relative;
 width: 200px;
 padding: 10px;
 margin: 10px;
 background: gray;
 color: #fff;
 outline: none;
 cursor: pointer;
 font-weight: bold;

`;

export default StyledSelect;