
const SectionTitle = ({heading, description}) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-8">
            <h3 className="text-3xl font-semibold py-4">{heading}</h3>
            <p>{description}</p>
        </div>
    );
};

export default SectionTitle;