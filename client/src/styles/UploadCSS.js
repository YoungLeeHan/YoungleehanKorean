import styled from "@emotion/styled";

const UploadDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const UploadForm = styled.form`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  #title {
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    margin-bottom: 10px;

    &:active,
    &:focus {
      outline: none;
    }
  }
  textarea {
    min-height: 350px;
    resize: none;
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    &:active,
    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: grey;
      border-radius: 15px;
      background-colip: padding-box;
      broder: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #c6c6c6;
      border-radius: 15px;
      box-shadow: inset 0px 0px 5px whitesmoke;
    }
  }
  label {
    font-weight: bold;
    margin-top: 10px;
  }
  @media (max-width: 756px) {
    width: 90%;
  }
`;

const UploadButtonDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 15px;
    padding: 5px 10px;
    background-color: black;
    color: white;
    border: 1px solid black;
    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
    &:nth-last-of-type(1) {
      margin-left: 10px;
    }
  }
`;

export { UploadDiv, UploadForm, UploadButtonDiv };
