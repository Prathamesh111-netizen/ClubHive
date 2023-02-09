import axios from "axios";

const sendEmail = (emailId) => {
  const options = 
  {
    method: "POST",
    url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "e942fcb3d1msh7aee0425ff22963p1851e1jsn2a40ab57299d",
      "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
    },
    data: {
      personalizations: [
        {
          to: [{ email: emailId }],
          subject: "Hello, World!",
        },
      ],
      from: { email: "from_address@example.com" },
      content: [
        {
          type: 'text/html',
          value: '<p>Hello from CSI SPIT!</p><p>Sending with the email to notify for Approval for <strong>CSI hackathon 2023</strong></p> <a href="https://www.google.com">Click here to view</a>'
        }
      ],
      attachments: [
        {
          content: 'PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==',
          filename: 'mentor.pdf',
          type: 'text/pdf',
          disposition: 'attachment'
        }
      ]
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default sendEmail;
