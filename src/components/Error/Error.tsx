import * as React from 'react';
import { Icon } from 'antd';

export interface ComponentProps {
  message?: string;
};

/**
 * 显示错误信息
 */
export default class Component extends React.Component<ComponentProps, any> {
  static propTypes = {
    message: React.PropTypes.string,
  };

  render() {
    return (
      <section className="text-c pt-20 pb-20">
        <div style={{ fontSize: '32px' }}><Icon type="frown-o" /></div>
        <h1 className="mt-15">{this.props.message || '404 Not Found'}</h1>
      </section>
    );
  };
};
