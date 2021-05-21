import LoadingOverlay from "./LoadingOverlay";

export const DeleteItems = (props) => {
  return (
    <div className="mx-10">
      <div className="flex justify-between">
        <div className="font-bold">Delete {props.mode}</div>
        <div></div>
      </div>
      <hr size="5" />
      <div className=" font-normal text-sm py-3">
        Are you sure you want to delete this {props.mode} ?
      </div>
      <div className=" flex justify-end">
        <button
          onClick={props.handleCloseModal}
          className="focus:outline-none text-sm bg-white mx-3 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow"
        >
          Cancel
        </button>
        <button
          onClick={props.handleDeleteItem}
          className="focus:outline-none text-sm bg-blue-500  hover:bg-blue-600 text-white font-semibold py-1 px-3 border border-gray-400 rounded shadow"
        >
          {props.pendingDeleteItem ? "Deleting" : "Delete"}
        </button>
      </div>

      <LoadingOverlay
        pending={props.pendingDeleteItem}
        lable="Deleting"
        mode={props.mode}
      />
    </div>
  );
};
