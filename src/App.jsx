import { useEffect, useState } from "react";
import AddTask from "./componentes/AddTask";
import Tasks from "./componentes/Tasks";
import { v4 } from "uuid"; //Usada para gerar id aleatórios
import Title from "./componentes/Title";

function App() {
  const [tasks, setTasks] = useState(
    //Primeiramente o States vai consultar o local storage, caso não encontre nada
    //retornará uma lista vazia
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  //Pode receber como primeiro parâmetro, uma função e como segundo, uma lista
  //Toda vez que o conteúdo da lista é alterado, o useEffect executa a função
  //Perfeito para salvar alterações quando esta ocorrer
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //Quando o useEffect contiver uma lista vazia, então ele executará sua função somente
  //no início da aplicação, ou seja, na primeira vez que o usuário usar a aplicação
  // useEffect(() => {
  //   async function fetchTasks() {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const data = await response.json();
  //     setTasks(data);
  //   }
  //   //Descomentando essa função o States passa a ser alimentado pela API do Place Holder
  //   //fetchTasks();
  // }, []);

  //Função que altera a propriedade isCompleted do States
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });

    setTasks(newTasks);
  }

  //Função de deleta uma tarefa
  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  }

  //Função para adicionar uma nova tarefa
  function onAddTaskSubmit(title, description) {
    const newTasks = {
      id: v4(), //v4 gera id aleatório
      title: title,
      description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newTasks]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
