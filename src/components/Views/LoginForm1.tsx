import * as React from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';

// 加载组件样式

const styles = require('./style/LoginForm1.less');

// 定义组件属性接口，验证属性参数类型

interface LoginFormProps {
  form?: any;
  loading: boolean;
  onSubmit: Function;
};

// 定义组件状态接口，验证状态参数类型

interface LoginFormState { };

// 构建组件

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

  constructor(props, context) {
    super(props, context);
  };

  handleSubmit(e: Event) {
    e.preventDefault();
    const _self = this;
    _self.props.form.validateFields(function (errors, values) {
      if (errors) {
        message.error('您的登录表单填写有误！');
        return false;
      }
      if (!values.account) {
        message.error('您的登录帐号不能为空！');
        return false;
      }
      if (!values.password) {
        message.error('您的登录密码不能为空！');
        return false;
      }
      _self.props.onSubmit(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <section className={styles['ant-layout-aside']}>
        <Row className={styles['ant-layout-main']} type="flex" align="middle" justify="space-around">
          <Col span={8}>
            <div className="text-c md-30">
              <h1>欢迎使用"TS-DVA"</h1>
            </div>
            <div className={styles['ant-layout-content']}>
              <Form horizontal onSubmit={this.handleSubmit.bind(this) } style={{ marginTop: '24px' }}>
                <Form.Item { ...formItemLayout } label="登陆帐号">
                  {
                    getFieldDecorator('account', {
                      initialValue: '',
                      rules: [
                        { min: 5, message: '帐号最少为5个字符长度' },
                      ]
                    })(<Input type="text" placeholder="请输入帐(admin)" disabled={this.props.loading} />)
                  }
                </Form.Item>
                <Form.Item { ...formItemLayout } label="登陆密码">
                  {
                    getFieldDecorator('password', {
                      initialValue: '',
                      rules: [
                        { min: 5, message: '密码最少为5个字符长度' },
                      ]
                    })(<Input type="password" placeholder="请输入密码(123456)" disabled={this.props.loading} />)
                  }
                </Form.Item>
                <Form.Item wrapperCol={{ span: 16, offset: 6 }} children="">
                  <Button type="primary" htmlType="submit" loading={this.props.loading}>登录</Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row >
      </section>
    );
  };
};

export default Form.create()(LoginForm);
