import React from "react";
import { useComputation } from "./useComputation";
import { MySpecialComputation } from "./MySpecialComputation";
export default () => {
  const [post] = useComputation(
    "MySpecialComputation",
    MySpecialComputation,
    10
  );
  return (
    <div>
      <h1>Subhook</h1>
      <h4>Title: {post?.title}</h4>
      <h4>Completed: {post?.completed ? "Yes" : "No"}</h4>
    </div>
  );
};
