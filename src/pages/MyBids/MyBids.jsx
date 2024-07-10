import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { LuCheckCircle } from "react-icons/lu";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBids = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [bids, setbids] = useState([]);

  useEffect(() => {
    getData();
  }, [user]);

  const getData = async () => {
    const { data } = await axiosSecure(`/myBids/${user?.email}`);
    setbids(data);
  };

  console.log(bids);

  const handleStatus = async (id, status) => {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/bid/${id}`,
      { status }
    );
    console.log(data);
    toast.success("Your work has been done!");
    getData();
  };

  return (
    <div>
      <section className="container px-4 mx-auto">
        <SectionTitle heading="My Bids" description=""></SectionTitle>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              {bids.length === 0 ? (
                <div className="p-6 my-10 text-center text-gray-700 dark:text-gray-500 text-xl">
                  No posted bid Available
                </div>
              ) : (
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg mb-10">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-70">
                    <thead className="bg-[#1A1D2B]">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>bid Service</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Category</span>
                            <svg
                              className="h-3"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.1"
                              />
                              <path
                                d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.1"
                              />
                              <path
                                d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.3"
                              />
                            </svg>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Status</span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Deadline
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Expiration
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-gradient-to-r from-zinc-800 to-slate-900">
                      {bids.map((bid) => (
                        <tr key={bid._id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <div className="avatar">
                                  <div className="w-16 rounded-xl">
                                    <img src={bid.service_img} />
                                  </div>
                                </div>
                                <div>
                                  <h2 className="font-medium text-gray-800 dark:text-white ">
                                    {bid.title}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-purple-100/60 dark:bg-gray-800 ">
                              <h2
                                className={`text-sm font-normal ${
                                  bid.category === "Web Development" &&
                                  "text-blue-500"
                                } ${
                                  bid.category === "Digital Marketing" &&
                                  "text-green-500"
                                } ${
                                  bid.category === "Virtual Assistance" &&
                                  "text-purple-500"
                                } ${
                                  bid.category === "Graphic Design" &&
                                  "text-pink-500"
                                } ${
                                  bid.category === "App Development" &&
                                  "text-teal-500"
                                }`}
                              >
                                {bid.category}
                              </h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <h2
                              className={`text-sm font-normal px-3 py-1 rounded-full gap-x-2 bg-purple-100/60 dark:bg-slate-800  ${
                                bid.status === "Pending" && "text-yellow-500"
                              } ${
                                bid.status === "In Progress" && "text-green-500"
                              } ${
                                bid.status === "Complete" && "text-purple-500"
                              } ${
                                bid.status === "Rejected" && "text-pink-500"
                              } `}
                            >
                              {bid.status}
                            </h2>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {new Date(bid.deadline).toLocaleDateString()}
                          </td>

                          <td
                            className={`px-12 py-4 text-sm font-medium whitespace-nowrap ${
                              new Date(bid.deadline) < new Date()
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                                new Date(bid.deadline) < new Date()
                                  ? "bg-red-100/60 dark:bg-gray-800"
                                  : "bg-green-100/60 dark:bg-gray-800"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  new Date(bid.deadline) < new Date()
                                    ? "bg-red-500"
                                    : "bg-green-500"
                                }`}
                              />
                              <h2
                                className={`text-sm font-normal ${
                                  new Date(bid.deadline) < new Date()
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {new Date(bid.deadline) < new Date()
                                  ? "Expired"
                                  : "Available"}
                              </h2>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <button
                                disabled={bid.status !== "In Progress"}
                                onClick={() =>
                                  handleStatus(bid._id, "Complete")
                                }
                                className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 dark:hover:text-rose-600 dark:text-gray-300 hover:text-rose-600 focus:outline-none"
                              >
                                <LuCheckCircle size={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyBids;
