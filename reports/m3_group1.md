# Milestone 3 Report: Group 1

<!-- Add a brief introduction about the milestone and its goals -->
This report outlines the progress, achievements, challenges, and reflections from the third and final milestone of our project. It also includes documentation, release notes, and individual contributions of team members.

---

## Executive Summary

### Project Status
<!-- Summarize the current state of the project. -->
- **Completed Features**:
  - User authentication and authorization
  - Question creation, editing, and viewing with code snippets
  - Tag system with following/unfollowing functionality
  - Bookmarking questions and bookmarked questions page
  - Question difficulty rating and filtering
  - Profile pages with reputation points and activity history
  - Search and filtering capabilities
  - Mobile application with core features
  - Accessibility improvements meeting WCAG AA standards
  - Deployment infrastructure with CI/CD pipelines
- **Challenges**:
  - API inconsistencies between frontend and backend requiring significant refactoring
  - Performance optimization for large datasets and concurrent users
  - Mobile-web feature parity maintenance
- **Deviations**:
  - Simplified recommendation system implementation due to time constraints
  - Postponed email verification to focus on core functionality
  - Modified feed implementation to focus on top-rated and recent content
  - Adjusted tag system to include basic Wikidata integration instead of full semantic search

### Project Deliverables
| **Deliverable** | **Status** |
| --------------- | ---------- |
| [Github Repository](https://github.com/bounswe/bounswe2024group1) | Completed ✔️ |
| [Deployed Application](https://programming-languages-forum-psrb6.ondigitalocean.app/) | Completed ✔️ |
| [Software Design Diagrams](https://github.com/bounswe/bounswe2024group1/wiki/Software-Design-Diagrams) | Completed ✔️ |
| [Meeting Notes](https://github.com/bounswe/bounswe2024group1/wiki/451-Meeting-Notes) | Completed ✔️ |
| [API Documentation](https://github.com/bounswe/bounswe2024group1/tree/main/api-docs#readme) | Completed ✔️ |
| [Project Plan](https://github.com/orgs/bounswe/projects/73/views/5?query=sort%3Aupdated-desc+is%3Aopen&sortedBy%5Bdirection%5D=&sortedBy%5BcolumnId%5D=)| Completed ✔️ |

### Final Release Notes
<!-- Summarize updates and fixes in the final release. -->
- **Release Version**: `0.9.0`
- **Tag Name**: `customer-presentation-3`
- **Key Changes**:
  - Added difficulty level filtering and rating for questions
  - Implemented code block preview and execution with timing information
  - Added bookmarking functionality and bookmarked questions page
  - Enhanced profile pages with reputation points, followed tags, questions and answers
  - Added tag following/unfollowing functionality
  - Implemented question search and filtering capabilities
  - Added glossary page and tag type pages
  - Enhanced question creation with code snippets and previews
  - Improved accessibility with screen reader support
  - Added default profile pictures
  - Implemented question editing functionality
  - Enhanced mobile experience with home page, profile page and question cards
  - Added sorting by followed users and recommended order
  - Fixed various bugs in tag details, bookmarks, and API responses
  - Improved overall UX with loading states and navigation

### Changes to the Development Process
- **Improved API Consistency and Functionality**:
As the group noticed some API behavior inconsistencies, the backend team focused on refining endpoints to ensure proper alignment with system requirements. These changes significantly reduced API errors and streamlined the frontend and mobile integrations. Examples include:

  - Fixing the GetTagDetails endpoint to ensure accurate "following" status (Issue #667).
  - Resolving issues with user-specific data retrievals, such as bookmarks and follower counts (Issues #630, #681).
- **Focus on User Experience (UX) and Accessibility**:
The frontend team prioritized addressing UX and accessibility issues identified during testing and demo sessions. These efforts brought the application closer to compliance with WCAG 2.2 standards, improving user usability. Key improvements include:

  - Adding fallback images for missing profile pictures (Issue #679).
  - Fixing accessibility-related issues such as tab navigation and image alt text (Issue #644).
  - Implementing UX enhancements like code snippet previews and a smoother tag badge navigation experience (Issues #631, #687).
- **Data-Driven Enhancements**:
To improve user engagement and personalization, the team introduced features leveraging backend capabilities. These changes provided a more tailored and functional user experience during demos:

  - Sorting questions based on top-rated or recent activity (Issue #662).
  - Implementing personalized question recommendations by prioritizing questions from followed users and tags (Issues #689, #627).
  - Adding mock data to simulate a realistic user experience (Issue #683).

- **Improved Development and Testing Workflow**:
The team addressed critical workflow challenges, especially in testing and deployment. These improvements minimized bugs and provided clearer visibility into project status for all stakeholders:

  - Enhanced Test Coverage: Unit, integration, and system-level tests were generated for backend, frontend, and mobile components (Issue #686).
  - Final Release Notes: A structured process for summarizing updates and known issues was introduced for the final release (Issue #684).

- **Streamlined Documentation**
The team adopted a more structured approach to documentation to ensure all artifacts were complete and accessible:

  - Documented all UX design decisions and user scenarios to highlight core functionalities (Issues #658, #689).
- **Comments on Changes:**
These process improvements mainly had impact on the listed aspects of the project:

  - Reduced Integration Issues: Backend fixes and improved testing reduced friction for frontend and mobile teams.
  - Enhanced Customer Satisfaction: UX improvements addressed critical customer feedback from the previous demo.
  - Faster Development Cycles: A cleaner workflow and focused documentation minimized delays caused by unclear requirements or technical debt.


### Customer Feedback
Customer feedback can be reached from [here](https://github.com/bounswe/bounswe2024group1/wiki/Customer-Feedback-for-the-Milestone%E2%80%903-Demo).

### Final Milestone Demo Reflections
<!-- Reflect on the demo and lessons learned. -->
- **What Went Well**:
  - Summarize successful aspects of the demo.
- **Challenges and Improvements**:
  - Describe challenges faced during the demo and lessons learned.
- **What Could Be Done Differently**:
  - Highlight areas where changes at the start could have streamlined the process.

---

## Progress Based on Teamwork

### Worked Performed by Team Members

## Summary of Work Performed by Each Team Member

| **Team Member**       | **Group/Subgroup**       | **Responsibilities**                                                                 | **Main Contributions**                                                                                                    | **Pull Requests**                                                                                 | **Significant Issues Addressed**                                                                  | **Unit Tests**                           |
|-----------------------|--------------------------|------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|-----------------------------------------|
| Mehmet Efe Akça       | Backend, DevOps, Frontend | Full-stack development, DevOps, code review | - Fixed tag-related bugs ([#667](https://github.com/bounswe/bounswe2024group1/issues/667), [#619](https://github.com/bounswe/bounswe2024group1/issues/619))<br>- Implemented search and filtering ([#617](https://github.com/bounswe/bounswe2024group1/issues/617), [#601](https://github.com/bounswe/bounswe2024group1/issues/601))<br>- Managed deployment infrastructure ([#622](https://github.com/bounswe/bounswe2024group1/issues/622))<br>- Improved frontend UX ([#588](https://github.com/bounswe/bounswe2024group1/issues/588)) | [#708](https://github.com/bounswe/bounswe2024group1/pull/708), [#703](https://github.com/bounswe/bounswe2024group1/pull/703), [#677](https://github.com/bounswe/bounswe2024group1/pull/677), [#615](https://github.com/bounswe/bounswe2024group1/pull/615) | Led milestone planning, fixed critical bugs, improved deployment process | Added comprehensive frontend component tests for Tag, Tags Page, CustomAnchor, and SearchQuestionsList |
| Nazire Ata            | Frontend                 | Frontend development, accessibility improvements                                   | - Addressed accessibility standards ([#644](https://github.com/bounswe/bounswe2024group1/issues/644))<br>- Enhanced question previews and code snippets ([#633](https://github.com/bounswe/bounswe2024group1/issues/633), [#631](https://github.com/bounswe/bounswe2024group1/issues/631))<br>- Implemented Question Edit([#641](https://github.com/bounswe/bounswe2024group1/issues/641)) | [ **All merged PR links** ](https://github.com/bounswe/bounswe2024group1/pulls?q=is%3Apr+is%3Aclosed+assignee%3ANazireAta+milestone%3A%22451+-+Customer+Milestone+3+-+Final+Product%22) | Improved WCAG compliance, fixed broken UI components, added features to Question Page                                             | Added unit tests for question difficulty rating and question edit |
| Atakan Yaşar          | Mobile, Backend                   | Mobile UI development, feature additions                                           | - Implemented profile pages and home filters ([#666](https://github.com/bounswe/bounswe2024group1/issues/666), [#650](https://github.com/bounswe/bounswe2024group1/issues/650))<br>- Improved mobile UI elements ([#663](https://github.com/bounswe/bounswe2024group1/issues/663)) <br> - [ **All Issues** ](https://github.com/bounswe/bounswe2024group1/issues?q=is%3Aissue+is%3Aclosed+assignee%3Aatakanyasar+milestone%3A%22451+-+Customer+Milestone+3+-+Final+Product%22) | [ **All merged PR links** ](https://github.com/bounswe/bounswe2024group1/pulls?q=is%3Apr+is%3Aclosed+assignee%3Aatakanyasar)                                 | Addressed UI responsiveness, filter functionality                                               | Added Backend unit tests.<br> Tried but could not manage to add mobile-specific unit tests          |
| Aslı Gök             | Frontend    | Frontend development                                             | - Wrote user tests ([#655](https://github.com/bounswe/bounswe2024group1/issues/655))<br>-  Implemented glossary, tag type pages ([#652](https://github.com/bounswe/bounswe2024group1/issues/652))<br>-  Implemented references for tags and questions ([#589](https://github.com/bounswe/bounswe2024group1/issues/589))<br>-  Display authors for tags ([#636](https://github.com/bounswe/bounswe2024group1/issues/636))| [#624](https://github.com/bounswe/bounswe2024group1/pull/624),<br>[#669](https://github.com/bounswe/bounswe2024group1/pull/669),<br>[#694](https://github.com/bounswe/bounswe2024group1/pull/694)                            | Improved domain specificity in the application, testing                                                    | Added unit tests for tags, glossary, home components         |
| Enes Baser            | Backend                  | Backend data handling, feature implementations                                     | - Added backend support for tag sorting ([#653](https://github.com/bounswe/bounswe2024group1/issues/653))<br>-  Implemented a question difficulty rating endpoint ([#590](https://github.com/bounswe/bounswe2024group1/issues/590))<br>- Fixed incorrect question count in GET /search/tags ([#591](https://github.com/bounswe/bounswe2024group1/issues/591))<br>- Retrieved questions and answers in user profiles ([#598](https://github.com/bounswe/bounswe2024group1/issues/598))<br>-  Fixed code execution results returning 200 ([#603](https://github.com/bounswe/bounswe2024group1/issues/603))<br>-  GET /users/{id}/followed-tags now returns tags a user follows ([#604](https://github.com/bounswe/bounswe2024group1/issues/604))<br>-  Return difficulty of questions in `searchQuestions` and `getQuestionById` ([#611](https://github.com/bounswe/bounswe2024group1/issues/611))<br>- Implemented reputation point feature ([#642](https://github.com/bounswe/bounswe2024group1/issues/642))<br>-  Retrieved tags in sorted order based on question count linked to the tag ([#653](https://github.com/bounswe/bounswe2024group1/issues/653))<br>-  Limited tag creation ([#657](https://github.com/bounswe/bounswe2024group1/issues/657))                 | [🔗 All merged PR links](https://github.com/bounswe/bounswe2024group1/pulls?q=is%3Apr+assignee%3AEnesBaserr+milestone%3A%22451+-+Customer+Milestone+3+-+Final+Product%22+is%3Aclosed)                                  | Fixed backend inconsistencies, improved queries                                                | Wrote unit tests for new backend features  |
| Çağatay Çolak            | Backend                  |  Backend Development | Implement GET users/{userId} should return answer, questions for that user ([#627](https://github.com/bounswe/bounswe2024group1/issues/627)) |   Implement GET users/{userid} should return answers, questions, and followed tags for that user   [Merged PR #685](https://github.com/bounswe/bounswe2024group1/pull/685)  | Fixed and improved some of the endpoints and wrote unit tests for backend | Wrote and implemented unit tests for the backend services  |
| Tarık Can Özden            | Backend  & Frontend   | Backend  & Frontend   | - Implemented Personal Recommendation [#689](https://github.com/bounswe/bounswe2024group1/issues/689) - Implemented Frontend Features #596, #595, #594, #593, #592| [All Merged PRs](https://github.com/bounswe/bounswe2024group1/pulls?q=is%3Apr+is%3Aclosed+assignee%3ozdentarikcan) | Personal Recommendation, Bookmarking, Following, Documentation | Personal Recommendation, Bookmarking, Following |

### Addressed Requirements

| **Requirement** | **Status** | **Notes** |
|----------------|------------|------------|
| 1.1 - User Authentication | Partially Complete 🔄 | All functionality for registering and logging in works, but email verification and password recovery is not implemented |
| 1.2.2 - Profile Editing | Partially Complete 🔄 | Basic info editing works, but profile picture upload not implemented |
| 1.2.3 - Content Listing | Complete ✅ | Basic listing works, but reverse chronological order and API endpoint pending |
| 1.3.4 - Profile Search | Complete ✅ | Basic search works, but missing some required user information in results |
| 1.4.4.1 - Feed | Partially Complete 🔄 | Feed is shown to all users upon entry to the system, including recommendations but only one type of Feed is implemented |
| 1.4.4.3-5 - Bookmarking | Complete ✅ | Question bookmarking and bookmarked questions page functionality implemented |
| 1.5 - Tags | Complete ✅ | Tag creation, listing and details pages implemented including difficulty level filtering, multiple tag types, follow/unfollow functionality |
| 1.6 - Question Page | Complete ✅ | Question creation, listing and details pages implemented including markdown preview, code snippet execution, tag linking |
| 2.1 - Wikidata API | Complete ✅ | Wikidata API integration for tag data and photo retrieval |
| 2.2 - Feed | Partially Complete 🔄 | Top-rated questions and recent questions implemented |
| 2.3 - Search | Partially Complete 🔄 | Tag graph search not implemented |
| 2.4 - Communication | Complete ✅ | Sorting by recommended order and top rated questions implemented |
| 2.5 - Input Validation | Complete ✅ | Sign-up validation, tag validation, question validation implemented |
| 2.6 - Personalized Recommendation System | Partially Complete 🔄 | Recommendation works but in a different way than planned |
| 3.1 - Security | Complete ✅ | Basic security implemented including bcrypt and VPC configuration |
| 3.2 - Compatibility | Complete ✅ | Android application and web interface supported |
| 3.3 - Versioning | Complete ✅ | Semantic versioning and staging/production separation implemented |
| 3.4 - Accessibility | Complete ✅ | WCAG standard's WCAG AA level has been achieved |
| 3.5 - Performance and Reliability | Complete ✅ | System supports at least 200 registered users and 1000 users actively using it at the same time |
| 3.6 - Legal and Ethical Issues | Complete ✅ | Any usage of personal information shall comply with GDPR and KVKK |


---

### API Endpoints
<!-- List API endpoints and link to API documentation. -->
- **API Documentation**: [Link to API Docs](https://github.com/bounswe/bounswe2024group1/tree/main/api-docs)
- **Link to API**: [Link to API](https://programming-languages-forum-psrb6.ondigitalocean.app/api/v1)
- **Example Endpoints**:

### Example API Calls

#### 1. User Login
**Endpoint**: POST /api/v1/auth/login
**URL**: https://programming-languages-forum-psrb6.ondigitalocean.app/api/v1/auth/login
**Content-Type**: application/json

**Request Body**:
```json
{
    "usernameOrEmail": "example@mail.com",
    "password": "yourpassword123"
}
```

**Sample Response** (200 OK):
```json
{
    "status": 200,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs..."
    }
}
```

**How to test**: Using cURL
```bash
curl -X POST \
  https://programming-languages-forum-psrb6.ondigitalocean.app/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "usernameOrEmail": "example@mail.com",
    "password": "yourpassword123"
}'
```

#### 2. Create a Question
**Endpoint**: POST /api/v1/questions
**URL**: https://programming-languages-forum-psrb6.ondigitalocean.app/api/v1/questions
**Content-Type**: application/json
**Authorization**: Bearer Token (obtained from login)

**Request Body**:
```json
{
    "title": "How to implement a binary search tree in Python?",
    "content": "I'm trying to implement a binary search tree in Python but struggling with the insertion method. Can someone explain the basic approach?",
    "tagIds": [1, 2]  // Tag IDs for relevant topics (e.g., "python", "data-structures")
}
```

**Sample Response** (201 Created):
```json
{
  "status": 200,
  "message": "Question created successfully",
  "data": {
    "id": 42,
    "title": "How to implement a binary search tree in Python?",
    "content": "Im trying to implement a binary search tree in Python but struggling with the insertion method. Can someone explain the basic approach?",
    "difficulty": null,
    "author": {
      "id": 2,
      "username": "mmtftr",
      "reputationPoints": 0,
      "profilePicture": null,
      "name": "Mehmet Efe Akca"
    },
    "createdAt": "2024-12-20 13:59:31",
    "updatedAt": "2024-12-20 13:59:31",
    "tags": [
      {
        "id": 1,
        "name": "Kotlin"
      },
      {
        "id": 2,
        "name": "Pharo"
      }
    ],
    "upvoteCount": 0,
    "downvoteCount": 0
  },
  "error": null
}
```

**How to test**: Using cURL
```bash
curl -X POST \
  https://programming-languages-forum-psrb6.ondigitalocean.app/api/v1/questions \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIs...' \
  -d '{
    "title": "How to implement a binary search tree in Python?",
    "content": "I'\''m trying to implement a binary search tree in Python but struggling with the insertion method. Can someone explain the basic approach?",
    "tagIds": [1, 2]
}'
```

#### 3. Get Answers for a Question
**Endpoint**: GET /api/v1/questions/{questionId}/answers
**URL**: https://programming-languages-forum-psrb6.ondigitalocean.app/api/v1/questions/10/answers
**Method**: GET

**Sample Response** (200 OK):
```json
{
    "status": 200,
    "data": {
        "items": [
            {
                "id": 456,
                "content": "Here's how you can implement a binary search tree...",
                "createdAt": "2024-03-20T11:00:00Z",
                "author": {
                    "id": 789,
                    "username": "pythonexpert"
                }
            }
        ],
        "totalPages": 1
    }
}
```

**How to test**: Using cURL
```bash
curl -X GET \
  https://programming-languages-forum-psrb6.ondigitalocean.app/api/v1/questions/10/answers
```

Note: Replace the following placeholder values with actual data:
- `example@mail.com` and `yourpassword123` with valid login credentials
- The Bearer token in the authorization header with the token received from login
- Question ID (123) with an actual question ID
- Tag IDs [1, 2] with actual tag IDs from the system

#### Postman Collections

You may find the Postman collections in the backend directory.

- **Link to Documentations**: We have documentation on how to use the collections [here](https://github.com/bounswe/bounswe2024group1/blob/main/backend/src/main/resources/postman_collection/README.md)

## User Interface / User Experience
### Links to Code
- [Frontend UI Code](https://github.com/bounswe/bounswe2024group1/tree/main/frontend)
- [Mobile UI Code](https://github.com/bounswe/bounswe2024group1/tree/main/mobile)

### Screenshots of Implemented Interfaces
<details><summary>Web Interface</summary>
Note that not all features are showcased here. For more, visit our digitalocean app.
- **Home Page:**
    ![image](https://github.com/user-attachments/assets/d311b437-b309-4beb-be0f-f43f1928160c)

- **Glossary Page:**
    ![image](https://github.com/user-attachments/assets/b9103153-fe60-437d-94a7-2dfc8438145a)

- **Tags Page:**
![image](https://github.com/user-attachments/assets/2aee6425-bc34-439f-9fce-40bc68c6d636)

- **Tag Page**
    ![image](https://github.com/user-attachments/assets/ba8ef97f-b41a-4287-a571-12e8ed4091ca)

- **Question Page:**
    ![image](https://github.com/user-attachments/assets/0f32ab31-0196-44a6-a74c-bf50da50ae93)
    ![image](https://github.com/user-attachments/assets/7fe147cb-6bc0-4041-bcc6-edc37bc49d1f)

- **Answering:**
    ![image](https://github.com/user-attachments/assets/41733848-a0b1-443a-b6bd-6f15193e83f3)

- **Tag Search:**
    ![image](https://github.com/user-attachments/assets/34d1d79e-d19e-4fe1-9716-0409b5a34365)

- **Question Search:**
    ![image](https://github.com/user-attachments/assets/c0605fdf-8abc-4b95-97f5-92f7765262e3)

- **Profile Page:**
![Screenshot 2024-12-20 193733](https://github.com/user-attachments/assets/0fa32efc-62fb-4305-8e65-19dd537d5044)

- **Bookmarks Page:**
![Screenshot 2024-12-20 193807](https://github.com/user-attachments/assets/9e4affa6-5c2d-4c37-83fb-00ff6cbab14a)

</details>
<details><summary>Mobile Interface</summary>
Note that not all features are showcased here. For more, download our mobile app.
You can also check the **pull requests for the mobile** to see the code for each component. Screenshots are included in the pull requests to link the code with the corresponding UI.

- **Home Page:**

  <img src="https://github.com/user-attachments/assets/9491e277-1980-4f33-a297-5dcd4b29a5fa" width="300" />
  <img src="https://github.com/user-attachments/assets/17690a05-6a8d-4efc-a3b0-f511854320a9" width="300" />

- **Profile Page:**

  <img src="https://github.com/user-attachments/assets/28afa372-1c81-491f-949a-605d2c93e615" width="300" />

- **Tag Page:**

  <img src="https://github.com/user-attachments/assets/d9a611f3-2e7c-4b17-b374-66ed2ad2198e" width="300" />

- **Question Page and Answers:**

  <img src="https://github.com/user-attachments/assets/b58d8d1f-45e8-48b3-9883-193e07c1cfcf" width="300" />

- **Tag Search:**

  <img src="https://github.com/user-attachments/assets/63c7f6cf-d609-44eb-9321-137d27fe4a3e" width="300" />

- **Question Search:**

  <img src="https://github.com/user-attachments/assets/c0605fdf-8abc-4b95-97f5-92f7765262e3" width="300" />

</details>

### W3C Standards
Our team placed a strong emphasis on meeting W3C standards, particularly focusing on accessibility and usability to ensure a seamless user experience. Key improvements aligned with WCAG 2.2 guidelines included:

- **Improved Screen Reader Compatibility:**
All web components now include proper ARIA attributes to enhance accessibility for users relying on assistive technologies. For instance, form inputs and buttons have descriptive labels to ensure navigation clarity.
- **Keyboard Navigation:**
The navigation flow has been optimized for keyboard-only users. Users can now efficiently navigate between interactive components using Tab and Shift+Tab without loss of focus.
- **Color Contrast Adjustments:**
Text contrast and button designs were adjusted to meet WCAG's minimum contrast ratio requirements. This improves readability for users with visual impairments.
- **Fallback Mechanisms:**
Visual content, such as profile pictures and tag badges, includes fallback options (e.g., placeholder images or text alternatives) when primary resources fail to load.
- **Responsive Design:**
The UI adheres to responsive design principles, ensuring a consistent and accessible experience across web, mobile, and tablet devices. This includes proper viewport handling and content scaling.

### Scenarios
We created many scenarios throughout the semester, The first one was to showcase the functionalities we were planning to implement, and the second document was to showcase the domain-specificity of our application. The scenarios capture the seamless integration of frontend, backend, and mobile components while emphasizing accessibility improvements. Each step was validated with test cases to ensure consistency and performance.
Scenarios can be found on the links:
- [Scenario & Mockups](https://github.com/bounswe/bounswe2024group1/wiki/Scenario-Mockups)
- [Additional Scenario & Mockups](https://github.com/bounswe/bounswe2024group1/wiki/Additional-Scenario-&-Mockups)

---

## Project Artifacts
### Manuals

#### User Manual
The Programming Languages Forum usage guide is as follows:

- **Account Management**
  - Register with username, email, password, name, surname, country and experience level [here](https://programming-languages-forum-psrb6.ondigitalocean.app/signup)
  - Sign in with email and password [here](https://programming-languages-forum-psrb6.ondigitalocean.app/login)
  - Edit profile information including bio and profile picture in [your profile page](https://programming-languages-forum-psrb6.ondigitalocean.app/users/me)

- **Listings**
  - Browse the home page [here](https://programming-languages-forum-psrb6.ondigitalocean.app/) with recommended questions, tags and exercises
  - Browse the glossary [here](https://programming-languages-forum-psrb6.ondigitalocean.app/glossary) for information on tag types
  - Search questions and tags in [search page](https://programming-languages-forum-psrb6.ondigitalocean.app/search) (also accessible from the navbar)
  - View user profiles showing reputation points, followers, questions and answers in [user profile page](https://programming-languages-forum-psrb6.ondigitalocean.app/users/5)

- **Content Interaction**
  - Create questions with title, description, difficulty level, optional photos and code snippets in [create question page](https://programming-languages-forum-psrb6.ondigitalocean.app/questions/new)
  - Answer questions with formatted text and code snippets in [the question page](https://programming-languages-forum-psrb6.ondigitalocean.app/question/10)
  - Upvote/downvote questions and answers in [the question page](https://programming-languages-forum-psrb6.ondigitalocean.app/question/10)
  - Follow tags to stay updated on topics in [the tag page](https://programming-languages-forum-psrb6.ondigitalocean.app/tag/170)

- **Code Features**
  - Write executable code snippets in C and C#
  - Preview and run code before posting
  - Copy links to questions

#### System Manual

##### Prerequisites
**Web Application:**
- Git for version control
- Docker Desktop 2.20.0+ (required for both development and production)
  - Minimum 4GB RAM allocated to Docker
  - 10GB free disk space
- Node.js v20.12.1+ (optional, for local development without Docker)
- DigitalOcean CLI (for deployment)

**Mobile Application:**
- Node.js v20.12.1+ and npm 10.2.0+
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)
  - Minimum 8GB RAM
  - Android SDK Platform 34
  - Android SDK Build-Tools 34.0.0
  - Android Emulator with API 34 image
- Xcode 15+ (for iOS development, macOS only)
  - Minimum macOS 13.0+
  - iOS Simulator 17.0+
- Expo Go app on physical devices (for testing without emulators)


##### Installation Instructions

**Prerequisites Installation:**
1. Install [Docker Desktop 2.20.0+](https://docs.docker.com/desktop/)
2. Install [Node.js v20.12.1+](https://nodejs.org/en)
3. Install [DigitalOcean CLI](https://docs.digitalocean.com/reference/doctl/how-to/install/)

**Web Application Setup:**
1. Clone the repository:   ```bash
   git clone https://github.com/bounswe/bounswe2024group1.git
   cd bounswe2024group1   ```

2. Development Mode:   ```bash
   docker compose -f dev.yml up --watch   ```
   Access the application at http://localhost:5173

3. Production-like Mode:   ```bash
   docker compose up -d   ```
   Access the application at http://localhost:80

**Mobile Application Setup:**
1. Navigate to the mobile directory:   ```bash
   cd mobile   ```

2. Install dependencies:   ```bash
   npm install   ```

3. Start the development server:   ```bash
   npx expo start   ```

4. Choose your preferred method to run the app:
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator (macOS only)
   - Scan QR code with Expo Go app on your device

##### Emulator Setup Instructions

**Android Emulator Setup:**
1. Open Android Studio
2. Go to Tools > Device Manager
3. Click "Create Device"
4. Select a device definition (e.g., Pixel 7)
5. Download and select API 34 system image
6. Complete the device creation
7. Launch emulator before running the app

**iOS Simulator Setup:**
1. Install Xcode from the Mac App Store
2. Open Xcode > Preferences > Locations
3. Install Command Line Tools if prompted
4. Open Simulator app (Xcode > Open Developer Tool > Simulator)
5. Choose desired iOS device (Hardware > Device)

##### Common Issues and Solutions

1. **Docker Compose Installation Error ("yarn install --immutable")**
   - Error: "lockfile would have been modified by this install"
   - Solution: Run `yarn install` in the frontend/ folder

2. **Port Allocation Conflicts**
   - Error: "port is already allocated"
   - Solution:
     - Check running containers with `docker ps`
     - Stop conflicting services
     - Required ports: 8081, 8080, 80 (production), 5173 (development)

3. **File Path Issues**
   - Error: "no such file or directory"
   - Solution: Ensure all docker compose commands are run from the root folder
   - Run yarn commands from the frontend folder

##### Additional Resources

- Frontend documentation: [Frontend README](https://github.com/bounswe/bounswe2024group1/blob/main/frontend/README.md)
- Backend documentation: [Backend README](https://github.com/bounswe/bounswe2024group1/blob/main/backend/README.md)
- Mobile documentation: [Mobile README](https://github.com/bounswe/bounswe2024group1/blob/main/mobile/README.md)
- API Documentation: Available at localhost:8081 when running the development setup

### Software Requirement Specification

The Software Requirement Specification is available in our wiki [here](https://github.com/bounswe/bounswe2024group1/wiki/Requirements)

### Scenarios


<!-- Describe an end-to-end scenario showcasing core features. -->
- **Scenario**: Describe how a user interacts with the system to achieve a specific goal.

Our initial scenarios and mockups are [here](https://github.com/bounswe/bounswe2024group1/wiki/Scenario-Mockups)

We also have some additional scenarios and mockups [here](https://github.com/bounswe/bounswe2024group1/wiki/Additional-Scenario-&-Mockups)

### Project Plan

The project plan is available in Github Projects but we've also documented it in our wiki [here](https://github.com/bounswe/bounswe2024group1/wiki/Project-Plan)

### Unit Tests

Up-to-date unit test coverage and test report can be found [here](https://github.com/bounswe/bounswe2024group1/wiki/Frontend-Test-Report-&-Coverage)


---

## Individual Contributions

### Member: Enes Baser
- **Responsibilities**:
  - Worked on backend development & maintenance for the project..
- **Main Contributions**:
  - Reviewed all backend related issues, pull requests and unit tests. Managed backend service flows and reviewed new endpoints and maintained quality of previous endpoints..
- **Code-Related Significant Issues**:
  - * [(Backend) Question difficulty rating endpoint](https://github.com/bounswe/bounswe2024group1/issues/590)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/637)
	* [(Backend) Fix incorrect question count in GET /search/tagst](https://github.com/bounswe/bounswe2024group1/issues/591)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/597)
	* [ (Backend) Retrieve questions and answers in user profile](https://github.com/bounswe/bounswe2024group1/issues/598)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/599)
	* [  (Backend) Fix Code Execution results returning 200](https://github.com/bounswe/bounswe2024group1/issues/603)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/625)
	*  [ (Backend) GET /users/{id}/followed-tags returning tags a user follows](https://github.com/bounswe/bounswe2024group1/issues/604)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/628)
	* [(Backend) Return difficulty of questions in searchQuestions and getQuestionById](https://github.com/bounswe/bounswe2024group1/issues/611)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/626)
	* [(Backend) Implement Reputation Point Feature](https://github.com/bounswe/bounswe2024group1/issues/642)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/643)
	* [(Backend) Retrieve tags in sorted order based on question count linked to that tag](https://github.com/bounswe/bounswe2024group1/issues/653)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/654)
	* [(Backend) Tag Creation will be limited](https://github.com/bounswe/bounswe2024group1/issues/657)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/654)
- **Management-Related Significant Issues**:
  - Dealed with testing strategy of backend and tools in order to generate test coverage report.
- **Pull Requests**:
  - Personal Pull Requests linked with related issues above.
- **Unit Tests**:
Unit tests are implemented for the backend services as follows :

  - Authentication Service
  - User Service
  - Question Service
  - Also integrated the test report tool into backend to see visual content of test coverage result in proper format.
- **Additional Contributions**:


### Member: Nazire Ata
### Nazire Ata
- **Responsibilities**
  My main responsibility was in the front-end team. I was also responsible for updating most of the documentation to keep up with our decisions.

- **Main Contributions**
  In the front-end part, I implemented many features in the Question Page, namely the code snippets, previews, difficulty rating, and Question edit functionality. I was also responsible for Accessibility issues in the Web and Mobile application design. I manually checked every page we had, and fixed the related accessibility issues.
  For the documentation, I added due dates on our project roadmap right when we got the feedback related to it. I created some additional [Scenarios & Mockups] to showcase our domain-specific features and updated our requirements to have our newly made decisions properly documented.


- **Code-Related Significant Issues**
  - Issues that resolved:
	* [[Frontend] Tag Badge Link Issue #687](https://github.com/bounswe/bounswe2024group1/issues/687)[:link:PR](https://github.com/bounswe/bounswe2024group1/pull/688)
	* [[Frontend] Add Fallback for Missing Profile Pictures #679](https://github.com/bounswe/bounswe2024group1/issues/679)[:link:PR](https://github.com/bounswe/bounswe2024group1/pull/680)
    * [[Frontend] Accessibility Issues #644](https://github.com/bounswe/bounswe2024group1/issues/644)[:link:PR](https://github.com/bounswe/bounswe2024group1/pull/648)
	* [[Frontend] Implement Edit Question Functionality #641](https://github.com/bounswe/bounswe2024group1/issues/641)[:link:PR](https://github.com/bounswe/bounswe2024group1/pull/675)
	* [[Frontend] Add Preview to Questions #633](https://github.com/bounswe/bounswe2024group1/issues/633)[:link:PR](https://github.com/bounswe/bounswe2024group1/pull/634)
   	* [[Frontend] Add Code Snippets to Questions #631](https://github.com/bounswe/bounswe2024group1/issues/631)[:link:PR](https://github.com/bounswe/bounswe2024group1/pull/632)
	* [[Frontend] Implement Question Difficulty Rating UI #606](https://github.com/bounswe/bounswe2024group1/issues/606)[:link:PR](https://github.com/bounswe/bounswe2024group1/pull/645)

  - Issues that reviewed
	* [[Backend] Retrieve tags in sorted order based on question count linked to that tag #653](https://github.com/bounswe/bounswe2024group1/issues/653)
	* [[Frontend] Implement Glossary Page for Tag Subtypes #652](https://github.com/bounswe/bounswe2024group1/issues/652)
	* [[Frontend] Show Author for Programming Language Tags #636](https://github.com/bounswe/bounswe2024group1/issues/636)


- **Management-Related Significant Issues**
	* [Add Due Dates to Roadmap #690](https://github.com/bounswe/bounswe2024group1/issues/690)
	* [Create Scenarios to Depict Domain-Specifity #629](https://github.com/bounswe/bounswe2024group1/issues/629)
	* [Update Requirements #610](https://github.com/bounswe/bounswe2024group1/issues/610)



- **Pull Requests**
   - [ **All merged PR links** ](https://github.com/bounswe/bounswe2024group1/pulls?q=is%3Apr+is%3Aclosed+assignee%3ANazireAta+milestone%3A%22451+-+Customer+Milestone+3+-+Final+Product%22)
  - [:link: Frontend/feature/fix tag badge routing](https://github.com/bounswe/bounswe2024group1/pull/688)
  - [:link: Added default profile picture](https://github.com/bounswe/bounswe2024group1/pull/680)
  - [:link: Implement Question Edit](https://github.com/bounswe/bounswe2024group1/pull/675)
  - [:link: Fix Accessibility Issues](https://github.com/bounswe/bounswe2024group1/pull/648)
  - [:link: Add Difficulty Rating to Questions](https://github.com/bounswe/bounswe2024group1/pull/645)
  - [:link: Add Preview to Question](https://github.com/bounswe/bounswe2024group1/pull/634)
  - [:link: Add Code Snippets to Question](https://github.com/bounswe/bounswe2024group1/pull/632)



- **Unit Tests**
  1. Question Difficulty Voting
  - want: updates difficulty counts when voting. Step by step explanation is provided below, for full implementation, see [Related PR](https://github.com/bounswe/bounswe2024group1/pull/645/files#diff-18019bb6d147f881420bfeb99ef57e0b575dfc5360846f5c1a3ab9070b4258c0)
  - Mock Authentication Store:
```
vi.mocked(useAuthStore).mockReturnValue({
  selfProfile: { id: 2 },
  token: "mock-token",
});

```
Render DifficultyBar Component:
```
render(
  <MemoryRouter initialEntries={["/question/1"]}>
    <Routes>
      <Route
        path="/question/:questionId"
        element={
          <DifficultyBar
            questionId={1}
            easyCount={5}
            mediumCount={3}
            hardCount={2}
          />
        }
      />
    </Routes>
  </MemoryRouter>,
);
```
Simulate Voting:
```
const mediumButton = screen.getByText("Medium");
fireEvent.click(mediumButton);
```
Verify Updated Counts:
```
expect(await screen.findByText("Easy: 0 votes")).toBeInTheDocument();
expect(await screen.findByText("Medium: 1 votes")).toBeInTheDocument();
expect(await screen.findByText("Hard: 0 votes")).toBeInTheDocument();
```
2. Question Edit  [Related PR](https://github.com/bounswe/bounswe2024group1/pull/645/files#diff-18019bb6d147f881420bfeb99ef57e0b575dfc5360846f5c1a3ab9070b4258c0)

### Member: Mehmet Efe Akça
**Responsibilities:** Backend, DevOps, Frontend

#### **Responsibilities**
Throughout this milestone, I served as a full-stack developer with a strong focus on DevOps. My primary responsibilities included:

- Managing and migrating our deployment infrastructure on DigitalOcean
- Implementing and maintaining CI/CD pipelines
- Fixing key backend bugs like missing data in tag details and incorrect data schemas in question-related endpoints
- Contributing to frontend development with a focus on search functionality and UX improvements
- Serving as the lead code reviewer for frontend pull requests, ensuring code quality and consistency
- Coordinating cross-team efforts by working closely with both backend and frontend teams
  - In particular, I had a major role in planning for milestone 3. My tasks included coordinating the creation of issues and their completion by team members. Consistently checking the progress of the issues and ensuring that the team was on track for the final product.

I played a crucial role in ensuring our application remained stable and performant while new features were continuously integrated and deployed. My position as the frontend code reviewer helped maintain high standards across our codebase and facilitated knowledge sharing among team members.

#### **Main Contributions**

##### Code-Related Significant Issues
1. Backend Development
   - [#667 - GetTagDetails Endpoint Always Returns following false](https://github.com/bounswe/bounswe2024group1/issues/667)
   - [#619 - Make QuestionDTOs consistent](https://github.com/bounswe/bounswe2024group1/issues/619)

2. Frontend Implementation
   - [#617 - Implement Question Search](https://github.com/bounswe/bounswe2024group1/issues/617)
   - [#605 - Add difficulty level display to Question card](https://github.com/bounswe/bounswe2024group1/issues/605)
   - [#602 - Show followed tags in profile](https://github.com/bounswe/bounswe2024group1/issues/602)
   - [#601 - Implement Difficulty Level Filter on the Search Page](https://github.com/bounswe/bounswe2024group1/issues/601)
   - [#600 - Implement Difficulty Filter on the Tag Page](https://github.com/bounswe/bounswe2024group1/issues/600)
   - [#588 - Improve User Guiding for Code Block Syntax](https://github.com/bounswe/bounswe2024group1/issues/588)

3. DevOps
   - [#622 - Migrate to new DigitalOcean account](https://github.com/bounswe/bounswe2024group1/issues/622)
   - [#614 - Run type-checking in CI](https://github.com/bounswe/bounswe2024group1/issues/614)

#### Management-Related Significant Issues
- [#710 - Milestone 3 Report](https://github.com/bounswe/bounswe2024group1/issues/710)
- [#649 - Document Final Presentation Plan](https://github.com/bounswe/bounswe2024group1/issues/649)
- [#587 - Document Testing Strategies](https://github.com/bounswe/bounswe2024group1/issues/587)
- [#583 - Document Primary Features](https://github.com/bounswe/bounswe2024group1/issues/583)
- [#577 - Milestone 2 Report](https://github.com/bounswe/bounswe2024group1/issues/577)

#### **Pull Requests**
1. Infrastructure & Deployment
   - [#708 - Deploy](https://github.com/bounswe/bounswe2024group1/pull/708)
   - [#699 - [Deploy] Test deploy](https://github.com/bounswe/bounswe2024group1/pull/699)
   - [#678 - [Deploy] Test deploy](https://github.com/bounswe/bounswe2024group1/pull/678)
   - [#671 - [Deploy] Test deploy](https://github.com/bounswe/bounswe2024group1/pull/671)
   - [#670 - [DevOps] Migrate DigitalOcean account](https://github.com/bounswe/bounswe2024group1/pull/670)
   - [#647 - [Deploy] Deploy to main](https://github.com/bounswe/bounswe2024group1/pull/647)
   - [#623 - [Deploy] Deploy to Production](https://github.com/bounswe/bounswe2024group1/pull/623)
   - [#616 - [Devops] Add Frontend type checking to CI](https://github.com/bounswe/bounswe2024group1/pull/616)
   - [#714 - [Devops] Add Frontend Tests, Fix Coverage, Update API Docs](https://github.com/bounswe/bounswe2024group1/pull/714)

2. Backend Implementation
   - [#707 - [Backend] Fix related questions](https://github.com/bounswe/bounswe2024group1/pull/707)
   - [#682 - [Backend] Fix follower count in Tags](https://github.com/bounswe/bounswe2024group1/pull/682)
   - [#677 - [Backend] Fix Self Following Field in Tag Details](https://github.com/bounswe/bounswe2024group1/pull/677)
   - [#676 - fix(backend): fix incompatible question type returned from TagDetails](https://github.com/bounswe/bounswe2024group1/pull/676)
   - [#620 - [Backend] Fix question DTO field](https://github.com/bounswe/bounswe2024group1/pull/620)

3. Frontend Implementation
   - [#703 - [Hotfix] Fix some backend/frontend bugs](https://github.com/bounswe/bounswe2024group1/pull/703)
   - [#698 - [Frontend] Implement some UX improvements](https://github.com/bounswe/bounswe2024group1/pull/698)
   - [#696 - [Frontend] Fix Bookmarks Page](https://github.com/bounswe/bounswe2024group1/pull/696)
   - [#646 - [Frontend] Followed tags in profile](https://github.com/bounswe/bounswe2024group1/pull/646)
   - [#621 - [Frontend] Implement Difficulty Filter in the Question Search Page](https://github.com/bounswe/bounswe2024group1/pull/621)
   - [#618 - [Frontend] Add Difficulty Level in Question Card](https://github.com/bounswe/bounswe2024group1/pull/618)
   - [#615 - [Frontend] Implement Question search](https://github.com/bounswe/bounswe2024group1/pull/615)
   - [#613 - [Frontend] Implement Code Block Popover](https://github.com/bounswe/bounswe2024group1/pull/613)
   - [#612 - [Frontend] Add difficulty filter to Tag Page](https://github.com/bounswe/bounswe2024group1/pull/612)

4. Documentation
   - [#582 - [Lab] Lab 8](https://github.com/bounswe/bounswe2024group1/pull/582)

#### Unit Tests
I have implemented comprehensive test suites for several frontend components:

1. Tag Component Tests (`Tag.test.tsx`)
   - Renders tag information correctly (name, description, logo)
   - Shows 'See all questions' link with correct href
   - Shows create question link when authenticated
   - Hides create question link when not authenticated
   - Renders image with correct alt and title attributes

2. Tags Page Tests (`Tags.test.tsx`)
   - Renders tags list correctly
   - Displays loading state
   - Displays error state
   - Shows create tag button
   - Loads more tags when scrolling
   - Handles empty tags list
   - Updates search results when query changes

3. CustomAnchor Component Tests (`CustomAnchor.test.tsx`)
   - Renders a span when no href is provided
   - Renders an anchor with correct href when provided
   - Navigates to tag page when tag link is clicked
   - Navigates to question page when question link is clicked
   - Sets correct title for tag links
   - Sets correct title for question links
   - Sets loading title for invalid href patterns

4. SearchQuestionsList Component Tests (`SearchQuestionsList.test.tsx`)
   - Renders search results correctly
   - Displays loading state
   - Displays error state
   - Displays empty state message when no results
   - Handles difficulty filter change

Each test suite follows best practices:
- Uses React Testing Library for DOM testing
- Implements proper mocking of dependencies
- Tests both success and error states
- Verifies component behavior in different authentication states
- Ensures proper rendering of UI elements and user interactions

#### Additional Information
#### Pull Request Reviews
I served as the main code reviewer for the frontend team during this milestone. The following is a list of PRs I've reviewed:

1. Frontend Improvements
   - [#706 - [Frontend] UX improvements](https://github.com/bounswe/bounswe2024group1/pull/706)
   - [#697 - [Frontend] Add loading screen to TagType Page](https://github.com/bounswe/bounswe2024group1/pull/697)
   - [#694 - [FE] Implement Glossary Page and Tag Type Pages](https://github.com/bounswe/bounswe2024group1/pull/694)
   - [#692 - [Frontend] Use sr-only text](https://github.com/bounswe/bounswe2024group1/pull/692)
   - [#688 - Frontend/feature/fix tag badge routing](https://github.com/bounswe/bounswe2024group1/pull/688)
   - [#686 - [Frontend] Show reputation points in profile page](https://github.com/bounswe/bounswe2024group1/pull/686)
   - [#684 - [Frontend] Implement Bookmark Page](https://github.com/bounswe/bounswe2024group1/pull/684)
   - [#680 - Added default profile picture](https://github.com/bounswe/bounswe2024group1/pull/680)
   - [#675 - Implement Question Edit](https://github.com/bounswe/bounswe2024group1/pull/675)
   - [#674 - [Frontend] Implement Bookmark button](https://github.com/bounswe/bounswe2024group1/pull/674)
   - [#673 - [Frontend] Show Execution Time](https://github.com/bounswe/bounswe24group1/pull/673)
   - [#672 - [Frontend] Follow/Unfollow Tags](https://github.com/bounswe/bounswe2024group1/pull/672)
   - [#669 - [FE] Display Author Field in the Tag Page](https://github.com/bounswe/bounswe2024group1/pull/669)

2. Mobile Development
   - [#705 - Enhance New Question and New Answer Screens](https://github.com/bounswe/bounswe2024group1/pull/705)
   - [#665 - [Mobile] Filter Questions By Difficulty](https://github.com/bounswe/bounswe2024group1/pull/665)
   - [#640 - [Mobile] Bookmarked Questions Page and Bookmark Button on Questions](https://github.com/bounswe/bounswe2024group1/pull/640)

3. Backend Development
   - [#685 - [BACKEND] GET users/{userid} should return answers, questions, and followed tags](https://github.com/bounswe/bounswe2024group1/pull/685)
   - [#656 - GET users/{userid} should return answers, questions, and followed tags](https://github.com/bounswe/bounswe2024group1/pull/656)
   - [#643 - Implemented reputationPoints flow](https://github.com/bounswe/bounswe2024group1/pull/643)
   - [#637 - Add rating for level of difficulty of a question](https://github.com/bounswe/bounswe2024group1/pull/637)
   - [#628 - Add followed tags to users' profile responses](https://github.com/bounswe/bounswe2024group1/pull/628)
   - [#626 - Fix question related endpoints to retrieve difficulty level](https://github.com/bounswe/bounswe2024group1/pull/626)

### Member: Aslı Gök
**Responsibilities:** Frontend

I was a member of frontend team, I was responsible for implementing Glossary page, Tag Type pages, a custom react markdown component for references of tags and questions during question and answer creations, fixing some bugs within frontend, writing unit tests for these components. In the documentation part, I was responsible for writing user tests, updating the requirements for ensuring the consistency between the SRS and application, writing some parts of the Milestone 3 report.

#### **Main Contributions**

For the final milestone I focused on the implementation of newly requested domain-specific features of the application, those requests were made by customer after the 2nd milestone presentation, @NazireAta created new scenarios & mockups for these features and we clarified them together with the instructor during lab 8 hours, then I implemented these new features in frontend with the guidance of @mmtftr. 
These were :
    i. Glossary page that displays the tag types (fetched from Wikidata in the backend) within the application
    ii. Tag type pages that display the description and tags belonging to that tag type
    iii. A custom component for referencing tags and questions in the question/answer creation forms
I have also written tests for these components.

In the documentation part, I have written user tests, some parts of the milestone 3 report. After @ozdentarikcan and @mmtftr created the scenarios for the final presentation, we worked on the content that will be shown before the presentation.

#### Code-Related Significant Issues
  - [[Frontend] References to Tags and Questions #589](https://github.com/bounswe/bounswe2024group1/issues/589), [Merged PR 🔗](https://github.com/bounswe/bounswe2024group1/pull/624)
  - [[Frontend] Show Author for Programming Language Tags #636](https://github.com/bounswe/bounswe2024group1/issues/636), [Merged PR 🔗](https://github.com/bounswe/bounswe2024group1/pull/669)
  - [[Frontend] Implement Glossary Page for Tag Subtypes #652](https://github.com/bounswe/bounswe2024group1/issues/652), [Merged PR 🔗](https://github.com/bounswe/bounswe2024group1/pull/694)
  
#### Management-Related Significant Issues
  - [[Documentation] Lab 9 Report #661](https://github.com/bounswe/bounswe2024group1/issues/661)
  - [[Documentation] Document Customer Feedback for Final Milestone Demo Presentation #709](https://github.com/bounswe/bounswe2024group1/issues/709)
  - [[Documentation] Write User Tests for the Project #655](https://github.com/bounswe/bounswe2024group1/issues/655)
  - [Milestone 3 Report #710](https://github.com/bounswe/bounswe2024group1/issues/710)

#### **Pull Requests**
  - [[FE] Implement Tag and Question References for Answer Creation #624](https://github.com/bounswe/bounswe2024group1/pull/624)
  - [[FE] Display Author Field in the Tag Page #669](https://github.com/bounswe/bounswe2024group1/pull/669)
  - [[FE] Implement Glossary Page and Tag Type Pages #694](https://github.com/bounswe/bounswe2024group1/pull/694)

#### Unit Tests
- Unit tests check the listed conditions for that component under the specified file names. I have 2 examples here :

  - glossary.test.tsx :
    - renders glossary title correctly
    - renders tag counts and descriptions for tag types correctly
    - renders error alert when there is an error

  - CreateTagForm.test.tsx :
    - renders form elements correctly
    - submits form with valid data when 'Create Tag' is clicked
    ```
    // Simulate user input
    fireEvent.change(nameInput, { target: { value: "NewTag" } });
    fireEvent.change(descriptionInput, {
      target: { value: "A description for NewTag" },
    });
    ```
    - disables submit button when form is empty
    - shows loading state while creating the tag
    - clears form inputs after successful submission
    - does not submit if fields are empty

### Çağatay Çolak
**Responsibilities:** Backend

* In the third milestone, I have contributed to the backend development by implementing endpoints and ensuring their functionality with unit tests.

**Main Contributions**
My contributions to the project's third milestone include writing endpoints for the backend, documenting Domain-Specific Features for the project.


**API Contributions**
  - Endpoint: > GET /api/v1/users/{userid}
  - Purpose: Improve the GET users/{userid} endpoint to return answers, questions, and followed tags for the related user.

  - Implementation:
```
@GetMapping(value = EndpointConstants.UserEndpoints.USER_ID)
        public ResponseEntity<GenericApiResponse<UserProfileResponseDto>> getUserById(
                        @PathVariable(name = "id") Long id) {
                Optional<User> user = userService.getUserById(id);
                if (user.isPresent()) {
                        UserProfileResponseDto userProfileResponseDto = modelMapper.map(user.get(),
                                        UserProfileResponseDto.class);
                        userProfileResponseDto.setReputationPoints(userService.calculateReputation(user.get()));
                        userProfileResponseDto.setSelfFollowing(userService.selfFollowing(user.get()));
                        List<QuestionSummaryDto> questions = questionService.findByAuthorId(id);
                        userProfileResponseDto.setQuestions(questions);
                        userProfileResponseDto.setQuestionCount((long) questions.size());
                        List<GetAnswerDtoForProfile> answers = answerService.findByAnsweredBy(id);
                        userProfileResponseDto.setAnswers(answers);
                        userProfileResponseDto.setAnswerCount((long) answers.size());
                        userProfileResponseDto.setFollowedTags(tagService.getFollowedTags(id));

                        GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildSuccessResponse(
                                        userProfileResponseDto.getClass(),
                                        "User retrieved successfully",
                                        HttpStatus.OK.value(),
                                        userProfileResponseDto);
                        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));

                } else {
                        ErrorResponse errorResponse = ErrorResponse.builder()
                                        .errorMessage("User not found")
                                        .build();
                        GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                                        UserProfileResponseDto.class,
                                        "User not found",
                                        HttpStatus.NOT_FOUND.value(),
                                        errorResponse);
                        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
                }

        }
```

**Code-Related Significant Issues**
* Implement GET 627 users/{userid} [#627](https://github.com/bounswe/bounswe2024group1/issues/627)

**Management-Related Significant Issues**
* Documenting Domain-Specific Features [#584](https://github.com/bounswe/bounswe2024group1/issues/584)

**Non-code related Significant Issues**
* Documenting Domain-Specific Features [#584](https://github.com/bounswe/bounswe2024group1/issues/584)

**Unit Tests**
* Vote Service
* Tag Service
* Bookmark Service
* Customer User Details Service

**Pull Requests**
* [Implement GET users/{userId}(#685)](https://github.com/bounswe/bounswe2024group1/pull/685)


### Atakan Yaşar

#### Main Contributions
- Developed and enhanced various mobile components, including the New Question and New Answer screens, Profile Page, and Home Page.
- Designed mobile-specific UI elements, such as the Question Card and Difficulty Filter for Questions.
- Implemented the Follow/Unfollow Tag feature and the functionality to bookmark questions, ensuring unique bookmarks for each user and question.
- Enhanced the backend by fixing bugs related to bookmarks and implementing APIs for fetching bookmarked questions.
- Worked on the sorting of questions in a recommended order in mobile for improved user experience.
- Contributed to the overall customer milestone by delivering key features for the mobile app.

#### Issues
- [#705 - [Mobile] Enhance New Question and New Answer Screens](https://github.com/bounswe/bounswe2024group1/pull/705)
- [#700 - [Mobile] Sort Questions in Recommended Order](https://github.com/bounswe/bounswe2024group1/pull/700)
- [#666 - [Mobile] Create Profile Page](https://github.com/bounswe/bounswe2024group1/pull/666)
- [#663 - [Mobile] Design Question Card for Mobile](https://github.com/bounswe/bounswe2024group1/pull/663)
- [#660 - [Mobile] Difficulty Filter For Questions](https://github.com/bounswe/bounswe2024group1/pull/660)
- [#651 - [Mobile] Implement Home Page](https://github.com/bounswe/bounswe2024group1/pull/651)
- [#650 - [Mobile] Follow/Unfollow Tag](https://github.com/bounswe/bounswe2024group1/pull/650)
- [#638 - [Backend] Bookmarks Should Be Unique to User and Question](https://github.com/bounswe/bounswe2024group1/pull/638)
- [#630 - [Backend] GET /questions/bookmarked - Should Get User's bookmarks](https://github.com/bounswe/bounswe2024group1/pull/630)

#### Pull Requests
- [#705 - [Mobile] Enhance New Question and New Answer Screens](https://github.com/bounswe/bounswe2024group1/pull/705)
- [#701 - [Mobile] Sort Recommended Order](https://github.com/bounswe/bounswe2024group1/pull/701)
- [#695 - [Mobile] Profile Page](https://github.com/bounswe/bounswe2024group1/pull/695)
- [#668 - [Mobile] Follow/Unfollow Tag](https://github.com/bounswe/bounswe2024group1/pull/668)
- [#665 - [Mobile] Filter Questions By Difficulty](https://github.com/bounswe/bounswe2024group1/pull/665)
- [#664 - [Mobile] Design Question Card](https://github.com/bounswe/bounswe2024group1/pull/664)
- [#659 - [Mobile] Home Page](https://github.com/bounswe/bounswe2024group1/pull/659)
- [#640 - [Mobile] Bookmarked Questions Page and Bookmark Button on Questions](https://github.com/bounswe/bounswe2024group1/pull/640)
- [#639 - [BE] Fix/638-bookmark](https://github.com/bounswe/bounswe2024group1/pull/639)
- [#635 - [BE] Feature/630 get bookmarked questions](https://github.com/bounswe/bounswe2024group1/pull/635)

#### API Contributions
- [#638 - [Backend] Bookmarks Should Be Unique to User and Question](https://github.com/bounswe/bounswe2024group1/pull/638): Fixed issue with bookmarks being non-unique across users and questions.
- [#630 - [Backend] GET /questions/bookmarked - Should Get User's bookmarks](https://github.com/bounswe/bounswe2024group1/pull/630): Implemented API to fetch a user's bookmarked questions.

#### Unit Tests
- [See the commit for #630](https://github.com/bounswe/bounswe2024group1/pull/635/commits/eed961e841d91735a23ee4ed509b3bb45d4888ea)

### Tarik Can Ozden
**Responsibilities:** Backend & Frontend

Throughout this milestone, I worked on backend and frontend. My primary responsibilities were:

- Implementing personal recommendation in backend through search queries
- Implementing new or missing features in frontend
- Fixing and improving frontend compontents.
- Documenting reports, feedbacks and scenarios.


#### **Main Contributions**

##### Code-Related Significant Issues
1. Backend Development
   - [#689 - [Backend] Sort Questions by Users Followed for Personal Recommendation](https://github.com/bounswe/bounswe2024group1/issues/689)

2. Frontend Development
   - [#609 - [Frontend] Accessibility: Use-sr only text on non-interactive elements](https://github.com/bounswe/bounswe2024group1/issues/609)
   - [#596 - [Frontend] Implement Tag Follow/Unfollow](https://github.com/bounswe/bounswe2024group1/issues/596)
   - [#595 - [Frontend] Implement Bookmark button](https://github.com/bounswe/bounswe2024group1/issues/595)
   - [#594 - [Frontend] Implement Bookmark page](https://github.com/bounswe/bounswe2024group1/issues/594)
   - [#593 - [Frontend] Show execution time in Code Execution block](https://github.com/bounswe/bounswe2024group1/issues/593)
   - [#592 - [Frontend] Show reputation points in Profile](https://github.com/bounswe/bounswe2024group1/issues/592)

#### Noncode-Related Significant Issues
- [#710 - Milestone 3 Report](https://github.com/bounswe/bounswe2024group1/issues/710)
- [#709 - [Documentation] Customer Feedback for Final Milestone](https://github.com/bounswe/bounswe2024group1/issues/710)
- [#661 - [Documentation] Lab 9 Report](https://github.com/bounswe/bounswe2024group1/issues/661)
- [#658 - Scenario for Final Milestone](https://github.com/bounswe/bounswe2024group1/issues/658)
- [#586 - Document Project Standards](https://github.com/bounswe/bounswe2024group1/issues/586)

#### **Pull Requests**
1. Backend Implementation
   - [#691 - [Frontend] Sort Questions by Followed Users](https://github.com/bounswe/bounswe2024group1/pull/691)

2. Frontend Implementation
   - [#706 - [Frontend] UX Improvements](https://github.com/bounswe/bounswe2024group1/pull/706)
   - [#697 - [Frontend] Add loading screen to TagType Page](https://github.com/bounswe/bounswe2024group1/pull/697)
   - [#692 - [Frontend] Use sr-only text](https://github.com/bounswe/bounswe2024group1/pull/692)
   - [#686 - [Frontend] Show reputation points in profile page](https://github.com/bounswe/bounswe2024group1/pull/686)
   - [#684 - [Frontend] Implement Bookmark Page](https://github.com/bounswe/bounswe2024group1/pull/684)
   - [#674 - [Frontend] Implement Bookmark button](https://github.com/bounswe/bounswe2024group1/pull/674)
   - [#673 - [Frontend] Show Execution Time](https://github.com/bounswe/bounswe2024group1/pull/673)
   - [#672 - [Frontend] Follow/Unfollow Tags](https://github.com/bounswe/bounswe2024group1/pull/672)


#### Unit Tests
I have implemented unit tests for several frontend components:

1. Follow Button Test (`Tag.test.tsx`)
   - Renders follow button for authenticated users:
```
    it("renders 'Follow' button for authenticated users", () => {
    vi.mocked(useAuthStore).mockReturnValue({
      selfProfile: { id: 1, username: "testuser", profilePicture: "test.jpg" },
      token: "mock-token",
    });

     render(
       <MemoryRouter initialEntries={["/tag/javascript"]}>
         <Routes>
           <Route path="/tag/:tagName" element={<TagPage />} />
         </Routes>
       </MemoryRouter>,
     );

     expect(screen.getByRole("button", { name: /follow/i })).toBeInTheDocument();
   });
```

2. Bookmark Button Test (`question.test.tsx`)
   - Renders bookmark button for authenticated users:
```
   it("renders bookmark button", () => {
    vi.mocked(useAuthStore).mockReturnValue({
      selfProfile: { id: 1},
      token: "mock-token",
    });
    render(
      <MemoryRouter initialEntries={["/question/1"]}>
        <Routes>
          <Route path="/question/:questionId" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: /bookmark/i })).toBeInTheDocument();
  });
```

3. Bookmarks Page Tests (`bookmarks.test.tsx`)
   - Renders bookmarked questions
   - No accessibility violations
```
   it("should have no accessibility violations", async () => {
      const router = createMemoryRouter(routeConfig, {
        initialEntries: ["/bookmarks"],
      });

      await testAccessibility(<RouterProvider router={router} />);
    });

    it("renders bookmarked questions correctly", () => {
      vi.mocked(useGetBookmarkedQuestions).mockReturnValue({
        isLoading: false,
        error: null,
        data: {
          data: { items: mockQuestions, totalItems: mockQuestions.length },
        },
      } as QueryObserverSuccessResult<unknown, GetBookmarkedQuestionsError>);

      render(
        <MemoryRouter initialEntries={["/bookmarks"]}>
          <Routes>
            <Route path="/bookmarks" element={<BookmarkedQuestions />} />
          </Routes>
        </MemoryRouter>,
      );

      expect(
        screen.getByText(`You have ${mockQuestions.length} bookmarked questions.`),
      ).toBeInTheDocument();

      mockQuestions.forEach((question) => {
        expect(screen.getByText(question.title)).toBeInTheDocument();
      });
    });
```

#### Additional Information
#### Pull Request Reviews

- [#708 - Deploy](https://github.com/bounswe/bounswe2024group1/pull/708)
- [#703 - [Hotfix] Fix some backend/frontend bugs](https://github.com/bounswe/bounswe2024group1/pull/703)
- [#698 - [Frontend] Implement some UX improvements](https://github.com/bounswe/bounswe2024group1/pull/698)



