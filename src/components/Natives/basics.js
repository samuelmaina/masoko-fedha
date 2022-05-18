import { Typography, Col, Row, Select } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const createTitle = function (level, titleText, className = "") {
  return (
    <Title level={level} className={className}>
      {titleText}
    </Title>
  );
};

const createColumn = function (children, className = "") {
  return <Col className={className} children={children}></Col>;
};

const createParagraph = function (content, className = "") {
  return <p className={className}> {content}</p>;
};

const createSelect = function (
  children,
  placeholder,
  onChange,
  defaultValue = "",
  className = ""
) {
  return (
    <Select
      children={children}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      defaultValue={defaultValue}
    ></Select>
  );
};

const createOption = function (value, className = "", key = "") {
  return (
    <Option value={value} className={className} key={key}>
      {value}
    </Option>
  );
};

const createText = function (text, className = "", key = "") {
  return (
    <Text className={className} key={key}>
      {text}
    </Text>
  );
};
export default {
  createTitle,
  createColumn,
  createParagraph,
  createSelect,
  createOption,
  createText,
};
