import React from "react";

function AddMemberForm({ closeModal }) {
  return (
    <div className="bg-teal-100 w-full sm:w-[330px] z-90 p-8 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">A'zo qo'shish</h2>
      <div className="mb-4">
        <label
          htmlFor="full_name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          To'liq ism:
        </label>
        <input
          type="text"
          id="full_name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="<full_name>"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="position"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Loihaadagi roli:
        </label>
        <input
          type="text"
          id="position"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="<position>"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="<email>"
        />
      </div>
      <div className="flex space-x-4 mb-4">
        <div className="w-1/2">
          <label
            htmlFor="github_link"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            GitHub:
          </label>
          <input
            type="text"
            id="github_link"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="<github_link>"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="linkedin_link"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            LinkedIn:
          </label>
          <input
            type="text"
            id="linkedin_link"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="<linkedin_link>"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={closeModal}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Bekor qilish
        </button>
        <button
          onClick={closeModal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Qo'shish
        </button>
      </div>
    </div>
  );
}

export default AddMemberForm;
