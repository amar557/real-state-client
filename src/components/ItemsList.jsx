import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { link } from "../firebase/api";
import { deleteUserItem } from "../redeux/list.slice";
function ItemsList() {
  const { items, loading } = useSelector((e) => e.lists);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeletItem = async (id) => {
    const items = await fetch(`${link}/api/deleteUserItem/${id}`, {
      method: "DELETE",
    });
    const res = await items.json();
    if (items.ok) {
      dispatch(deleteUserItem(id));
    }
    console.log(res);
  };
  return (
    <div className="w-1/3">
      {loading ? (
        <p>loading ...</p>
      ) : (
        items &&
        items.length > 0 &&
        items.map((item, i) => (
          <div className="flex items-center justify-between">
            <Link to={`/listitem/${item._id}`}>
              <img
                src={item.imageUrls[0]}
                alt=""
                className="h-16 w-16  object-contain"
              />
            </Link>
            <Link
              className="flex-1 ms-2 hover:underline capitalize"
              to={`/listitem/${item._id}`}
            >
              {item.name}
            </Link>
            <div className="flex flex-col uppercase ">
              <button
                className="text-green-700 uppercase"
                onClick={() => navigate(`/updatelisting/${item._id}`)}
              >
                edit
              </button>
              <button
                className="text-red-700 uppercase"
                onClick={() => handleDeletItem(item._id)}
              >
                delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ItemsList;
