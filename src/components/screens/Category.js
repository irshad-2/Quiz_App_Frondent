import React, { useContext, useState } from "react";
import Header from "../includes/Header";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
// import { Context } from "../context/store";

function Category() {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption) {
      navigate(`/home/${selectedOption}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Category | Quiz App</title>
      </Helmet>
      <Header />
      <MainContainer>
        <CategoryContainer>
          <OptionsContainer>
            <h1>Please Select The Question Level </h1>
            <RadioGroup>
              <RadioButton
                onClick={() => handleOptionChange("Hard")}
                selected={selectedOption === "Hard"}
              >
                Hard
              </RadioButton>
              <RadioButton
                onClick={() => handleOptionChange("Medium")}
                selected={selectedOption === "Medium"}
              >
                Medium
              </RadioButton>
            </RadioGroup>
            <SubmitBtnContainer>
              <SubmitBtn
                type="submit"
                disabled={!selectedOption}
                onClick={handleSubmit}
              >
                Submit
              </SubmitBtn>
            </SubmitBtnContainer>
          </OptionsContainer>
        </CategoryContainer>
      </MainContainer>
    </>
  );
}
export default Category;

const MainContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const CategoryContainer = styled.div`
  width: 40%;
  margin: 0 auto;
`;
const OptionsContainer = styled.div`

`;
const SubmitBtn = styled.div`
  display: inline-block;
  background: #046bf6;
  padding: 10px 40px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  color: #fff;
  border: none;
  outline: none;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const RadioButton = styled.div`
  display: block;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #000;
  margin-bottom: 20px;
  outline: none;
  background-color: ${({ selected }) => (selected ? "#fff" : "transparent")};
  color: ${({ selected }) => (selected ? "#000" : "#fff")};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
    color: blue;
    background: yellow;
  }
`;

const RadioGroup = styled.div``;
const SubmitBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;
