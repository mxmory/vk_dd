import { Form, Input, Button } from 'antd';
import MaskedInput from 'antd-mask-input'
import './FormPage.scss'

const {TextArea} = Input;

export const FormPage = () => {

    const onFormSubmit = () => {
        console.log('submit')
    }

    return <div className="form-page">
        <div className="form">
            <h2>Обращение в службу поддержки</h2>
        <Form
      name="support-form"
      initialValues={{ remember: true }}
      onFinish={onFormSubmit}
    >
      <Form.Item
        label="ФИО"
        name="fio"
        rules={[{ required: true, message: 'Введите ФИО' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Номер телефона"
        name="phone"
        rules={[{ required: true, message: 'Введите номер телефона' }]}
      >
        <MaskedInput mask="+1 111 111 11 11" name="phone"/>
      </Form.Item>

      <Form.Item
        label="Текст обращения"
        name="request"
        rules={[{ required: true, message: 'Введите текст обращения' }]}
      >
        <TextArea rows={4}/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
        </div>
    </div>
}