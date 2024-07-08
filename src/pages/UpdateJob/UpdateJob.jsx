import { useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateJob = () => {
  const { user } = useAuth();
  const job = useLoaderData();
  const navigate = useNavigate();

  const {
    _id,
    title,
    description,
    category,
    service_img,
    deadline,
    max_price,
    min_price,
  } = job || {};

  const [startDate, setStartDate] = useState(new Date(deadline) || new Date());

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const min_price = parseFloat(form.min_price.value);
    const max_price = parseFloat(form.max_price.value);
    if (min_price > max_price) {
      return toast.error("Your Maximum Price is lower than Minimum Price");
    }
    const category = form.category.value;
    const email = form.email.value;
    const description = form.description.value;
    const deadline = startDate;
    const service_img = form.service_img.value;

    const updateJobData = {
      title,
      description,
      min_price,
      max_price,
      deadline,
      category,
      service_img,
      buyer: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
    };

    console.table(updateJobData);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/job/${_id}`,
        updateJobData
      );
      console.log(response.data);
      toast.success("Your job data is updated Successfully");
      navigate('/myPostedJob')

    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message)
    }

  };

  return (
    <div className="max-w-screen-xl mx-auto">
      {/* heading */}
      <SectionTitle heading="Update A Job" description=""></SectionTitle>

      {/* form */}

      <form onSubmit={handleFormSubmission}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-8 md:pt-12 lg:pt-12">
          {/* Title */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-xl font-semibold">
                Job Title
              </span>
            </div>
            <input
              type="text"
              name="title"
              placeholder="Responsive Website Design"
              className="input input-bordered w-full "
              defaultValue={title}
            />
          </label>

          {/* Category */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-xl font-semibold">Category</span>
            </div>
            <select
              className="select select-bordered"
              name="category"
              defaultValue={category}
            >
              <option disabled selected>
                Select one
              </option>
              <option>Web Development</option>
              <option>Digital Marketing</option>
              <option>Virtual Assistance</option>
              <option>Graphic Design</option>
              <option>App Development</option>
            </select>
          </label>

          {/* Email */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-xl font-semibold">Email</span>
            </div>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              placeholder="email@example.com"
              className="input input-bordered w-full"
            />
          </label>

          {/* deadline */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-xl font-semibold">Deadline</span>
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="input input-bordered w-full cursor-pointer"
              placeholderText=""
              dateFormat="yyyy-MM-dd"
            />
          </label>

          {/* min price */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-xl font-semibold">
                Min Price
              </span>
            </div>
            <input
              type="number"
              name="min_price"
              placeholder="200"
              className="input input-bordered w-full "
              defaultValue={min_price}
            />
          </label>

          {/* max price */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-xl font-semibold">
                Max Price
              </span>
            </div>
            <input
              type="number"
              name="max_price"
              placeholder="10000"
              className="input input-bordered w-full "
              defaultValue={max_price}
            />
          </label>
        </div>

        {/* Img URL */}
        <label className="form-control w-full mt-7">
          <div className="label">
            <span className="label-text text-xl font-semibold">Image URL</span>
          </div>
          <input
            type="text"
            name="service_img"
            placeholder="http://yourimglink.com"
            className="input input-bordered w-full "
            defaultValue={service_img}
          />
        </label>

        {/* description */}
        <label className="form-control mt-7">
          <div className="label">
            <span className="label-text text-xl font-semibold">
              Description
            </span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            name="description"
            placeholder="Our Responsive Website Design service ensures your website looks great and functions perfectly on all devices..."
            defaultValue={description}
          ></textarea>
        </label>

        {/* post button */}
        <div className="text-center my-12">
          <input
            type="submit"
            className="px-24 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-indigo-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 text-xl"
            value="Update"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateJob;
