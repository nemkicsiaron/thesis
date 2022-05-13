import React from "react";
import PropTypes from "prop-types";
import "./ToggleSwitch.scss";

/*
Toggle Switch Component
Note: id, checked and onChange are required for ToggleSwitch component to function. The props name, small, disabled
and optionLabels are optional.
Usage: <ToggleSwitch id="id" checked={value} onChange={checked => setValue(checked)}} />
*/


interface ToggleSwitchIntrface {id: string, onChange: any, checked: boolean, name: string, small: boolean, disabled: boolean, optionLabels: any}

const ToggleSwitch = (props: ToggleSwitchIntrface) => {
  function handleKeyPress(e: any) {
    if (e.keyCode !== 32) return;

    e.preventDefault();
    props.onChange(!props.checked);
  }

  return (
    <div className={"toggle-switch" + (props.small ? " small-switch" : "")}>
      <input
        type="checkbox"
        name={props.name}
        className="toggle-switch-checkbox"
        id={props.id}
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
        disabled={props.disabled}
      />
      {props.id ? (
        <label
          className="toggle-switch-label"
          tabIndex={props.disabled ? -1 : 1}
          onKeyDown={(e) => handleKeyPress(e)}
          htmlFor={props.id}
        >
          <span
            className={
              props.disabled
                ? "toggle-switch-inner toggle-switch-disabled"
                : "toggle-switch-inner"
            }
            data-yes={props.optionLabels[0]}
            data-no={props.optionLabels[1]}
            tabIndex={-1}
          />
          <span
            className={
              props.disabled
                ? "toggle-switch-switch toggle-switch-disabled"
                : "toggle-switch-switch"
            }
            tabIndex={-1}
          />
        </label>
      ) : null}
    </div>
  );
};

// Set optionLabels for rendering.
ToggleSwitch.defaultProps = {
  optionLabels: ["Yes", "No"]
};


ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  optionLabels: PropTypes.array,
  small: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ToggleSwitch;
