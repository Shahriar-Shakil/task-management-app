import Task from "./Task";

let data = [
  {
    title: "Front-end issue",
    priority: "low",
    status: false,
  },
  {
    title: "back-end issue",
    priority: "high",
    status: true,
  },
  {
    title:
      "Footer-end issue Footer-end issueFooter-end issueFooter-end issueFooter-end issue",
    priority: "medium",
    status: true,
  },
];
type Props = {};

export default function Tasks({}: Props) {
  let task;
  if (data.length) {
    task = data.map((item, i) => <Task key={i} task={item} />);
  }
  return <div className="space-y-2">{task}</div>;
}
