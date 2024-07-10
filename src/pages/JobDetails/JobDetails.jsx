import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { CgNametag } from "react-icons/cg";

import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";

import SectionTitle from "./../../components/SectionTitle/SectionTitle";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const JobDetails = () => {
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const navigate = useNavigate();

  const job = useLoaderData();
  const {
    _id,
    title,
    description,
    category,
    service_img,
    deadline,
    max_price,
    min_price,
    buyer,
  } = job || {};

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (user?.email === buyer?.email) {
      return toast.error("Proposal denied");
    }
    const form = e.target;
    const jobId = _id;
    const price = parseFloat(form.price.value);
    if (price < parseFloat(min_price)) {
      return toast.error(
        "Your bid price is lower than the minimum price range."
      );
    }
    const proposalSummary = form.proposalSummary.value;
    const email = user?.email;
    const status = "Pending";
    const deadline = startDate;

    const bidData = {
      jobId,
      price,
      deadline,
      proposalSummary,
      title,
      category,
      status,
      buyer,
      email,
      service_img,
      buyer_email: buyer?.email,
    };

    try {
      const response = await axiosSecure.post(
        `/bid`,
        bidData
      );
      console.log(response.data);

      toast.success("Your Proposal is Submitted");
      navigate('/myBids')
      
    } catch (error) {
      toast.error(error.response.data);
      e.target.reset();
    }
  };

  return (
    <div>
      <div>
        {/* heading */}
        <SectionTitle heading={title} description=""></SectionTitle>
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-10 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full h-[200px] md:h-[700px] object-cover object-center rounded-2xl border border-gray-200"
                src={service_img}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {category}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font  mb-1">
                  {name}
                </h1>
                <div className="flex items-center my-4">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
                      <img src={buyer?.photo} />
                    </div>
                  </div>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed mb-6">{description}</p>

                <div className="flex items-center gap-2">
                  <IoTimeOutline />
                  <p className="text-lg font-semibold">Deadline :</p>
                  <span className="badge badge-outline">
                    {new Date(deadline).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2 title-font text-gray-900">
                    <FaBangladeshiTakaSign />
                    <p className="text-lg font-semibold">Price Range :</p>
                    {max_price}-{min_price}
                  </span>

                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col md:flex-row justify-center md:justify-start lg:justify-start items-center gap-3 ">
                  <CgNametag />
                  <p className="font-semibold text-lg">Buyer Name:</p>
                  <span className="text-lg">{buyer?.name}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-center md:justify-start lg:justify-start items-center gap-3 mb-4">
                  <MdOutlineMarkEmailUnread />
                  <p className="text-lg font-semibold">Buyer Email:</p>
                  <span className="text-lg">{buyer?.email}</span>
                </div>

                <hr />

                {/* Make a Proposal */}
                <div className=" mt-6 pb-5">
                  <h1 className="text-lg md:text-2xl font-bold mb-4">
                    Make A Proposal
                  </h1>
                  <div className="border rounded-lg p-4">
                    <div>
                      <div className="flex flex-col md:flex-row justify-center md:justify-start lg:justify-start items-center gap-3 mt-4">
                        <CgNametag size={30} />
                        <p className="font-bold text-lg">User Name:</p>
                        <span className="text-xl">{user?.displayName}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col md:flex-row justify-center md:justify-start lg:justify-start items-center gap-3 mt-4">
                        <MdOutlineMarkEmailUnread size={30} />
                        <p className="font-bold text-lg">Email:</p>
                        <span className="text-xl">{user?.email}</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmission}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 w-full mt-6">
                      {/* date */}
                      <div className="bg-white p-4 rounded-lg">
                        <div className="relative bg-inherit">
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="peer bg-transparent h-10 w-full rounded-lg text-gray-900 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-purple-600 focus:outline-none focus:border-rose-600"
                            placeholderText="My Possible Date"
                            dateFormat="yyyy-MM-dd"
                          />
                          <label
                            htmlFor="date"
                            className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-purple-600 peer-focus:text-sm transition-all"
                          >
                            My Possible Date
                          </label>
                        </div>
                      </div>

                      {/* price */}
                      <div className="bg-white p-4 rounded-lg col-span-2 md:col-span-1 lg:col-span-1">
                        <div className="relative bg-inherit">
                          <textarea
                            type="number"
                            id="price"
                            name="price"
                            className="w-full peer bg-transparent h-10 rounded-lg text-gray-900 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-purple-600 focus:outline-none focus:border-rose-600"
                            placeholder="Price"
                            required
                          />
                          <label
                            htmlFor="username"
                            className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-purple-600 peer-focus:text-sm transition-all"
                          >
                            Price
                          </label>
                        </div>
                      </div>

                      {/* message */}
                      <div className="bg-white p-4 rounded-lg col-span-2">
                        <div className="relative bg-inherit">
                          <textarea
                            id="proposalSummary"
                            name="proposalSummary"
                            className="peer bg-transparent h-32 w-full rounded-lg text-gray-900 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-purple-600 focus:outline-none focus:border-rose-600 resize-none"
                            placeholder="Bid Message"
                          ></textarea>
                          <label
                            htmlFor="proposalSummary"
                            className="absolute cursor-text left-0 -top-3 text-sm text-gray-600 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-purple-600 peer-focus:text-sm transition-all"
                          >
                            Proposal Summary
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* place bid button */}
                    <div className="mt-4 w-full text-center">
                      <input
                        type="submit"
                        value="Bid Now"
                        className="btn btn-wide rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm md:text-md lg:text-lg font-semibold shadow-lg hover:from-purple-600 hover:to-indigo-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JobDetails;
