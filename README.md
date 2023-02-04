#  CSI Hackathon
![logo](./docs/images/logo.png)
## 📌 Introduction:
### Types of User:
1. Dean academics (Main aadmi)   Managed by a super user
2. Mentor (Approached by committee president for approval of an event)
3. Club president 
    - Can host an event
    - For hosting an event he will have to send a request (Short description about events, budget) from our application which will send a mail to the mentor. 
    - Mentor will get a link to the approval page on his mail, from here he will click on approve to send the request to Dean academics who will give his final approval.
    - Now the president can create an event like unstop.
4. Applicants 
    - He can apply like unstop to the events
    - Applicant profile pe unke resumes, participated in the hackathons of our site, Badge system for events participated by the user.
    - An applicant will be able 
    - Previous sponsors
5. Canteens
6. Rooms
Committees should be able to view the availability of rooms and venues on the campus to ensure there are no clashes – The timetable for the week will be added through the admin portal. Corresponding to the timetable and  events room availability will be checked.
7. Scheduling of meet.
8. Mail service integration.

## 🤖 Usage:
```bash
docker-compose up --build
```

## 🎓 Description
### **Technology Stack**
- Next.js
- Redux
- MongoDB
- Node.js
- Express.js

## Raw Schema
### 📁 EVENT:
- Committee
- Domain
- Type
- Short Description
- Timeline
- CKEditor overview
- Rooms Availibity
- Sponsors
- Budget
- Prize pool
- Image upload

### 🎓 Dean academics
- First Name
- Last Name
- Department
- emailId
- Password

### 👨‍🏫 Mentor
- First Name
- Last Name 
- Department 
- EmailId
- Password
- Current Committe Handled

## 🔮 Future Scope
- Collaboration of committees
- Food orders along with the request

## 📖 Gyaan
- Event clash gap between events
- Current calendar
- Month calendar which will be submitted at the start of every year
- Download Attachments
- Add to calendar
- Wishlist
- Eligibility
- Share in social media wo side wale dabbe twitter, facebook
