import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const IntegrationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 80px;
  padding-left: 10px;
`;

const Tile = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1 1 calc(25% - 20px);
  max-width: calc(25% - 20px);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TileContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const TileLogo = styled.img`
  height: 50px;
  margin-bottom: 10px;
  align-self: center;
`;

const TileText = styled.div`
  flex: 1;
  text-align: left;
`;

const TileHeader = styled.h3`
  text-align: center;
  margin-bottom: 10px;
`;

const TileDescription = styled.p`
  margin-bottom: 20px;
`;

const TileButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: auto;
`;

const Integrations = () => {
  const navigate = useNavigate();

  const handleIntegrationClick = (integration) => {
    navigate('/configure', { state: { integration } });
  };

  const scmTools = [
    {
      name: 'GitHub',
      description: 'Connect your GitHub repositories to automate and enhance your development workflow.',
      logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      integration: 'github'
    },
    {
      name: 'Bitbucket',
      description: 'Connect your Bitbucket repositories to automate and enhance your development workflow.',
      logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/1505148943/bitbucket.svg',
      integration: 'bitbucket'
    },
    {
      name: 'GitLab',
      description: 'Connect your GitLab repositories to automate and enhance your development workflow.',
      logo: 'https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png',
      integration: 'gitlab'
    },
    // {
    //     name: 'Azure DevOps',
    //     description: 'Connect your Azure DevOps repositories to automate and enhance your development workflow.',
    //     logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Logo-azure-devops.png',
    //     integration: 'azuredevops'
    // }
  ];

  return (
    <div>
      <h1>Integrations</h1>
      <IntegrationsContainer>
        {scmTools.map(tool => (
          <Tile key={tool.integration} onClick={() => handleIntegrationClick(tool.integration)}>
            <TileContent>
              <TileLogo src={tool.logo} alt={`${tool.name} Logo`} />
              <TileHeader>{tool.name}</TileHeader>
              <TileText>
                <TileDescription>{tool.description}</TileDescription>
              </TileText>
            </TileContent>
            <TileButton>
              Integrate {tool.name}
            </TileButton>
          </Tile>
        ))}
      </IntegrationsContainer>
    </div>
  );
};

export default Integrations;
