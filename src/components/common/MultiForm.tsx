import React, { Component } from 'react';
import Card from '../layout/Card';
import Button from '../layout/Button';

interface IMultiFormProps {
  mfprefix: string;
  disabled: boolean;
  add: any;
  delete: any;
}

export class MultiForm extends Component<IMultiFormProps> {
  getTitle = (): any => {};
  getTitleInfo = (): any => {};
  getFooterTitle = (): any => {};
  getFooterInfo = (): any => {};
  getForm = (item: any, index: number) => {
    return <></>;
  };
  getEntities = () => {
    return [];
  };

  getFooter = () => {
    return (
      <>
        {this.getFooterTitle()}
        {this.getFooterInfo()}
      </>
    );
  };

  getPrefix = (): string => {
    const dash = '_';
    let prefix = this.props.mfprefix;
    if (prefix) {
      return prefix.endsWith(dash) ? prefix : prefix + dash;
    }
    return '';
  };

  getHeader = () => {
    return (
      <>
        {this.getTitle()}
        {this.getTitleInfo()}
      </>
    );
  };

  getNameWithPrefix = (name: string): string => {
    return this.getPrefix() + name;
  };

  render() {
    return (
      <>
        <Card className="multiformCard">
          <Card.Header className="multiformCard__header">{this.getHeader()}</Card.Header>
          <Button
            className="multiformCard__btnAdd" // oak-col-3
            name={this.getNameWithPrefix('btn_add')}
            onClick={this.props.add}
            disabled={this.props.disabled}
          >
            +
          </Button>
          <Card.Body className="multiformCard__body">
            {this.getEntities() &&
              this.getEntities().map((entity, index) => {
                // console.log(
                //     "Services.service",
                //     Number(service.mnt_type)
                // );
                return (
                  <div key={index} className="multiformCard__row">
                    {this.getForm(entity, index)}
                    <button
                      className="multiformCard__btnDel" //oak-col"
                      name={this.getNameWithPrefix('btn_del-') + index}
                      onClick={this.props.delete}
                    >
                      -
                    </button>
                  </div>
                );
              })}
          </Card.Body>
          <Card.Footer className="multiformCard__footer">
            {this.getFooterTitle() && <>{this.getFooter()}</>}
          </Card.Footer>
        </Card>
      </>
    );
  }
}
