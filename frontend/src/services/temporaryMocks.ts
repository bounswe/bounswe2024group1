export const temporaryMocks = {
  "/questions/{questionId}/rate": (body: unknown) => {
    temporaryMocks["/questions/{questionId}"].payload.data.selfRating = (
      body as unknown as Record<string, number>
    ).rating;

    temporaryMocks["/questions/{questionId}"].payload.data.rating =
      10 + (body as unknown as Record<string, number>).rating;

    return {};
  },
  "/questions/{questionId}/bookmark": (body: unknown) => {
    temporaryMocks["/questions/{questionId}"].payload.data.bookmarked = (
      body as unknown as Record<string, boolean>
    ).bookmarked;
    return {};
  },
  "/questions/{questionId}": {
    status: 200,
    payload: {
      status: 200,
      data: {
        id: 1,
        title: "What is the best way to learn programming?",
        content:
          "I want to learn programming, but I don't know where to start. What is the best way to learn programming?",
        author: {
          id: 2,
          username: "john_doe",
          reputationPoints: 100,
          profilePicture: "https://placehold.co/640x640",
          name: "John Doe",
        },
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        tags: [
          {
            id: "python",
            name: "Python",
          },
        ],
        rating: 10,
        answerCount: 2,
        viewCount: 100,
        bookmarked: false,
        selfRating: 0,
      },
    },
  },
  "/questions/{questionId}/answers": {
    status: 200,
    payload: {
      status: 200,
      data: {
        items: [
          {
            id: 1,
            content:
              "To sort an array in Python, you have several options depending on your specific needs. The most common and straightforward method is to use the built-in `sort()` method for lists or the `sorted()` function for any iterable.\n\n1. Using the `sort()` method:\n  The `sort()` method modifies the original list in-place, which means it doesn't create a new list but changes the order of elements in the existing list.\n\n```python3-exec\nmy_list = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]\nmy_list.sort()\nprint(my_list)\n\n```",
            author: {
              id: 1,
              username: "jane_doe",
              reputationPoints: 150,
              profilePicture: "https://placehold.co/640x640",
              name: "Jane Doe",
            },
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
            rating: 10,
          },
        ],
        totalPages: 1,
      },
    },
  },
  "/users/{userId}": {
    status: 200,
    payload: {
      status: 200,
      data: {
        id: 2,
        username: "john_doe",
        reputationPoints: 100,
        profilePicture: "https://placehold.co/640x640",
        name: "John Doe",
      },
    },
  },
  "/execute-code": {
    status: 200,
    payload: {
      status: 200,
      data: {
        output: "[1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]\n",
        executionTime: 15,
      },
    },
  },
  "/search": {
    status: 200,
    payload: {
      status: 200,
      data: [
        {
          id: "python",
          name: "Python",
          description: "Python is a programming language.",
          questionCount: 100,
          followersCount: 1000,
          following: false,
          photo:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/220px-Python-logo-notext.svg.png",
        },
      ],
    },
  },
  "/tags/{tagId}": {
    status: 200,
    payload: {
      status: 200,
      data: {
        id: "python",
        name: "Python",
        description: "Python is a programming language.",
        questionCount: 100,
        followersCount: 1000,
        following: false,
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/220px-Python-logo-notext.svg.png",
      },
    },
  },
  "/search/tags": {
    status: 200,
    payload: {
      status: 200,
      data: {
        items: [
          {
            id: "python",
            name: "Python",
            description: "general-purpose programming language",
            questionCount: 100,
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/220px-Python-logo-notext.svg.png",
            followersCount: 100,
            following: false,
          },
        ],
        totalItems: 1,
        currentPage: 1,
        totalPages: 1,
      },
    },
  },
};