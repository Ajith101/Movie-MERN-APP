import React from "react";

const DeletePopup = ({ setShowPopup, deleteId, deleteItem }) => {
  return (
    <>
      <div className="shadows fixed top-[50px] w-[450px] max-w-[80%] rounded-[4px] bg-white p-[15px]">
        <div className="flex flex-col">
          <h1 className="py-[15px] text-[20px] font-[600]">Confirm delete</h1>
          <p className="text-slate-600">
            Are you sure to delete this from the database ? This action cannot
            be undone.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-[25px]">
          <button
            onClick={() => setShowPopup(false)}
            className="rounded-[4px] bg-slate-100 px-[25px] py-[8px] text-center text-[18px] font-medium text-slate-800 hover:bg-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteItem(deleteId)}
            className="shadows rounded-[4px] bg-red-600 px-[25px] py-[8px] text-[18px] font-[600] text-white hover:bg-opacity-70"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeletePopup;
