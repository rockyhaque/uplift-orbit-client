import { IoPricetagOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

const JobCard = ({job}) => {
  const { _id, title, description, category, service_img, deadline, rating, max_price, min_price, bid_count} = job || {};
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="mt-6">
      <div className="p-5 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-2xl hover:shadow-indigo-200 flex flex-col items-center">
      {!imageLoaded && (
          <div className="flex w-full flex-col gap-4">
            <div className="skeleton h-64 w-full"></div>
          </div>
        )}
        <img
          src={service_img}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
          className="shadow rounded-lg overflow-hidden border h-64 w-full"
        />
        <div className="mt-8">
          <div className="flex justify-between items-center gap-2">
            <h4 className="font-bold text-xl">{title}</h4>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-800 rounded-md">
                <MdOutlineSupervisorAccount className=" text-white " />
              </div>
              <span className="text-xl  font-bold">{bid_count}</span>
            </div>
          </div>
          <p className="badge badge-lg bg-slate-800 text-slate-200">
            {category}
          </p>
          <p className="mt-4 mb-2 text-gray-600">
          {description.slice(0, 68)}...
          </p>
          <hr />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <IoPricetagOutline size={20} className="font-bold" />
              <h6 className="font-semibold">{max_price}-{min_price}</h6>
              <span>$</span>
            </div>
            <div className="flex items-center gap-2">
              <CiCalendar size={20} className="font-bold" />
              <h6 className="font-semibold">{new Date(deadline).toLocaleDateString()}</h6>
            </div>
          </div>
          <div className="mt-5">
            <Link to={`/job/${_id}`}
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
