import React from 'react';
import { Typography, Card, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const GraphQLMutations: React.FC = () => (
  <div style={{ maxWidth: 900, margin: '0 auto' }}>
    <Title level={2}>GraphQL Mutations for GitHub API</Title>
    <Paragraph>
      Здесь приведены примеры основных GraphQL мутаций для работы с GitHub API. Используйте их в Apollo Client или других GraphQL клиентах для управления репозиториями, ветками, issues и т.д.
    </Paragraph>

    <Divider orientation="left">Создать Issue</Divider>
    <Card>
      <Paragraph>
        <Text strong>Mutation:</Text> <Text code>createIssue</Text>
      </Paragraph>
      <Paragraph>
        <pre>{`
mutation CreateIssue($repositoryId: ID!, $title: String!, $body: String) {
  createIssue(input: {repositoryId: $repositoryId, title: $title, body: $body}) {
    issue {
      id
      number
      title
      url
    }
  }
}
        `}</pre>
      </Paragraph>
      <Paragraph>
        <Text type="secondary">Параметры: <br />
        <b>repositoryId</b> — ID репозитория (можно получить через query),<br />
        <b>title</b> — заголовок issue,<br />
        <b>body</b> — описание (опционально).</Text>
      </Paragraph>
    </Card>

    <Divider orientation="left">Создать репозиторий</Divider>
    <Card>
      <Paragraph>
        <Text strong>Mutation:</Text> <Text code>createRepository</Text>
      </Paragraph>
      <Paragraph>
        <pre>{`
mutation CreateRepository($name: String!, $visibility: RepositoryVisibility!) {
  createRepository(input: {name: $name, visibility: $visibility}) {
    repository {
      id
      name
      url
    }
  }
}
        `}</pre>
      </Paragraph>
      <Paragraph>
        <Text type="secondary">Параметры: <br />
        <b>name</b> — имя репозитория,<br />
        <b>visibility</b> — <code>PUBLIC</code> или <code>PRIVATE</code>.</Text>
      </Paragraph>
    </Card>

    <Divider orientation="left">Создать ветку</Divider>
    <Card>
      <Paragraph>
        <Text strong>Mutation:</Text> <Text code>createRef</Text>
      </Paragraph>
      <Paragraph>
        <pre>{`
mutation CreateBranch($repositoryId: ID!, $branchName: String!, $oid: GitObjectID!) {
  createRef(input: {repositoryId: $repositoryId, name: $branchName, oid: $oid}) {
    ref {
      id
      name
    }
  }
}
        `}</pre>
      </Paragraph>
      <Paragraph>
        <Text type="secondary">Параметры: <br />
        <b>repositoryId</b> — ID репозитория,<br />
        <b>branchName</b> — имя ветки в формате <code>refs/heads/branch_name</code>,<br />
        <b>oid</b> — SHA коммита, от которого создаётся ветка (обычно последний коммит default ветки).</Text>
      </Paragraph>
    </Card>

    <Divider orientation="left">Удалить ветку</Divider>
    <Card>
      <Paragraph>
        <Text strong>Mutation:</Text> <Text code>deleteRef</Text>
      </Paragraph>
      <Paragraph>
        <pre>{`
mutation DeleteBranch($refId: ID!) {
  deleteRef(input: {refId: $refId}) {
    clientMutationId
  }
}
        `}</pre>
      </Paragraph>
      <Paragraph>
        <Text type="secondary">Параметры: <br />
        <b>refId</b> — ID ветки (можно получить через query refs).</Text>
      </Paragraph>
    </Card>

    <Divider orientation="left">Добавить звезду репозиторию</Divider>
    <Card>
      <Paragraph>
        <Text strong>Mutation:</Text> <Text code>addStar</Text>
      </Paragraph>
      <Paragraph>
        <pre>{`
mutation AddStar($starrableId: ID!) {
  addStar(input: {starrableId: $starrableId}) {
    starrable {
      id
      viewerHasStarred
    }
  }
}
        `}</pre>
      </Paragraph>
      <Paragraph>
        <Text type="secondary">Параметры: <br />
        <b>starrableId</b> — ID репозитория.</Text>
      </Paragraph>
    </Card>

    <Divider orientation="left">Удалить звезду</Divider>
    <Card>
      <Paragraph>
        <Text strong>Mutation:</Text> <Text code>removeStar</Text>
      </Paragraph>
      <Paragraph>
        <pre>{`
mutation RemoveStar($starrableId: ID!) {
  removeStar(input: {starrableId: $starrableId}) {
    starrable {
      id
      viewerHasStarred
    }
  }
}
        `}</pre>
      </Paragraph>
      <Paragraph>
        <Text type="secondary">Параметры: <br />
        <b>starrableId</b> — ID репозитория.</Text>
      </Paragraph>
    </Card>
  </div>
);

export default GraphQLMutations; 