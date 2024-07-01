import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase/firebase";
import { link } from "../firebase/api";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const [err, setErr] = useState("");
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const userId = useSelector((user) => user.userslice.user.rest._id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: "",
    discountPrice: "",
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: "",
    offer: false,
    imageUrls: [],
    userRef: "",
  });
  const handleDeleteImage = (i) => {
    const filtered = formData.imageUrls.filter((_, index) => index !== i);
    setFormData({ ...formData, imageUrls: filtered });
  };
  const uploadImages = async () => {
    const urls = [];

    if (files.length >= 1 && files.length < 7) {
      setErr("");
      const storage = getStorage(app);
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        const storageRef = ref(storage, "listings/" + files[i].name);
        const uploadTask = await uploadBytesResumable(storageRef, files[i]);
        const url = await getDownloadURL(uploadTask.ref);
        urls.push(url);
      }
      setFormData({ ...formData, imageUrls: [...formData.imageUrls, urls] });
      setUploading(false);
    } else {
      setErr("images should be less than 6 for single list");
    }
  };
  const handleFormValues = (e) => {
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    } else if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    } else if (e.target.type === "number") {
      setFormData({ ...formData, [e.target.id]: Number(e.target.value) });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length < 1)
      return setFormError("listing should have atleast 1 image");
    if (formData.regularPrice < formData.discountPrice)
      return setFormError("regular price must be greater than discount price ");

    try {
      setFormError("");
      const res = await fetch(`${link}/api/listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: userId }),
      });
      const id = await res.json();
      navigate(`/listitem/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-3/5 mx-auto">
      <h1 className="text-center my-7 font-bold text-3xl capitalize">
        create listing
      </h1>
      <form className="flex gap-4" onSubmit={handleSubmitForm}>
        <div className="flex flex-1 flex-col gap-4">
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleFormValues}
            className="p-3 rounded-lg focus:outline-sky-600"
          />
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={formData.description}
            onChange={handleFormValues}
            className="p-3 rounded-lg focus:outline-sky-600"
          />
          <input
            type="text"
            name="address"
            id="address"
            required
            value={formData.address}
            onChange={handleFormValues}
            className="p-3 rounded-lg focus:outline-sky-600"
          />
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <span className="flex items-center gap-3 ">
              <input
                type="checkbox"
                name=""
                checked={formData.type === "sell"}
                onChange={handleFormValues}
                className="h-5 text-xl scale-150"
                id="sell"
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
                checked={formData.type === "rent"}
                onChange={handleFormValues}
                id="rent"
              />
              <label htmlFor="checkbox" className="capitalize text-lg">
                rent
              </label>
            </span>
            <span className="flex items-center gap-3 ">
              <input
                type="checkbox"
                name=""
                checked={formData.parking}
                onChange={handleFormValues}
                className="h-5 text-xl scale-150"
                id="parking"
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
                checked={formData.furnished}
                onChange={handleFormValues}
                id="furnished"
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
                checked={formData.offer}
                onChange={handleFormValues}
                id="offer"
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
                value={formData.bedrooms}
                onChange={handleFormValues}
                name=""
                max={10}
                min={1}
                className="p-3 rounded-lg"
                id="bedrooms"
              />
              <label htmlFor="number">beds</label>
            </span>
            <span className="flex items-center gap-2  ">
              <input
                type="number"
                name=""
                max={10}
                min={1}
                value={formData.bathrooms}
                onChange={handleFormValues}
                className="p-3 rounded-lg"
                id="bathrooms"
              />
              <label htmlFor="number">baths</label>
            </span>
            <span className="flex items-center gap-2  ">
              <input
                type="number"
                name=""
                max={10000000}
                value={formData.regularPrice}
                onChange={handleFormValues}
                min={1}
                className="p-3 rounded-lg"
                id="regularPrice"
              />
              <span className="text-sm capitalize">
                <span>regular price</span>
                <p>($ / month)</p>
              </span>
            </span>
            {formData.offer && (
              <span className="flex items-center gap-2  ">
                <input
                  type="number"
                  name=""
                  value={formData.discountPrice}
                  onChange={handleFormValues}
                  max={10000000}
                  min={1}
                  className="p-3 rounded-lg"
                  id="discountPrice"
                />
                <span className="text-sm capitalize">
                  <span>discounted price</span>
                  <p className="text-center">($ / month)</p>
                </span>
              </span>
            )}
          </div>
        </div>
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
              className="border disabled:opacity-50 border-green-700 rounded-lg p-3 capitalize"
              onClick={uploadImages}
              disabled={uploading}
            >
              {uploading ? "uploading..." : "upload"}
            </button>
          </div>
          <div className="flex flex-col ">
            {formData.imageUrls.length >= 1 &&
              formData.imageUrls.map((url, i) => (
                <div className="flex items-center justify-between" key={i}>
                  <img className="h-20 w-20 object-contain" src={url} alt="" />
                  <button
                    className="text-red-700 uppercase p-3"
                    onClick={() => handleDeleteImage(i)}
                  >
                    delete
                  </button>
                </div>
              ))}
            {err && <p className="text-red-700 my-3 ">{err}</p>}
          </div>
          <button
            className="capitalize disabled:opacity-50 grow p-3 rounded-lg my-3 w-full text-lg bg-slate-700 text-white"
            disabled={uploading}
            onClick={handleSubmitForm}
          >
            create listing
          </button>
          {formError && <p className="text-red-700 mb-3">{formError}</p>}
        </div>
      </form>
    </div>
  );
}

export default CreateListing;
