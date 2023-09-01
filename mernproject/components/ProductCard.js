import {AiFillStar} from "@utils/iconExport"
import Image from "next/image";
let arr = [1, 2, 3, 4, 5];
const ProductCard = () => {
  return (
    <div className="w-[189px] bg-[#f6f6f6] hover:-translate-y-2 duration-300 ease-in-out transition-transform cursor-pointer rounded-md">
      <div>
        <Image src='/girl.webp' className='rounded-t-md' alt={"cardImage.webp"} width={189} height={189}/>
      </div>
      <div className="p-1">
        <div className="border-b-2 border-gray-200 py-1">
          <h2 className="font-semibold text-sm">
            Tshirt is the most efficient thing
          </h2>
          <div className='flex gap-1'>
          {arr.map((e, ind) => (
            <span key={ind} className="text-yellow-400">
              <AiFillStar size={15} />
            </span>
          ))}

          </div>
        </div>
        <p className="text-xl font-semibold">$800</p>
        <div className="flex gap-3 text-sm">
          <span className="line-through">$1000</span>
          <span className="text-red-500">$20% off</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
