import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase/firebase";

function CreateListing() {
  const [val, setVal] = useState();
  const [files, setFiles] = useState([]);
  const uploadImages = async () => {
    console.log(files);
    const storage = getStorage(app);
    for (let i = 0; i < files.length; i++) {
      const storageRef = ref(storage, "listings/" + files[i].name);
      const uploadTask = await uploadBytesResumable(storageRef, files[i]);
      // let urlref = ref(storage, `listings/${uploadTask.metadata.fullPath}`);
      const url = await getDownloadURL(uploadTask.ref);
      console.log(url);
      console.log(uploadTask);
    }
  };
  return (
    <div className="w-3/5 mx-auto">
      <h1 className="text-center my-7 font-bold text-3xl capitalize">
        create listing
      </h1>
      <div className="flex gap-4">
        <form className="flex flex-1 flex-col gap-4">
          <input
            type="text"
            name="name"
            id="name"
            required
            className="p-3 rounded-lg focus:outline-sky-600"
          />
          <textarea
            type="text"
            name="description"
            id="description"
            required
            className="p-3 rounded-lg focus:outline-sky-600"
          />
          <input
            type="text"
            name="address"
            id="address"
            required
            className="p-3 rounded-lg focus:outline-sky-600"
          />
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <span className="flex items-center gap-3 ">
              <input
                type="checkbox"
                name=""
                className="h-5 text-xl scale-150"
                id=""
              />
              <label htmlFor="checkbox" className="capitalize text-lg">
                sell
              </label>
            </span>
            <span className="flex items-center gap-3 ">
              <input
                type="checkbox"
                name=""
                className="h-5 text-xl scale-150"
                id=""
              />
              <label htmlFor="checkbox" className="capitalize text-lg">
                rent
              </label>
            </span>
            <span className="flex items-center gap-3 ">
              <input
                type="checkbox"
                name=""
                className="h-5 text-xl scale-150"
                id=""
              />
              <label htmlFor="checkbox" className="capitalize text-lg">
                parking spot
              </label>
            </span>
            <span className="flex items-center gap-3 ">
              <input
                type="checkbox"
                name=""
                className="h-5 text-xl scale-150"
                id=""
              />
              <label htmlFor="checkbox" className="capitalize text-lg">
                furnished
              </label>
            </span>
            <span className="flex items-center gap-3 ">
              <input
                type="checkbox"
                name=""
                className="h-5 text-xl scale-150"
                id=""
              />
              <label htmlFor="checkbox" className="capitalize text-lg">
                offer
              </label>
            </span>
          </div>
          <div className="flex items-center justify-start flex-wrap gap-4 my-3">
            <span className="flex items-center gap-2  ">
              <input
                type="number"
                name=""
                max={10}
                min={1}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="p-3 rounded-lg"
                id=""
              />
              <label htmlFor="number">beds</label>
            </span>
            <span className="flex items-center gap-2  ">
              <input
                type="number"
                name=""
                max={10}
                min={1}
                className="p-3 rounded-lg"
                id=""
              />
              <label htmlFor="number">baths</label>
            </span>
            <span className="flex items-center gap-2  ">
              <input
                type="number"
                name=""
                max={10000000}
                min={1}
                className="p-3 rounded-lg"
                id=""
              />
              <span className="text-sm capitalize">
                <span>regular price</span>
                <p>($ / month)</p>
              </span>
            </span>
            <span className="flex items-center gap-2  ">
              <input
                type="number"
                name=""
                max={10000000}
                min={1}
                className="p-3 rounded-lg"
                id=""
              />
              <span className="text-sm capitalize">
                <span>discounted price</span>
                <p className="text-center">($ / month)</p>
              </span>
            </span>
          </div>
        </form>
        <div className="flex-1">
          <p className="space-x-3 text-sm my-3">
            <span className="font-semibold">images</span>
            <span>The first image will be the cover (max 6)</span>
          </p>
          <div className="flex items-stretch gap-3">
            <input
              type="file"
              className="border-2 p-3"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              className="border border-green-700 rounded-lg p-3 capitalize"
              onClick={uploadImages}
            >
              upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;
