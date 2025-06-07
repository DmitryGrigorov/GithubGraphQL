import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Card, Form, Input, Button, Select, Typography, message } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const CREATE_REPOSITORY = gql`
  mutation CreateRepository($name: String!, $visibility: RepositoryVisibility!) {
    createRepository(input: {name: $name, visibility: $visibility}) {
      repository {
        id
        name
        url
      }
    }
  }
`;

const CreateRepository: React.FC = () => {
  const [form] = Form.useForm();
  const [createRepository, { loading }] = useMutation(CREATE_REPOSITORY);
  const [createdRepoUrl, setCreatedRepoUrl] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    try {
      const { data } = await createRepository({
        variables: {
          name: values.name,
          visibility: values.visibility,
        },
      });
      setCreatedRepoUrl(data.createRepository.repository.url);
      message.success('Репозиторий успешно создан!');
      form.resetFields();
    } catch (err: any) {
      message.error('Ошибка при создании репозитория: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <Card>
        <Title level={3}>Создать новый репозиторий</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Имя репозитория"
            name="name"
            rules={[{ required: true, message: 'Введите имя репозитория' }]}
          >
            <Input placeholder="my-awesome-repo" />
          </Form.Item>
          <Form.Item
            label="Видимость"
            name="visibility"
            initialValue="PUBLIC"
            rules={[{ required: true, message: 'Выберите видимость' }]}
          >
            <Select>
              <Option value="PUBLIC">Публичный</Option>
              <Option value="PRIVATE">Приватный</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Создать
            </Button>
          </Form.Item>
        </Form>
        {createdRepoUrl && (
          <div style={{ marginTop: 16 }}>
            <a href={createdRepoUrl} target="_blank" rel="noopener noreferrer">
              Перейти к репозиторию
            </a>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CreateRepository; 