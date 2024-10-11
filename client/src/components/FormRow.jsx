const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        defaultValue={defaultValue || ""}
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        className="form-input"
        // required
      />
    </div>
  );
};
export default FormRow;
