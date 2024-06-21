import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import toast,{Toaster} from "react-hot-toast";
const override = {
  display: "block",
  margin: "0 auto",
  color: "#8400ff",
  borderWidth: '4px',
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contnet: center;
  position: rlative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;
const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.div`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;
const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;
const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactButton = styled.button`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;
const Contact = () => {
  const [fromEmail, setFromEmail] = useState("");
  const [fromName, setFromName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading,setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceId = "service_bcihqwj"; 
    const templateId = "template_wthfxys"; 
    const publicKey = "CrWCDD3QzvGzIWI4Z"; 

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_email: fromEmail,
        from_name: fromName,
        subject: subject,
        message: message
      }
    };

    try {
      const fallbackEmail=fromEmail;
      const fallbackName=fromName;
      const fallbackSubject=subject;
      const fallbackMessage=message;
      setLoading(true);
      setFromEmail("");
      setFromName("");
      setSubject("");
      setMessage("");
      const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send",data);
      setLoading(false);
      if (response.status === 200) {
        console.log("message sent");
        toast.success('Message sent succesfully',{
          position: 'bottom-center',
        });
      } else {
        console.error("message not sent");
        setFromEmail(fallbackEmail);
        setFromName(fallbackName);
        setSubject(fallbackSubject);
        setMessage(fallbackMessage);
        toast.error('Message not sent, please try again',{
          position: 'bottom-center',
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('There was an error, please try again later',{
        position: 'bottom-center',
      });
    }
  };

  return (
    <Container id="Education">
      <Wrapper>
        <Title>Contact</Title>
        <Desc style={{ marginBottom: "40px" }}>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput
            type="email"
            placeholder="Your Email"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            required
          />
          <ContactInput
            type="text"
            placeholder="Your Name"
            value={fromName}
            onChange={(e) => setFromName(e.target.value)}
            required
          />
          <ContactInput
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <ContactInputMessage
            placeholder="Message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          { loading ?
            <ClipLoader color={'#8400ff'} loading={loading} cssOverride={override} size={60} /> 
                : <ContactButton onClick={handleSubmit}>"Send"</ContactButton> 
          }  
          <Toaster position={'bottom-center'} />
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
