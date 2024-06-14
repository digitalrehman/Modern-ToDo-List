import { useRef } from "react";
import TodoList from "./components/TodoList";
import { FaPlus } from "react-icons/fa6";
import { add_ToDo_task } from "./index";

const App = () => {
  const userValue = useRef<HTMLInputElement>(null);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!userValue.current || !userValue.current.value.trim()) {
      return;
    }
    const userData = userValue.current.value.trim();
    userValue.current.value = "";
    let task = {
      task: userData
    };
    add_ToDo_task(task);
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 size-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]" />
      </div>
      <div className="w-full flex flex-col items-center justify-center h-48 ">
        <h1 className="font-anurati md:text-5xl sm:text-3xl text-2xl font-bold my-7">
          MODERN TODO LIST
        </h1>
        <form
          onSubmit={submitHandler}
          className=" md:w-[40%] sm:w-[80%] w-[95%] flex justify-between h-10"
        >
          <input
            ref={userValue}
            type="text"
            placeholder="Enter your task..."
            className="w-[80%] rounded-sm px-3 shadow-md text-black focus:border outline-none"
          />
          <button
            type="submit"
            className="flex w-[19%] font-anurati text-sm  items-center justify-center gap-1 rounded-sm font-semibold bg-white"
          >
            <FaPlus className="text-sm" /> ADD{" "}
          </button>
        </form>
      </div>
      <TodoList />
    </>
  );
};

export default App;
