import {
  ColumnHeader,
  DemoSection,
  KanbanColumn,
  KanbanDemo,
  SectionTitle,
  StatusDot,
  TaskCard,
  TaskMeta,
  TaskTitle,
} from "./styles";

interface Task {
  title: string;
  meta: string;
}

interface Column {
  color: string;
  title: string;
  tasks: Task[];
}

interface DemoProps {
  demoData: Column[];
}

const Demo = ({ demoData }: DemoProps) => {
  return (
    <DemoSection>
      <SectionTitle>See It In Action</SectionTitle>
      <KanbanDemo>
        {demoData.map((column, index) => (
          <KanbanColumn key={index}>
            <ColumnHeader>
              <StatusDot color={column.color} />
              {column.title}
            </ColumnHeader>
            {column.tasks.map((task, taskIndex) => (
              <TaskCard key={taskIndex}>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskMeta>{task.meta}</TaskMeta>
              </TaskCard>
            ))}
          </KanbanColumn>
        ))}
      </KanbanDemo>
    </DemoSection>
  );
};

export default Demo;
