import React from "react";

function Feedback() {
  return (
    <div id="feedback" className="bg-yellow-50 border-b-8 border-r-8 border-pink-500 p-8 text-center rounded-xl w-2/3 
    mx-auto my-8 flex flex-col justify-center items-center">
      <h2 className="text-4xl text-purple-800 font-bold mb-4">✍️ Feedback</h2>
      <p className="text-lg text-gray-700 mb-4">We value your feedback! Please let us know how we can improve.</p>
      <textarea
        className="w-4/5 p-4 border-2 border-purple-600 rounded-lg mb-4"
        placeholder="Write your feedback here..."
        rows="4"
      />
      <br />
      <button className="bg-purple-700 text-white py-2 px-6 rounded-lg hover:bg-purple-800">
        Submit
      </button>
    </div>
  );
}

export default Feedback;
