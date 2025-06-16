# Kanban Space

A fully functional Kanban board application built with React and TypeScript, featuring dark and light theme, drag-and-drop functionality using native HTML5 APIs.

## Live Url

- Checkout Kanban space at [kanban.anshjatana.online](https://kanban.anshjatana.online)

## Features

- **Three Column Layout**: Todo, In Progress, and Done columns
- **Task Management**: Add, edit, delete, and move tasks between columns
- **Drag & Drop**: Smooth drag-and-drop functionality with visual feedback
- **Task Details**: Click on any task to view detailed information
- **Responsive Design**: Works across desktop and mobile devices
- **Smooth Animations**: Thoughtful transitions and interactions
- **Preferred Theme**: Light and Dark theme.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd MY-KANBAN_APP
```

2. Install dependencies

```bash
yarn
```

3. Start the development server

```bash
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser

## Usage
- **Onboarding**: Fill your name to get started
- **Add Task**: Click the "+" button in any column to create a new task
- **Edit Task**: Click on a task title to edit it
- **Move Task**: Drag and drop tasks between columns
- **View Details**: Click on a task card to open the detailed view
- **Delete Task**: Use the delete button on task cards

## Task Structure

Each task contains:

- Unique ID
- Title and description
- Current column status
- Creation and modification timestamps

## Build

To create a production build:

```bash
yarn build
```

## Technologies Used

- React.js
- TypeScript
- HTML5 Drag and Drop API
- styled components (with animations)
