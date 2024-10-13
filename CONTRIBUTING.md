# Contribution Guide

This document outlines the guidelines for the procedure of contributing to this project. In addition to the processes, we outline several of the important points that must be considered when implementing a feature.

This guide is subject to change as the team develops more efficient workflows.

## Getting Started

Please check out the `README.md` file for the relevant project (under `frontend/`, `backend/`, and `mobile/`) to learn how to set up your development environment. In addition, the `ARCHITECTURE.md` when available contains information about the architecture of the code. `CODEOWNERS` files define who owns that directory and all of its content in terms of code ownership. For the time being, `CODEOWNERS` only consists of the leads for that section of the codebase.

## Release Cycle

We merge all our code into the `develop` branch. From there, releases are cut first by merging to `staging` then tagging the release. A tag will trigger a CD docker build that will build and push to the DigitalOcean Container Registry. Our staging environment will be updated with the new release automatically. Release to the production happens in the same way with a merge from `staging` into `main` and a tag.

Release tags must be **annotated** tags. The tagging format for the releases are `vNUM` where NUM increases incrementally and is independent of the other versions.

Quick fixes may be merged into `staging` or `main` as needed with the approval of a lead on the respective team.

## The Development Process

As a way to ensure code quality, we will be conducting code reviews. We'll have leads for the 3 teams, who will do code reviews. We also encourage all team members to review open PRs as the ability to read code is a very important one to have. It's also very important to be aware of the code changes that are in the process of getting merged.

For the code review process, we utilize Github Pull Requests. Developers will open PRs and assigned reviewers (including the lead) will review and request changes. The developer will respond to those requests and the both parties will iterate until the code is ready to merge.

Here is an outline of steps of a typical code merge:

1. Create a branch for your request ([Branch Naming](#branch-naming))
2. Incrementally develop your feature by committing to your branch.
3. Push the branch to this GitHub repository.
4. Open a pull-request to `develop` with our PR template.
5. Add the lead for the relevant team as a code reviewer and any other teammates you'd like.
6. Iterate as reviews come in and merge when approved. The merge method should be "Create a merge commit"


> [!TIP]
> For a guide on how to do git-specific things, check out [the Git Basics document](https://github.com/bounswe/bounswe2024group1/wiki/Research-%E2%80%90-Git-Basics).

## Code Review

There are a couple of important points to look for when reviewing code. Here are some (but not all) things to look for when reviewing:

#### Readability
  - Code is not too complicated or dense.
  - Code matches the common formatting rules.
  - Naming of variables, classes and files are consistent with the rest of the codebase.
#### Tests
  - All new code that has been added has unit test coverage.
#### Acceptance
  - The changes satisfy the acceptance criteria of the issue linked to it.
  - There aren't unrelated changes included (eg. formatting change should not be combined with a feature addition, please open separate PRs)
#### Description
  - PR description accurately and completely describes the changes included in the PR.
    - The formatting of the changes should be past tense. e.g:
```
- Fixed sign-in button's hover styles
- Implemented dark mode support
- ...
```

### When merging

- Make sure that:
  - all status checks pass (i.e. all CI checks must be passing),
  - there are no unresolved discussions,
  - the lead for that team has approved the changes.


## Branch Naming

We use feature branches with concise naming for the feature. The general form of the feature branch's name is `{scope}/feature/{issue-id}-{short-desc}`.

For example, if you're implementing a sign-in page's form whose task has an issue number `42`, you can name your branch `frontend/feature/42-sign-in-form`.

After merging in your branch with a pull request, you may delete the feature branch.

## Formatting

We aim to use automatic formatters for all the parts of the codebase. For the frontend and mobile parts, this is Prettier and we have our own prettierrc. Please configure your editor as detailed in the `README`. Formatting is also enforced in CI.
