import React from "react";
import { useComputation } from "./useComputation";
import SubHook from "./SubHook";
import { MySpecialComputation } from "./MySpecialComputation";
export default () => {
  const [post] = useComputation(
    "MySpecialComputation",
    MySpecialComputation,
    1
  );
  return (
    <div>
      <h1>Main hook</h1>
      <h4>Title: {post?.title}</h4>
      <h4>Completed: {post?.completed ? "Yes" : "No"}</h4>
      <SubHook />
    </div>
  );
};
