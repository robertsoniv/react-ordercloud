import React, { CSSProperties } from "react";
import { map, mapValues } from "lodash";
import Case from "case";
import PhoneNumberTextMask from "./PhoneNumberTextMask";

export interface OcFieldConfig extends React.InputHTMLAttributes<any> {
  label?: string;
  helpText?: string;
  confirm?: boolean;
  multiline?: boolean;
  adorn?: {
    left?: string;
    right?: string;
  };
}

export type OcFormConfig<OcPartialModel> = {
  [P in keyof OcPartialModel]: OcFieldConfig;
};

interface OcFormProps<OcModel> {
  data?: Partial<OcModel>;
  onSubmit: (data: Partial<OcModel>) => Promise<OcModel>;
  config: OcFormConfig<Partial<OcModel>>;
  width?: number | string;
  title: string;
}

interface OcFormState<T> {
  loading: boolean;
  error: string | null;
  fields: Partial<T>;
}

class OcForm<OcModel> extends React.Component<
  OcFormProps<OcModel>,
  OcFormState<OcModel>
> {
  constructor(props: OcFormProps<OcModel>) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      fields: { ...mapValues(props.config, i => i.value as any), ...props.data }
    };
  }

  public componentDidUpdate = (prevProps: OcFormProps<OcModel>) => {
    if (!prevProps.data && this.props.data) {
      this.setState({
        fields: {
          ...mapValues(this.props.config, i => i.value as any),
          ...this.props.data
        }
      });
    }
  };

  public handleInputChange = (field: keyof OcModel) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = e.target.value;
    this.setState(state => ({
      ...state,
      fields: { ...state.fields, [field]: val }
    }));
  };

  public handleResetClick = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState({
      error: null,
      fields: {
        ...mapValues(this.props.config, i => i.value as any),
        ...this.props.data
      }
    });
  };

  public handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    this.props
      .onSubmit(this.state.fields)
      .then(newItem => {
        alert(JSON.stringify(newItem, null, 2));
        this.setState({
          fields: {
            ...mapValues(this.props.config, i => i.value as any),
            ...this.props.data
          }
        });
        console.table(newItem);
      })
      .catch(message => {
        console.log("E", message);
        this.setState({ error: message });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  get inputStyle(): CSSProperties {
    return {
      display: "block",
      width: "100%",
      padding: 12,
      marginBottom: 8,
      minWidth: 90,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      background: "#ddd"
    };
  }

  get textAreaStyle(): CSSProperties {
    return {
      height: 125,
      resize: "vertical"
    };
  }

  get labelStyle(): CSSProperties {
    return {
      display: "block",
      fontWeight: "bold",
      fontSize: "0.8rem",
      margin: "2px 2px 4px"
    };
  }

  get formStyle(): CSSProperties {
    const { width } = this.props;
    return {
      width,
      backgroundColor: "#fff",
      boxShadow: "0 8px 18px 0px rgba(0,0,0,0.4)",
      padding: "1px 16px 16px",
      margin: "0 auto",
      borderRadius: 8
    };
  }

  get fieldsetStyle(): CSSProperties {
    return {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      margin: "0 -6px"
    };
  }

  get buttonStyle(): CSSProperties {
    return {
      flexGrow: 0,
      flexShrink: 0,
      cursor: "pointer",
      padding: "10px 12px",
      background: "#ccc",
      borderStyle: "solid",
      borderColor: "#aaa",
      borderWidth: 0,
      borderRadius: 4,
      fontFamily: "roboto",
      textTransform: "uppercase"
    };
  }

  get submitStyle(): CSSProperties {
    return {
      margin: "0 0 0 8px",
      background: "teal",
      color: "white",
      borderColor: "teal"
    };
  }

  get errorStyle(): CSSProperties {
    return {
      flexGrow: 1,
      flexShrink: 1,
      color: "red",
      display: "inline-block",
      fontSize: "0.8rem",
      margin: "0 8px 0 0"
    };
  }

  get controlStyle(): CSSProperties {
    return {
      margin: "0 6px",
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: "calc(100% - 12px)"
    };
  }

  get helpTextStyle(): CSSProperties {
    return {
      fontSize: "0.7rem",
      color: "#888",
      margin: "-4px 2px 10px"
    };
  }

  get buttonContainerStyle(): CSSProperties {
    return {
      borderTop: "1px solid #ddd",
      margin: "4px -16px 0",
      padding: "12px 16px 0",
      display: "flex",
      flexDirection: "row-reverse",
      flexWrap: "nowrap",
      alignItems: "center",
      flexBasis: "100%"
    };
  }

  get adornLeftStyle(): CSSProperties {
    return {
      color: "#777",
      fontWeight: "bold",
      fontSize: "0.8rem",
      position: "absolute",
      left: 10,
      top: 13,
      zIndex: 1
    };
  }

  get adornRightStyle(): CSSProperties {
    return {
      color: "#777",
      fontWeight: "bold",
      fontSize: "0.8rem",
      position: "absolute",
      right: 10,
      top: 13,
      zIndex: 1
    };
  }

  public render() {
    const { config, title } = this.props;
    const { fields, loading, error } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit} style={this.formStyle}>
        <h3>{title}</h3>
        <div style={this.fieldsetStyle}>
          {map(config, (v: OcFieldConfig, k: keyof Partial<OcModel>) => {
            const key = k as string;
            const value = (fields[k] || "") as string;
            const inputStyleExtend: CSSProperties = {};
            const controlStyleExtend: CSSProperties = {};
            if (v.width) {
              controlStyleExtend["flexBasis"] = `calc(${v.width} - 12px)`;
            }
            if (v.adorn) {
              if (v.adorn.left) {
                inputStyleExtend["paddingLeft"] = 24;
              }
              if (v.adorn.right) {
                inputStyleExtend["paddingRight"] = 24;
              }
            }
            return (
              <React.Fragment key={key}>
                <div
                  className="form-control"
                  style={{ ...this.controlStyle, ...controlStyleExtend }}
                >
                  <label style={this.labelStyle} htmlFor={`${title}_${key}`}>
                    {v.label || Case.title(key)}
                    {v.required && <span style={{ color: "red" }}> *</span>}
                  </label>
                  {v.multiline ? (
                    <textarea
                      style={{ ...this.inputStyle, ...this.textAreaStyle }}
                      readOnly={v.readOnly}
                      placeholder={
                        v.placeholder || (v.required ? "" : "Optional")
                      }
                      required={v.required}
                      disabled={v.disabled || loading}
                      id={`${title}_${key}`}
                      value={value || ""}
                      onChange={this.handleInputChange(k)}
                    ></textarea>
                  ) : (
                    <div style={{ position: "relative" }}>
                      {v.adorn && v.adorn.left && (
                        <span style={this.adornLeftStyle}>{v.adorn.left}</span>
                      )}
                      {v.type === "tel" ? (
                        <PhoneNumberTextMask
                          style={{ ...this.inputStyle, ...inputStyleExtend }}
                          readOnly={v.readOnly}
                          type={v.type}
                          required={v.required}
                          placeholder={
                            v.placeholder || (v.required ? "" : "Optional")
                          }
                          disabled={v.disabled || loading}
                          id={`${title}_${key}`}
                          value={value || ""}
                          onChange={this.handleInputChange(k)}
                        />
                      ) : (
                        <input
                          style={{ ...this.inputStyle, ...inputStyleExtend }}
                          readOnly={v.readOnly}
                          type={v.type}
                          min={v.min}
                          max={v.max}
                          step={v.step}
                          required={v.required}
                          placeholder={
                            v.placeholder || (v.required ? "" : "Optional")
                          }
                          disabled={v.disabled || loading}
                          id={`${title}_${key}`}
                          value={value || ""}
                          onChange={this.handleInputChange(k)}
                        />
                      )}
                      {v.adorn && v.adorn.right && (
                        <span style={this.adornRightStyle}>
                          {v.adorn.right}
                        </span>
                      )}
                    </div>
                  )}
                  {v.helpText && <p style={this.helpTextStyle}>{v.helpText}</p>}
                </div>
                {v.confirm && (
                  <div
                    className="form-control"
                    style={{ ...this.controlStyle, ...controlStyleExtend }}
                  >
                    <label style={this.labelStyle} htmlFor={key}>
                      {`Confirm ${v.label || Case.title(key)}`}
                      {v.required && <span style={{ color: "red" }}> *</span>}
                    </label>
                    <input
                      style={this.inputStyle}
                      readOnly={v.readOnly}
                      type={v.type}
                      min={v.min}
                      max={v.max}
                      step={v.step}
                      disabled={v.disabled || loading}
                      id={`${title}_${key}-confirm`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div style={{ ...this.controlStyle, ...this.buttonContainerStyle }}>
          <button
            type="submit"
            style={{ ...this.buttonStyle, ...this.submitStyle }}
          >
            Submit
          </button>
          <button
            type="reset"
            style={{ ...this.buttonStyle }}
            onClick={this.handleResetClick}
          >
            Reset
          </button>
          {error && <p style={this.errorStyle}>{error}</p>}
        </div>
      </form>
    );
  }
}

export default OcForm;
