import SectionTitle from "../SectionTitle/SectionTitle";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "../JobCard/JobCard";
import { useEffect, useState } from "react";
import axios from "axios";

const TabCategories = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/jobs`);
      setJobs(data);
    };
    getData();
  }, []);

  if (jobs.length === 0) {
    return (
      <div className="flex items-center justify-center my-20">
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* heading */}
      <SectionTitle
        heading="Our Service"
        description="Discover a streamlined platform where top-tier freelancers and clients connect seamlessly."
      ></SectionTitle>

      {/* Categories */}
      <div className="py-6">
        <Tabs>
          <div className="max-w-screen-xl mx-auto">
            <TabList className="flex items-center justify-center text-xl font-semibold border-b-2 border-gray-300">
              <Tab>Web Development</Tab>
              <Tab>Digital Marketing</Tab>
              <Tab>Virtual Assistance</Tab>
              <Tab>Graphic Design</Tab>
              <Tab>App Development</Tab>
            </TabList>

            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs
                  .filter((item) => item.category === "Web Development")
                  .map((job) => (
                    <JobCard key={job._id} job={job}></JobCard>
                  ))}
              </div>
            </TabPanel>

            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs
                  .filter((item) => item.category === "Digital Marketing")
                  .map((job) => (
                    <JobCard key={job._id} job={job}></JobCard>
                  ))}
              </div>
            </TabPanel>

            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs
                  .filter((item) => item.category === "Virtual Assistance")
                  .map((job) => (
                    <JobCard key={job._id} job={job}></JobCard>
                  ))}
              </div>
            </TabPanel>

            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs
                  .filter((item) => item.category === "Graphic Design")
                  .map((job) => (
                    <JobCard key={job._id} job={job}></JobCard>
                  ))}
              </div>
            </TabPanel>

            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs
                  .filter((item) => item.category === "App Development")
                  .map((job) => (
                    <JobCard key={job._id} job={job}></JobCard>
                  ))}
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TabCategories;
