// if user 1 delete the task hen it still not update in the frontend of user-2 and
// user 2 perform action on that deleted task because it is not updated on the frontend
//so in this situation we simply catch the error 

import { useState } from "react";

// the catched error, we can show it with the toaster message it will render for 2 3 secs
//then automatically removed

//then for the update the task list, we priorly store the tasks in the state then simply 
//filter the task - it shows the updated task list
// const [tasks, setTasks] = useState();

// catch (error: any) {
//   if (error.response?.status === 404) {
//     setTasks((prev) =>
//       prev.filter((task) => task.id !== taskId)
//     );

//     setError("This task was removed by another user.");

//     setTimeout(() => {
//       setError("");
//     }, 3000);

//     return;
//   }

//   setError("Something went wrong.");
// }
