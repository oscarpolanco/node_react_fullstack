import React from "react";

export default ({ input }) => {
  console.log(input);
  return (
    <div>
      <input {...input} />
    </div>
  );
};
