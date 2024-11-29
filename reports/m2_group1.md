# Milestone 2 Report: Group 1

<!-- Add a brief introduction about the milestone and its goals -->
This milestone was focused on search tags/users/questions, creating questions/answers/tags, follow/unfolllow users, upvote/downvote/bookmark questions/answers, and new domain-specific features like Exercism suggestions to release MVP with the collaboration of backend/frontend/mobile development teams. As we selected "Accessibility" as the web standard for our application, we prioritized the implementation of this standard through features like appropriate color-contrasts in the UI design, alt-texts for images, tab control with keyboard also many keyboard shortcuts to enhance UX. We prioritized showing the demo with the most significant domain-specific features of our application. This allowed us to get feedback from the customer and to set the right direction for the project for the final milestone.

## Project Status
<!-- Summarize the current state of the project. Include:
- What has been accomplished
- What is currently in progress
- Major challenges encountered
- Any deviations from original plan -->
We mainly focused on the software deliverables for this milestone thus; backend, mobile and frontend development. We decided on what to show on our Customer Milestone presentation and focused on developing the features that we wanted to display.

In backend development, we created question/answer/tag entities, SPARQL queries for fetching the tag information from WikiData, implemented API end-points for search(tags/users/questions),tags, questions(GET,POST,DELETE for questions, upvote/downvote, bookmarks), answers(GET, POST, DELETE for answers), code execution service for code snippets in questions/answers, user experience levels. On the frontend, we implemented components including the Feed Page, Question,Answer,Tag Creation Forms, Exercism Suggestion Integration for Tags, Highlighting 3 questions on the Tag Page for beginner users alongside implementing the mobile components for the Profile, Answer, Question, Tag Creations. We have connected backend services to the components in frontend and mobile.

The documentation and DevOps teams also updated requirements specification, created new mockups for new domain-specific features. We also fixed the Design Diagrams(use case, sequence, and activity diagrams) in the light of the feedback we received for the first milestone. Additionally, the team organized the Wiki Home page structure for easy access to the CMPE451 documentation.

### Planned Changes
<!-- Detail any changes planned for the next phase based on:
- Technical requirements
- Customer feedback
- Team capacity
- Lessons learned -->
Based on our customer feedback and team discussions, we plan to make the following changes in our next development phase:

- We plan to implement the recommendation system for feed
- We plan to revise the post management system (questions & answers) to include discussions across different programming languages, computational elements for programming language enthusiasts to enjoy the application.

These changes will be prioritized based on technical dependencies and team capacity, with implementation beginning in the next sprint cycle.

## Customer Feedback and Reflections
<!-- Add the main points from the customer demo:
- What features were well-received
- What improvements were suggested
- Any clarifications provided
- How this feedback will be incorporated -->

During the customer demo, we received valuable feedback and questions about various aspects of our system:

1. **Difficult Level of Questions**
   - Question: How can user know the difficulty level of his/her question while creating it?
   - Clarification: For now, we expect from user to decide. For future improvements we may consider to determine the difficulty level based on answers.

2. **Executable Code Snippets**
   - Question: How can user know that she needs to write `language-exec` for executable code snippets while creating a question?
   - Response: It is displayed as the placeholder text in the question creation form's content field.
It can be seen, and the content will be written according to it.

3. **Programming Languages Enthusiasts Experience**
   - Question: What improvements can be made for programming language enthusiasts to enjoy the application more?
   - This sparked an important discussion about the post management
   - Customer suggested allowing discussions across different programming language aspects like comparisons between elements, historical facts
   - Need to establish clear guidelines for discussion posts

The feedback highlighted several key areas for improvement and clarification in our requirements and implementation plans. The team particularly noted the importance of:
- Determining question difficulty level criteria
- Implementing discussions for domain-related information
### **Suggested Improvements**

Based on customer feedback, we have identified several key improvements to be implemented:

1. **Question Difficulty Classification**
   - The three-level difficulty system for the questions will be the same except that the difficulty level criteria will be determined by the answers

2. **Discussions**
   - Expand post system to include not only questions and answers but also discussions
   - Consider comparisons among different programming language elements

These improvements will be prioritized and discussed in detail during the next team meeting to create concrete implementation plans.


## List and Status of Deliverables

### 1.2 List the status of deliverables

| Deliverable | Status |
| -------- | ------- |
| [Github Repository](https://github.com/bounswe/bounswe2024group1/releases/tag/customer-milestone-2) | Completed ✔️|
| [Deployed Application](https://programming-languages-forum-ahwzj.ondigitalocean.app/) | Completed ✔️|
| [Software Design Diagrams](https://github.com/bounswe/bounswe2024group1/wiki/Software-Design-Diagrams) | Completed ✔️ |
| [Meeting Notes](https://github.com/bounswe/bounswe2024group1/wiki/451-Meeting-Notes)| Completed ✔️|

### Addressed Requirements:
The addressed requirements for this milestone are listed below:
- User Requirements:
   - 1.1. User Registration and Authentication:
       - [1.1.1. Registration](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#111-registration)
       - [1.1.3.Personal Information](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#113-personal-information)
       - [1.1.4. Sign in](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#114-sign-in)
       - [1.1.6. Log out](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#116-logout)
   - [1.2. Profile Page](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#12-profile-page)
   - [1.3. Search](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#13-search)
   - 1.4 Feed :
      - [1.4.1.1 The Feed shall be shown to all Users upon entry to the System.](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#1411)
  - [1.5. Tag Page](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#15-tag-page)
  - [1.6. Question Page](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#16-question-page)

- System Requirements:
  - [2.1. Wikidata API](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#21-wikidata-api)
  - [2.2. Feed](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#22-feed)
  - [2.3. Search](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#21-search)
  - [2.5. Input Validation](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#25-input-validation)

- Non-functional Requirements:
  - [3.4. Accessibility](https://github.com/bounswe/bounswe2024group1/wiki/Requirements#34-accessibility)


### Software Artifacts
<!-- List all deliverables and their status. Include:
- Repository organization
- Documentation
- Design documents
- Test coverage
- Deployment status -->
Our [README](https://github.com/bounswe/bounswe2024group1/blob/main/README.md) contains the information about the project structure, deployment instructions, and other relevant information.

Each subdirectory (frontend/mobile/backend) has its own README file that contains information about the directory structure, deployment instructions, and other relevant information. These can be accessed via [backend](https://github.com/bounswe/bounswe2024group1/blob/main/backend/README.md), [frontend](https://github.com/bounswe/bounswe2024group1/blob/main/frontend/README.md), and [mobile](https://github.com/bounswe/bounswe2024group1/blob/main/mobile/README.md).

Our CI runs can be accessed via [Actions](https://github.com/bounswe/bounswe2024group1/actions).

The deployment can be accessed [here](https://programming-languages-forum-ahwzj.ondigitalocean.app/)

#### Software Design Diagrams
- [Software Design Diagrams](https://github.com/bounswe/bounswe2024group1/wiki/Software-Design-Diagrams)

### UX Design Decisions
1. Copy Code Button in Code Snippets:\
Programmers frequently reuse code snippets, and this feature reduces the effort needed to copy them. So, we introduced a "Copy Code" button for all code snippets, allowing users to easily copy the code without manual selection. We first implemented it for the web platform and then adapted it for the mobile app to maintain consistency.

2. Highlight Low-Level Questions for Beginner Users:\
  Beginner users benefit from easier access to relevant content, enhancing their learning experience. Our solution was to highlight three low-level questions (marked as "Easy") on the tag pages for users with a "Beginner" experience level. We developed this feature for the web platform and mirrored it on the mobile app. Also, updated the documentation to reflect this feature.

3. UX-Driven Keyboard Shortcuts:\
   This feature improves efficiency for power users by streamlining frequent actions. We added keyboard shortcuts for common actions like navigating tags, posting questions, and copying code snippets. To achieve this, we developed shortcuts and ensured their accessibility within the web platform.

4. UX Parity Between Web and Mobile Platforms:\
Consistency fosters familiarity and reduces the learning curve for users transitioning between devices. So, we ensured UI/UX consistency between the web and mobile platforms. We focused on matching aesthetics and functionality across both platforms.

* We also provided [domain-specific user stories](https://github.com/bounswe/bounswe2024group1/wiki/User-Stories) to provide how these design choices improved the experience of our users.


### Standards Utilized
We have utilized WCAG 2.2 Standards. The standard and the implementation is explained in detail in [Standard Implementation Documentation](https://github.com/bounswe/bounswe2024group1/wiki/WCAG-2.2-Implementation-Documentation)

### API Documentation

You can find the [API documentation](https://github.com/bounswe/bounswe2024group1/tree/main/api-docs). This is automatically generated from the OpenAPI schema. The source of truth is the [OpenAPI schema](https://github.com/bounswe/bounswe2024group1/blob/main/swagger/openapi.yml).

---

## Testing

- **General Test Plan**
  Testing plan is explained in detail in [Testing Documentation](https://github.com/bounswe/bounswe2024group1/wiki/Testing-Documentation)). Please refer to our [Software Quality Standards](https://github.com/bounswe/bounswe2024group1/wiki/Software-Quality-Standards) for the details.

- **Generated Test Reports**

  - [Backend](https://github.com/bounswe/bounswe2024group1/wiki/Backend-Test-&-Coverage)
  - [Frontend](https://github.com/bounswe/bounswe2024group1/wiki/Frontend-Test-Report-&-Coverage)
  - Mobile -- N/A

---

## Planning and Team Process

### Changes Since Milestone 1
We've implemented some of the changes that we were aiming for:
  - shifted our attention to planning to give more headroom to each other when working on issues.
  - improved our CI to include Accessibility tests.
  - regular code reviews were conducted, pair programming was done over Discord to speed things up.

We failed in some of our planned interventions as well:
- Our development workflow still needs to be improved.
  - Due to the new Docker Compose Watch feature, we had some issues on some members' machines with code not reloading correctly inside Docker.
  - Due to the setup being reliant on this feature, some members lost a lot of time which slowed our progress.
  - We had some issues with the deployment pipeline because our CI did not include some checks that the CD did.

#### Future Changes
These failures helped shift our focus. Overall, they brought us to the following steps in terms of DevOps:
- Simplify the development workflow to use Docker mounts instead of Docker Compose Watch.
- Improve the deployment pipeline to include all the necessary checks. (in this case `yarn tsc` needs to be added)
- Design fallback plans for development workflow issues and properly document them.

### Road to Completion

Our plan to complete the project is to finish the remaining deliverables outlined in our requirements and to implement the feedback given by the customer.

### Project Plan
- [Project Plan](https://github.com/bounswe/bounswe2024group1/wiki/Project-Plan)


## Individual Contributions
### Mehmet Efe Akca

#### Responsibilities
- Mobile team lead and developer
- Frontend developer
- DevOps and deployment management
- Documentation coordination
- Project planning and milestone tracking

#### Main Contributions
- Led the mobile development effort, implementing core features like the Question Page, Tag Page, and Profile Page
- Managed deployment pipeline and infrastructure for all components
- Managed software quality plan for the frontend, ensuring code quality and validation.
- Coordinated documentation efforts and milestone report preparation
- Implemented accessibility features in the frontend
- Integrated Exercism API for question recommendations
- Bug-fixed the GET Question endpoint

#### API Contributions
As a frontend/mobile developer, I extensively worked with several complex API endpoints, most notably the Question Details endpoint:

**GET /questions/{questionId}**
This endpoint is crucial for the Question Page implementation, fetching comprehensive question information including votes, answers, and tags. It's used in multiple key scenarios:
1. Displaying detailed question view with all metadata
2. Showing vote status for authenticated users
3. Loading associated tags for navigation
4. Checking bookmark status

Example Request:
```http
GET /questions/123
Authorization: Bearer <jwt_token>
```

Example Response:
```json
{
  "status": 200,
  "data": {
    "id": "123",
    "title": "How to implement quicksort?",
    "content": "I need help understanding quicksort implementation",
    "author": {
      "id": "456",
      "username": "user123",
      "reputationPoints": 150,
      "profilePicture": "https://example.com/pic.jpg"
    },
    "tags": [
      {
        "id": "789",
        "name": "algorithms",
        "questionCount": 42
      }
    ],
    "upvoteCount": 5,
    "downvoteCount": 1,
    "selfVoted": 1,
    "bookmarked": false,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

This endpoint fulfills several key requirements from our specification:
- Requirement 1.6.1: Question content display including title, description, and tags
- Requirement 1.6.3: Vote interaction capabilities
- Requirement 1.6.5: Content visibility for all users
- Requirement 2.5.2: Question validation rules

I integrated this endpoint into both mobile and web frontends, implementing proper error handling, loading states, and optimistic updates for voting interactions.

#### Code-related Significant Issues
1. [#508] Implemented User Profile Screen for mobile
2. [#503] Implemented Answer Creation Page for frontend
3. [#497] Added Copy to clipboard button to code snippets
4. [#496] Implemented experience level field in signup
5. [#481] Added tabbability features for accessibility
6. [#482] Added Accessibility tests
7. [#561] Fixed Question API endpoint
8. [#484] Fixed color inconsistency in mobile

#### Management-related Significant Issues
1. [#577] Milestone 2 Report tracking and coordination
2. [#483] API Schema integration and feedback changes
3. [#521] Fix Class Diagram
4. [#514] Documented software quality plan for the frontend


#### Pull Requests

Created and Merged:
- [#473] [Mobile] Question Page & Tag Page
- [#475] Lab 5: Accessibility Implementation
- [#498] Lab 6: UX Improvements
- [#522] [Deploy] Re-Attempt Deployment
- [#513] Lab 7: Implementation
- [#545] [FE/Mobile] Synchronize API schema
- [#549] [Mobile] Create Profile Page
- [#560] [Frontend] Added Exercism Recommendations Integration
- [#562] [FE] Implement Answer Create Form
- [#563-565] Deployment PRs to `main`
- [#570, #573] Deployment PRs to `main`

Reviewed:
- [#568] [FE] Implement Tag Create - Resolved conflicts with API schema changes
- [#569] [Mobile] Create Answer Page - Helped with navigation flow issues
- [#572] [FE] Implement Feed Page - Resolved styling conflicts
- [#550] [Mobile] Implement Question Creation Page
- [#553] [FE] Implement Question Creation Page
- [#510] Deploy to `main`
- [#474] Implement DELETE Question endpoint - conflict about API schema conformation

#### Additional Information
- Coordinated with backend team to ensure API consistency across all platforms
- Managed deployment infrastructure and resolved various deployment issues
- Led accessibility implementation efforts across frontend components
- Provided technical guidance to team members on mobile development

### Nazire Ata
- **Responsibilities**
  My main responsibility was in the front-end team but I managed to help the back-end team by writing some SPARQL queries. I was also leading the design diagrams part.

- **Main Contributions**
  In the front-end part, I implemented the question creation logic. Unfortunately, I had a lot of problems with Docker throughout the month so I could not have much progress in the coding part. I finally found a way around the problem but lost a lot of time doing so. So, although my contributions to the front-end may look less than what they should be, I allocated a lot of time for reasons that were not in my control.
  For the documentation, I fixed every design diagram based on the feedback from Milestone 1, created [User Stories] to show how our UX design choices improved our domain-specific features, and updated our requirements almost every week to have our newly made decisions properly documented.
  I also helped the backend team by writing some SPARQL queries.

- **API Contributions**
  - Endpoint: > POST /api/v1/questions
  - Purpose: To create a new question with associated metadata like tags and difficulty level.
  - Usage: This endpoint is used when a registered user fills out the "Create Question" form on the platform. The form captures the question's title, content, tags, and difficulty level. Upon submission:
The input is validated using a schema.
A POST request is made to the backend with the collected data.
On success, the user is redirected to the newly created question page.
  - Implementation:
```
import { useCreateQuestion, useSearchTags } from "@/services/api/programmingForumComponents";

const { mutateAsync } = useCreateQuestion({
  onSuccess: (result) => {
    // Invalidate cache and navigate to the new question
    queryClient.invalidateQueries({ queryKey: "getUserData" });
    navigate(`/question/${result.data.id}`);
  },
});

const handleSubmit = async (values) => {
  const tagIds = values.tags.map((tag) => tag.tagId); // Extract tag IDs
  await mutateAsync({
    body: {
      title: values.title,
      content: values.content,
      tagIds,
      difficultyLevel: values.difficultyLevel,
    },
  });
};

```

    - Request:
```
POST /api/v1/questions
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "How to implement a sorting algorithm?",
  "content": "Can someone guide me on different sorting approaches?",
  "tagIds": [1, 3],
  "difficultyLevel": "EASY"
}

```
  - Response: Success(201):
```{
  "id": 42,
  "title": "How to implement a sorting algorithm?",
  "tags": [{ "id": 1, "name": "Python" }, { "id": 3, "name": "Sorting" }],
  "difficultyLevel": "EASY",
  "author": { "id": 12, "username": "user123" }
}

```
  - Response: Error (201):
```
{
  "error": "Authentication required."
}

```



- **Code-Related Significant Issues**
  - Issues that resolved
	* [[Backend] Create SPARQL Queries #444](https://github.com/bounswe/bounswe2024group1/issues/444)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/445)
   	* [[Frontend] Implement Question Creation Page #502](https://github.com/bounswe/bounswe2024group1/issues/502) [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/553)
	* [Update Colors to Meet Contrast Requirements of WCAG #476](https://github.com/bounswe/bounswe2024group1/issues/476)

- Issues that reviewed
	* [[Frontend] Implement experience level field in signup #496](https://github.com/bounswe/bounswe2024group1/issues/496)
	* [[Frontend] Implement keyboard shortcuts for the mid-level engineer’s UX #495](https://github.com/bounswe/bounswe2024group1/issues/495)
	* [[Frontend] Add Accessibility tests #482](https://github.com/bounswe/bounswe2024group1/issues/482)
	* [[Frontend] Add tabbability features #481](https://github.com/bounswe/bounswe2024group1/issues/481)


- **Management-Related Significant Issues**
	* [Update Wiki Home Page #575](https://github.com/bounswe/bounswe2024group1/issues/575)
	* [Fix Use Case Diagrams #520](https://github.com/bounswe/bounswe2024group1/issues/520)
	* [Fix Sequence Diagrams #519](https://github.com/bounswe/bounswe2024group1/issues/519)
	* [Create Customer Milestone 2 Presentation Scenario #515](https://github.com/bounswe/bounswe2024group1/issues/515)
	* [Update Requirements #494](https://github.com/bounswe/bounswe2024group1/issues/494)
	* [Create User Story #493](https://github.com/bounswe/bounswe2024group1/issues/493)


- **Pull Requests**
   - [ **All merged PR links** ](https://github.com/bounswe/bounswe2024group1/pulls?q=is%3Apr+is%3Aclosed+assignee%3ANazireAta+milestone%3A%22451+-+Customer+Milestone+2+--+MVP+Milestone%22)
  - [:link: Added Question Creation Page Structure](https://github.com/bounswe/bounswe2024group1/pull/553)
  - [:link: Create Queries for Software Library and Computer Science Term](https://github.com/bounswe/bounswe2024group1/pull/463)
  - [:link: Create SPARQL Queries Flow](https://github.com/bounswe/bounswe2024group1/pull/445)


### Çağatay Çolak
- **Responsibilities**
<!-- Describe main responsibilities within the team -->
In the second milestone, I have contributed to the backend development by implementing endpoints and ensuring their functionality with unit tests.

- **Main Contributions**
<!-- Overview of contributions to the project -->
My contributions to the project's second milestone include writing endpoints for the backend, documenting research and user stories.


- **API Contributions**
  - Endpoint: > GET /api/v1/users/search
  - Purpose: This endpoint is utilized in the user search functionality of the platform, enabling users to find other members based on partial matches for names or usernames.

  - Implementation:
```
public interface UserRepository extends JpaRepository<User, Long> {
     Optional<User> findByUsernameOrEmail(String usernameOrEmail, String usernameOrEmail1);

     @Query("SELECT DISTINCT u FROM User u WHERE " +
               "LOWER(u.username) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
               "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
               "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%'))")
     Page<User> searchUsers(String query, Pageable pageable);
```

    - Request:
```
GET /api/v1/search/users?q=test
Authorization: Bearer <token>


```
  - Response: 200:
```
{
  {
    "status": 200,
    "message": "Users retrieved successfully",
    "data": {
        "totalItems": 1,
        "totalPages": 1,
        "currentPage": 0,
        "items": [
            {
                "id": 1,
                "username": "test",
                "reputationPoints": 0,
                "experienceLevel": "BEGINNER"
            }
        ]
    },
    "error": null
}

```

- **Code-Related Significant Issues**
* Implement DELETE questions/{questionId}/deleteUpvote [#469](https://github.com/bounswe/bounswe2024group1/issues/469)
* Implement DELETE questions/{questionId}/deleteDownvote [#470](https://github.com/bounswe/bounswe2024group1/issues/470)
* Implement Unit Tests for Backend [#516](https://github.com/bounswe/bounswe2024group1/issues/516)
* Implement User Search endpoint] [#528](https://github.com/bounswe/bounswe2024group1/issues/528)
* Implement Question Search endpoint [#529](https://github.com/bounswe/bounswe2024group1/issues/529)
* Implement GET /users/{userId}/following [#537](https://github.com/bounswe/bounswe2024group1/issues/537)

- **Non-code related Significant Issues**
* Deep Research About Web Content Accessibility Guidelines (WCAG) 2.2 [#479](https://github.com/bounswe/bounswe2024group1/issues/479)
* Create Wiki Page About How to Enforce WCAG 2.2 in Practice with Examples [#480](https://github.com/bounswe/bounswe2024group1/issues/480)
* Documenting User Story [#489](https://github.com/bounswe/bounswe2024group1/issues/489)

- **Pull Requests**
* [Implement Question Search Endpoint (#555)](https://github.com/bounswe/bounswe2024group1/pull/555)
* [Implement User Get Followings Endpoint (#554)](https://github.com/bounswe/bounswe2024group1/pull/554)
* [Implement User Search Endpoint (#552)](https://github.com/bounswe/bounswe2024group1/pull/552)
* [Implement DELETE bookmark question endpoint (#474)](https://github.com/bounswe/bounswe2024group1/pull/474)
* [Implement DELETE upvote and downvote endpoints (#471)](https://github.com/bounswe/bounswe2024group1/pull/471)

### Enes Başer
#### Responsibilities
Generally dealed with backend, Wikidata Query design, database structure & security part of the web.

#### Main Contributions
Reviewed all backend related issues, pull requests and unit tests. Managed backend service flows and database design.

### API Contributions
- Contributed all endpoints except CodeExecution endpoint.
- Request that added below was one of the complex request because it should insert author info, tag info and question related details.
- Usage Scenario : A user can navigate to spesific question to look for details of that question.
- Request chosen GET /api/v1/questions/1
- Sample Response :


	     "status": 200,
	        "message": "Question created successfully",
	        "data": {
	            "id": 1,
	            "title": "Java Serializer",
	            "content": "What is this explain me please ? ",
	            "likeCount": 1,
	            "dislikeCount": 0,
	            "commentCount": 0,
	            "selfQuestion": true,
	            "createdAt": "2024-11-23 11:32:29",
	            "tags": [
	                {
	                    "id": 63,
	                    "name": "Modula-3"
	                },
	                {
	                    "id": 107,
	                    "name": "Simul"
	                },
	                {
	                    "id": 339,
	                    "name": "Open MPI"
	                }
	            ],
	            "updatedAt": "2024-11-23 11:32:29",
	            "author": {
	                "id": 1,
	                "username": "enes",
	                "reputationPoints": 0,
	                "profilePicture": null,
	                "name": "atakan atli"
	            },
	            "rating": 0,
	            "answerCount": 0,
	            "bookmarked": false
	        },
	        "error": null
	    }
	    `

#### Code-related significant issues
- Issues that resolved
	* [Create Question Entity](https://github.com/bounswe/bounswe2024group1/issues/436)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/441)
	* [Create Tag Entity](https://github.com/bounswe/bounswe2024group1/issues/437)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/440)
	* [Create Answer Entity ](https://github.com/bounswe/bounswe2024group1/issues/438)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/442)
	* [Implement POST questions/{questionId}/upvote](https://github.com/bounswe/bounswe2024group1/issues/448)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/450)
	* [Implement POST questions/{questionId}/downvote](https://github.com/bounswe/bounswe2024group1/issues/449)  [:link: PR](https://github.com/bounswe/bounswe2024group1/pull/451)
	* [Implement Wikidata Service](https://github.com/bounswe/bounswe2024group1/issues/455)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/458)
	* [POST /questions Implementation](https://github.com/bounswe/bounswe2024group1/issues/456)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/464)
	* [Implement GET tags/{tagId} endpoint](https://github.com/bounswe/bounswe2024group1/issues/457)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/459)
	* [Implement POST /questions/{questionId}/bookmark](https://github.com/bounswe/bounswe2024group1/issues/465)[:link: PR](https://github.com/bounswe/bounswe2024group1/issues/465)
	* [Implement POST /tags Create a new tag](https://github.com/bounswe/bounswe2024group1/issues/467)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/468)
	* [[Backend] Add Experience Field for User Entity](https://github.com/bounswe/bounswe2024group1/issues/485)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/498)
	* [ [Backend] Implement Get Question with Spesific Tag](https://github.com/bounswe/bounswe2024group1/issues/491)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/498)
	* [Implement Unit Tests for Backend](https://github.com/bounswe/bounswe2024group1/issues/516)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/498)
	* [Backend - Implement Tag Search endpoint](https://github.com/bounswe/bounswe2024group1/issues/523)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/530)
	* [Backend Implement POST answer endpoint](https://github.com/bounswe/bounswe2024group1/issues/524)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/531)
	* [Backend Implement Get Question Endpoint](https://github.com/bounswe/bounswe2024group1/issues/526)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/534)
	* [Implement Delete an Answer Endpoint](https://github.com/bounswe/bounswe2024group1/issues/532)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/535)
	* [Backend Implement PUT Update an answer Endpoint](https://github.com/bounswe/bounswe2024group1/issues/533)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/536)
	* [Backend Implement Delete a Question Endpoint](https://github.com/bounswe/bounswe2024group1/issues/538)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/542)
	* [Backend Implement Update a question Endpoint](https://github.com/bounswe/bounswe2024group1/issues/539)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/543)
	* [Backend Implement GET answers for a question endpoint](https://github.com/bounswe/bounswe2024group1/issues/540)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/558)
	* [Backend Fix 404 Not found api path bugfix](https://github.com/bounswe/bounswe2024group1/issues/541)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/544)
	* [Backend Double upvote should error](https://github.com/bounswe/bounswe2024group1/issues/546)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/557)
	* [Backend Opposite vote should update instead of error](https://github.com/bounswe/bounswe2024group1/issues/547)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/557)
	* [Backend DELETE Question should not affect related Tag](https://github.com/bounswe/bounswe2024group1/issues/551)[:link: PR](https://github.com/bounswe/bounswe2024group1/pull/556)

* [:link:Whole commit history link for development for Milestone 2](https://github.com/bounswe/bounswe2024group1/commits/develop?author=EnesBaserr&since=2024-10-25&until=2024-11-26&before=f31a0328609ef311cf7c5e142d7f65635a300b76+35)
- Issues that reviewed
	* [:link: All issues reviewed ]( https://github.com/bounswe/bounswe2024group1/issues?q=is%3Aissue+milestone%3A%22451+-+Customer+Milestone+2+--+MVP+Milestone%22+is%3Aclosed+label%3A%22component%3A+backend%22)
*  [ **All merged PR links** ](https://github.com/bounswe/bounswe2024group1/pulls?q=is%3Apr+is%3Aclosed+milestone%3A%22451+-+Customer+Milestone+2+--+MVP+Milestone%22+assignee%3AEnesBaserr)
* Also handled merge conflict arised in backend during development.
* Organized code review session for backend.

#### Non-code related significant issues
* Reviewing feedbacks from Milestone 1 and discussed about our Milestone-2 plan.


### Tarık Can Özden
**Responsibilities**
<!-- Describe main responsibilities within the team -->
In the second milestone, my main responsibility was the accessibility and UX improvements in the frontend and documentation.

**Main Contributions**
<!-- Overview of contributions to the project -->
My main contributions in the second milestone are improving the accesibilty through alt texts, highlighting easy questions for beginners in the frontend, documenting data population strategy and other necessary documentations for the documentations, and question embedding system integration for the backend. I created the MongoDB Atlas database, linked the repository with the database but was unable to complete the recommendation system because of the package version and compatibility issues, which will be completed until the last milestone.

**Code-Related Significant Issues**
* Add alt text for profile pictures in profile page for WCAG Accessibility [#478](https://github.com/bounswe/bounswe2024group1/issues/478)
* Highlight low difficulty questions for Guests and Users with Beginner programming experience level [#486](https://github.com/bounswe/bounswe2024group1/issues/486)
* Implement personalized recomemndation (WIP) [#501](https://github.com/bounswe/bounswe2024group1/issues/501)

**Issues that reviewed**

* [Frontend] Add Alt-Text in the Tag Page [#477](https://github.com/bounswe/bounswe2024group1/issues/477)
* [Mobile] Highlight Beginner Questions [#487](https://github.com/bounswe/bounswe2024group1/issues/487)
* [Documentation] Lab meeting notes [#490](https://github.com/bounswe/bounswe2024group1/issues/490)

**Non-code related Significant Issues**
* Data Population Strategy [#517](https://github.com/bounswe/bounswe2024group1/issues/517)
* Milestone 2 Report [#577](https://github.com/bounswe/bounswe2024group1/issues/577)
* Accessibility Standard Implementation Documentation [#580](https://github.com/bounswe/bounswe2024group1/issues/580)
* Test Plan Documentation [#581](https://github.com/bounswe/bounswe2024group1/issues/581)

- **Additional Contributions**
* Created the MongoDB Atlas database for question embeddings.

### Aslı Gök
- **Responsibilities**

For the software development aspect of the project, I was a member of frontend team, I was responsible for implementing Tag Creation Page, Tags page which is a page displays all the tags within the system and Feed Page, writing tests for these pages. In the documentation part, I was responsible for creating new mockups for new domain-specific features, documenting the customer feedback during the demo presentations and some of the meeting notes/lab reports during the lab hours.

- **Main Contributions**

After the first milestone, I have created 3 new mockups for the new domain-specific features according to the customer feedback and team discussion held during the feedback meeting. These are:
- 1. Tags page that shows all tags,
- 2. Computational Term Tag Page,
- 3. Exercism suggestions within the Tag pages

I have implemented Tags, Tag Creation, Feed pages in the frontend with their tests.

- **API Contributions**
  Since I was in the frontend team, I haven't implemented any API end-points.
  I will document one API end-point that I have used, as an example :

  Endpoint: > POST api/v1/tags

  Purpose : Create a new tag with its name and description. It allows user-defined tags within the application.

  Usage : I have called this end-point in the Tag Creation Form. Tag creation form expects name and description from the user, then this POST request is sent to backend. If this process is successfully completed, the user is redirected to the newly created Tag page.

 Implementation:

```react
import { useCreateTag } from "@/services/api/programmingForumComponents";

export function CreateTagForm({ onCreateSuccess }: CreateTagFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutateAsync: createTag, isPending } = useCreateTag();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    try {
      await createTag({
        body: { name, description },
      });
      setName("");
      setDescription("");
      if (onCreateSuccess) onCreateSuccess();
      // Optionally refresh the tag list or show a success message
    } catch (error) {
      console.error("Failed to create tag:", error);
    }
  };
 ```

- Request:

POST /api/v1/tags
Authorization: Bearer <token>

```json
{
  "name": "Asl",
  "description": "A new object-oriented programming language"
}
````

- Response: Success(201):

```json
  {
  "id": "asl",
  "name": "Asl",
  "description": "A new object-oriented programming language"
  }
```

- Response: Error (201):

```json
{
  "error": "Authentication required."
}
```

- **Code-Related Significant Issues**
  - Resolved issues:
  - [Add Alt-Text in the Tag Page #477](https://github.com/bounswe/bounswe2024group1/issues/477), [Merged PR 🔗](https://github.com/bounswe/bounswe2024group1/pull/475)
  - [[Frontend] Add Copy-Code Button to Code Snippets #488](https://github.com/bounswe/bounswe2024group1/issues/488), [Merged PR 🔗](https://github.com/bounswe/bounswe2024group1/pull/498)
  - [[Frontend] Implement Tag Creation Page #504](https://github.com/bounswe/bounswe2024group1/issues/504), [Merged PR 🔗](https://github.com/bounswe/bounswe2024group1/pull/568)
  - [[Frontend] Write Integration Test for Tag Page #512](https://github.com/bounswe/bounswe2024group1/issues/512), [Merged PR 🔗](https://github.com/bounswe/bounswe2024group1/pull/513)
  - [[Frontend] Implement Home Page #571](https://github.com/bounswe/bounswe2024group1/issues/571), [Merged PR 🔗](https://github.com/bounswe/bounswe2024group1/pull/568)

- **Management-Related Significant Issues**
  - Resolved issues:
  - [Create New Mockups #453](https://github.com/bounswe/bounswe2024group1/issues/453)
  - [Add Meeting Note-6 #490](https://github.com/bounswe/bounswe2024group1/issues/490)
  - [Document Customer Feedback for Milestone-2 Demo #576](https://github.com/bounswe/bounswe2024group1/issues/576)
  - [Document Project Status and Deliverables List #579](https://github.com/bounswe/bounswe2024group1/issues/579)

  - Reviewed issues:
  - [Create Customer Milestone 2 Presentation Scenario #515](https://github.com/bounswe/bounswe2024group1/issues/515)
  - [Fix Use Case Diagrams #520](https://github.com/bounswe/bounswe2024group1/issues/520)
  - [Document WCAG 2.2 Standard Implementation Documentation #580](https://github.com/bounswe/bounswe2024group1/issues/580)
  - [Document Test Plan #581](https://github.com/bounswe/bounswe2024group1/issues/581)

- **Pull Requests**
  - [Lab 5 : PR #475](https://github.com/bounswe/bounswe2024group1/pull/475)
  - [[Lab] Lab 6 PR 3498](https://github.com/bounswe/bounswe2024group1/pull/498)
  - [[Lab] Lab 7 PR #513](https://github.com/bounswe/bounswe2024group1/pull/513)
  - [[FE] Implement Tag Create #568](https://github.com/bounswe/bounswe2024group1/pull/568)
  - [[FE] Implement Feed Page #572](https://github.com/bounswe/bounswe2024group1/pull/572)

- **Additional Contributions**
- In the scope of testing strategy of frontend development team, I have written unit/integration tests for all components I have implemented in frontend which can be found under my PR links.


### Atakan Yaşar

- **Responsibilities**
  As a backend and mobile developer, I was responsible for designing, implementing, and maintaining key features across the backend and mobile platforms. My primary focus was to enhance user interaction mechanisms, optimize backend services, and create intuitive mobile interfaces. I also actively participated in collaborative lab tasks and milestone objectives.

- **Main Contributions**
  I contributed extensively to both backend and mobile functionalities, including implementing voting mechanisms for questions and answers, enabling users to follow/unfollow tags, and designing mobile-friendly content creation screens. Additionally, I developed APIs to support core features like code execution and dynamic UI updates.

- **Code-Related Significant Issues**
  1. **Issue**: Resolving the inconsistency in response structures for voted status in questions and answers.
     **Resolution**: Unified the response format across all relevant APIs, ensuring seamless frontend integration.
  2. **Issue**: Safe execution of user-submitted code in the backend.
     **Resolution**: Developed a secure sandbox environment for running user-provided code, preventing system vulnerabilities.

#### Backend Contributions

1. **Rearrange Question & Answer Related Responses to Show Voted Status**
   - Enhanced the backend API to include the user's voting status on questions and answers, improving the UI/UX of the application.
   - **Pull Request**: [#567](#567)

2. **Add selfVoted for Questions and Answers**
   - Implemented a feature to indicate whether a user has voted on specific questions and answers, enabling dynamic UI updates.
   - **Pull Request**: [#566](#566)

3. **Implement POST/DELETE Tag Follow Endpoint**
   - Built endpoints allowing users to follow and unfollow tags, increasing personalization and engagement capabilities.
   - **Pull Request**: [#566](#566)

4. **Implement POST answers/{answerId}/upvote and answers/{answerId}/downvote**
   - Designed and implemented APIs for upvoting and downvoting answers, ensuring seamless integration with the voting mechanism.
   - **Pull Request**: [#509](#509)

5. **Implement Code Execution Service**
   - Created a backend service for executing user-provided code in a safe and controlled environment, enabling dynamic runtime support.
   - **Pull Request**: [#443](#443)
**Implemented API: `POST /execute-code`**
  - **Description**: This API allows users to execute submitted code snippets in a secure sandbox environment, supporting multiple programming languages. It ensures the safe execution of code while providing detailed output and execution time.
  - **Example Call**:
    ```http
    POST /execute-code
    Authorization: Bearer <token>
    Content-Type: application/json
    ```
    **Request Body**:
    ```json
    {
      "code": "print(sorted([5, 1, 9, 3, 5, 6, 4, 3, 5, 2]))",
      "language": "python",
      "input": ""
    }
    ```
    **Response**:
    ```json
    {
      "status": 200,
      "data": {
        "status": "success",
        "output": "[1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]\n",
        "executionTime": 15
      }
    }
    ```
  - **Use Case**: This API is a cornerstone for enabling coding-related features within the application.


#### Mobile Contributions

1. **Create Answer Page**
   - Developed the mobile answer creation page with a clean and intuitive UI, enhancing the content contribution experience.
   - **Pull Request**: [#569](#569)

2. **Implement Question Creation Screen**
   - Designed and implemented a mobile-friendly question creation interface, ensuring a streamlined user workflow.
   - **Pull Request**: [#518](#518)

3. **Highlight Beginner Questions**
   - Added visual indicators for beginner questions in the mobile UI, making the application more user-friendly for new users.
   - **Pull Request**: [#487](#487)

4. **Implement Answer Creation Screen**
   - Built the mobile screen for creating answers, integrating with backend APIs to deliver a seamless user experience.
   - **Pull Request**: [#506](#506)


### Member: Example
- **Responsibilities**
  Provide a general description of assigned responsibilities.

- **Main Contributions**
  Summarize contributions made up to Milestone 2.

- **API Contributions**
  Document at least one complex API endpoint (development or usage).
  Include:
  - Example call and response.
  - Context or scenario in which the endpoint is used.

- **Code-Related Significant Issues**
  Outline significant issues resolved or reviewed.

- **Management-Related Significant Issues**
  Highlight issues that contributed to project management.

- **Pull Requests**
  Summarize created, merged, or reviewed pull requests.
  Mention conflicts (if any) and resolution methods.

- **Additional Contributions**
  List any additional tasks performed.
