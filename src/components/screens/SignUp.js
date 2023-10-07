import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/store";
import { quizConfig } from "../../axiosConfig";
import { Helmet } from "react-helmet";
// import { UserContext } from "../../App";

export default function SignUp() {
  const { state, dispatch } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    quizConfig
      .post(`/auth/create/`, {
        email,
        password,
        name: name,
      })
      .then((response) => {
        let data = response.data.data;
        console.log(response.data);

        let status_code = response.data.status_code;
        if (status_code === 6000) {
          // console.log(data.access,"555");

          const user_details = {
            is_verified: true,
            access_token: data.access,
          };
          dispatch({
            type: "UPDATE_USER_DETAILS",
            user_details,
          });
          navigate("/category");
        } else {
          setMessage(response.data.data);
        }
      })
      .catch((error) => {
        // console.log("error", error.response);
        if (error.response.status === 500) {
          setMessage("Name,Email and Password:Field is required");
        }
        if (error.response.status === 401) {
          setMessage(error.response.data.detail);
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Sign Up | Quiz App</title>
      </Helmet>

      <Container>
        <LeftContainer>
          <HeaderContainer>
            <Link to={"/home"}>
              <Logo src={require("../../assets/images/bg3.png")} alt="Image" />
            </Link>
          </HeaderContainer>
          <MainHeading>Enter your work email adress to get started !! </MainHeading>
        </LeftContainer>
        <RightContainer>
          <LoginContainer>
            <LoginHeading>Register into Account</LoginHeading>
            <LoginInfo>Create an account to access online quiz</LoginInfo>
            <Form onSubmit={handleSubmit}>
              <InputContainer>
                <TextInput
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Name"
                />
              </InputContainer>
              <InputContainer>
                <TextInput
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email"
                />
              </InputContainer>
              <InputContainer>
                <TextInput
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                />
              </InputContainer>
              <LoginButton to="/login">Login Now</LoginButton>
              {message && <ErrorMessage>{message}</ErrorMessage>}
              <ButtonContainer>
                <SubmitButton>Create an Account</SubmitButton>
              </ButtonContainer>
            </Form>
          </LoginContainer>
        </RightContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  padding: 15px;
`;
const LeftContainer = styled.div`
  width: 55%;
  padding: 40px 70px 70px;
`;
const HeaderContainer = styled.div`
  width: 140px;
`;
const Logo = styled.img`
  width: 100%;
  border-radius: 50%;
`;
const MainHeading = styled.h1`
    font-size: 31px;
    color: rgb(50, 10, 223);
    margin-top: 94px;
    line-height: 8.4em;
`;
const RightContainer = styled.div`
  background: #0188f1;
  width: 45%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 20px;
  padding: 0 70px 70px;
`;
const LoginContainer = styled.div`
  padding-bottom: 70px;
  border-bottom: 1px solid #fff;
  width: 100%;
`;
const LoginHeading = styled.h3`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const LoginInfo = styled.p`
  font-size: 18px;
  margin-bottom: 35px;
`;
const Form = styled.form`
  width: 100%;
  display: block;
`;
const InputContainer = styled.div`
  margin-bottom: 15px;
  position: relative;
`;
const TextInput = styled.input`
  padding: 20px 25px 20px 30px;
  width: 100%;
  display: block;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  outline: none;
`;
const LoginButton = styled(Link)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;
  color: #fff;
  font-size: 20px;
`;
const SubmitButton = styled.button`
  background: #046bf6;
  border: 0;
  outline: 0;
  color: #fff;
  padding: 25px 40px;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ErrorMessage = styled.p`
  font-size: 17px;
  color: red;
  margin-bottom: 25px;
  text-align: center;
`;
