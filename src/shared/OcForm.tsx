import React, { CSSProperties } from "react";
import { map, mapValues } from "lodash";
import Case from "case";
import PhoneNumberTextMask from "./PhoneNumberTextMask";

export interface OcOptionObject {
  label?: string;
  value: any;
}

export type OcFieldOption = OcOptionObject | string | number;

export interface OcFieldConfig extends React.InputHTMLAttributes<any> {
  label?: string;
  helpText?: string;
  confirm?: boolean;
  multiline?: boolean;
  options?: OcFieldOption[];
  adorn?: {
    left?: string;
    right?: string;
  };
}

export type OcFormConfig<OcPartialModel> = {
  [P in keyof OcPartialModel]: OcFieldConfig;
};

export interface OcFormProps<OcModel> {
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
      fields: {
        ...mapValues(props.config, i => i && (i.value as any)),
        ...props.data
      }
    };
  }

  public componentDidUpdate = (prevProps: OcFormProps<OcModel>) => {
    if (!prevProps.data && this.props.data) {
      this.setState({
        fields: {
          ...mapValues(this.props.config, i => i && (i.value as any)),
          ...this.props.data
        }
      });
    }
  };

  public handleInputChange = (field: keyof OcModel) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
        ...mapValues(this.props.config, i => i && (i.value as any)),
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
            ...mapValues(this.props.config, i => i && (i.value as any)),
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

  public render() {
    const { config, title, width } = this.props;
    const { fields, loading, error } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit} style={{ width }}>
        <h3>{title}</h3>
        <div className="flex-form">
          {map(config, (v: OcFieldConfig, k: keyof Partial<OcModel>) => {
            if (!v) return;
            const key = k as string;
            const value = (fields[k] || "") as string;
            const inputStyle: CSSProperties = {};
            const controlStyle: CSSProperties = {};
            if (v.multiline && v.options) {
              console.error(
                `OcForm "${title}" > OcFieldConfig.${k} cannot have both "multiline" and "options" properties.`
              );
              return;
            }
            if (v.type === "tel" && v.options) {
              console.warn(
                `OcForm "${title}" > OcFieldConfig.${k} will ignore property "options" when type = "tel".`
              );
            }
            if (v.width) {
              controlStyle["flexBasis"] = `calc(${v.width} - 12px)`;
            }
            if (v.adorn) {
              if (v.adorn.left) {
                inputStyle["paddingLeft"] = 24;
              }
              if (v.adorn.right) {
                inputStyle["paddingRight"] = 24;
              }
            }
            return (
              <React.Fragment key={key}>
                <div className="form-control" style={controlStyle}>
                  <label htmlFor={`${title}_${key}`}>
                    {v.label || Case.title(key)}
                    {v.required && <span style={{ color: "red" }}> *</span>}
                  </label>
                  {v.multiline ? (
                    <textarea
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
                        <span className="adorn-left">{v.adorn.left}</span>
                      )}
                      {v.type === "tel" ? (
                        <PhoneNumberTextMask
                          style={inputStyle}
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
                      ) : v.options ? (
                        <select
                          style={inputStyle}
                          required={v.required}
                          placeholder={
                            v.placeholder || (v.required ? "" : "Optional")
                          }
                          disabled={v.disabled || v.readOnly || loading}
                          id={`${title}_${key}`}
                          value={value || ""}
                          onChange={this.handleInputChange(k)}
                        >
                          {v.options.map((o, i) => {
                            const isObj = typeof o === "object";
                            return (
                              <option
                                key={i}
                                value={isObj ? (o as OcOptionObject).value : o}
                              >
                                {isObj
                                  ? (o as OcOptionObject).label ||
                                    (o as OcOptionObject).value
                                  : o}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        <input
                          style={inputStyle}
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
                        <span className="adorn-right">{v.adorn.right}</span>
                      )}
                    </div>
                  )}
                  {v.helpText && <p className="help">{v.helpText}</p>}
                </div>
                {v.confirm && (
                  <div className="form-control" style={controlStyle}>
                    <label htmlFor={key}>
                      {`Confirm ${v.label || Case.title(key)}`}
                      {v.required && <span style={{ color: "red" }}> *</span>}
                    </label>
                    <input
                      style={inputStyle}
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
        <div className="form-footer">
          <button type="submit">Submit</button>
          <button type="reset" onClick={this.handleResetClick}>
            Reset
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      </form>
    );
  }
}

export default OcForm;
