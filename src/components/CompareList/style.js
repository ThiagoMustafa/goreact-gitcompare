import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      i {
        margin-right: 20px;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
  }

  .buttons {
    margin-top: auto;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 30px;
  border: 0;
  background-color: ${props => (props.styleButton === 'update' ? '#67cc9c' : '#f18383')};
  color: #fff;
  font-weight: bold;
`;
