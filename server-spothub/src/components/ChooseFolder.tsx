import { Folder } from "@/interfaces/Folder";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  folders: Folder[];
  onClose: () => void;
  onChoose: (folder: Folder) => void;
}

function ChooseFolder({ folders, onChoose, onClose }: Props) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-20">
      <button
        onClick={onClose}
        className="bg-black w-full h-full opacity-25 absolute top-0 left-0 z-20"
      />
      <div className="py-8 px-4 bg-white z-30 max-h-96 flex flex-col relative">
        <h1 className="px-12 text-2xl font-bold text-slate-600 underline">
          Choose folder
        </h1>
        <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll w-full">
          {folders
            .concat(folders)
            .concat(folders)
            .map((folder) => (
              <div className="mx-4">
                <button
                  onClick={() => onChoose(folder)}
                  className="w-full px-8 py-4 bg-slate-100 rounded-sm shadow-md my-2 max-w-sm"
                >
                  {folder.name}
                </button>
              </div>
            ))}
        </div>
        <button onClick={onClose} className="absolute top-2 right-2">
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default ChooseFolder;
