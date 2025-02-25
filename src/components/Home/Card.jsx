import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { RiPlantLine } from "react-icons/ri";
import { motion } from "framer-motion";

const Card = ({ plant }) => {
  const { category, image, name, price, _id, index } = plant || {};

  return (
    <motion.div
      initial={{ opacity: 0.1, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.2,
      }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <Link
        to={`/plant/${_id}`}
        className="col-span-1 cursor-pointer group rounded-xl"
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full h-[300px] relative overflow-hidden rounded-xl">
            <img
              className="object-cover h-full w-full group-hover:scale-110 transition duration-700 ease-in-out"
              src={image}
              alt="Plant Image"
            />
            <div className="absolute top-3 right-3"></div>
          </div>

          <div className="p-2">
            <div className="flex items-center gap-1 text-sm">
              <RiPlantLine /> {category}
            </div>

            <div className="text-lg font-semibold mb-1">{name}</div>

            <span className="text-xl">${price}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;

Card.propTypes = {
  plant: PropTypes.shape({
    category: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};
