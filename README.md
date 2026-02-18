# AskPrysmIO
### Team Name: IO Opps

### Team Members:
- Jesse Chum
- Felix Chen
- Kimberly Mageary

### Project Description:
Our project is a mobile first web application designed to help NuSkin sales representatives quickly access accurate,
trustworthy information about NuSkin's newly launched product, Prysm iO. Our platform provides a simple and intuitive
interface where users can either view commonly asked questions, or interact with an AI powered assistant to recieve 
clear answers based on the same internal documentation and research used to make Prysm iO.

### Quick Links for More Info

- [About NuSkin](https://www.nuskin.com/content/nuskin/en_US/about-us.html)
- [What is Prysm iO?](https://www.nuskin.com/us/en/site/opportunity/prysm-io-opportunity)

---
### Current Status (Sprint 2)

Current MVP includes a chatbot interface and static FAQ content. A basic Python backend has been built out, 
and one full req/res cycle has been built, mocking the answer to the question "Which finger should I use when scanning?"

---

### How to Run Locally
1. Clone the repo
2. Install dependencies
   ```
     cd ./prysm-react-app
     npm install
   ```
3. Run the dev server
   ```
     npm run dev
   ```
4. Go to http://localhost:5173

---

### Project Structure
```
/backend  
  /controllers   # Handles request logic and responses  
  /routers       # Defines API routes and endpoints  

/prysm-react-app  
  /src  
    /api         # Frontend API helpers for communicating with the backend  
    /components  # Reusable UI components (Chatbot, FAQ items, etc.)  
    /data        # Static or mock data used during MVP development  
    /styles      # Global and component-level styling (CSS)
```

### Disclaimer
This project is for educational purposes and is being built as a part of Green River College's Software Development 2025-2026 senior capstone.

