import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function ItemsList() {
  const { items, loading } = useSelector((e) => e.lists);

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
              <button className="text-green-700 uppercase">edit</button>
              <button className="text-red-700 uppercase">delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ItemsList;
