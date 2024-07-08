import { useLoaderData } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
// import OurTopCategory from "../../components/OurTopCategory/OurTopCategory";
import TabCategories from "../../components/TabCategories/TabCategories";


const Home = () => {
    const jobs = useLoaderData();

    return (
        <div>
            <Banner></Banner>
            {/* <OurTopCategory></OurTopCategory> */}
            <TabCategories></TabCategories>
        </div>
    );
};

export default Home;